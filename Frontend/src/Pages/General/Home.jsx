import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import BottomNav from "../../Components/BottomNav";
import {
  Heart,
  Bookmark,
  ExternalLink,
} from "lucide-react";

const Home = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const [likedItems, setLikedItems] = useState({});
  const [savedItems, setSavedItems] = useState({});
  const [sharedItems, setSharedItems] = useState({});

  const containerRef = useRef(null);
  const videoRefs = useRef(new Map());

  const navigate = useNavigate();

  const setVideoRef = (id) => (el) => {
    if (el) videoRefs.current.set(id, el);
    else videoRefs.current.delete(id);
  };

  const toggleLike = (id) => {
    setLikedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleSave = (id) => {
    setSavedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleShare = (id) => {
    setSharedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/food/", {
          withCredentials: true,
        });

        setFoods(response.data.foodItems);
      } catch (error) {
        if (error.response?.status === 401) {
          navigate("/choose-user");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, [navigate]);

  useEffect(() => {
    if (!containerRef.current || foods.length === 0) return;

    const container = containerRef.current;

    const handleScroll = () => {
      const reels = container.querySelectorAll(".reel");

      reels.forEach((reel, index) => {
        const rect = reel.getBoundingClientRect();
        const video = videoRefs.current.get(foods[index]?._id);

        if (!video) return;

        const visible =
          rect.top >= -100 && rect.top <= window.innerHeight / 2;

        if (visible) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    };

    handleScroll();

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [foods]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-scroll snap-y snap-mandatory bg-black pb-24"
    >
      {foods.map((item) => {
        const isLiked = likedItems[item._id];
        const isSaved = savedItems[item._id];
        const isShared = sharedItems[item._id];

        const likeCount = (item.likeCount ?? 0) + (isLiked ? 1 : 0);
        const saveCount = (item.savedCount ?? 0) + (isSaved ? 1 : 0);
        const shareCount = (item.shareCount ?? 0) + (isShared ? 1 : 0);

        return (
          <section
            key={item._id}
            className="reel relative h-screen snap-start"
          >
            <video
              ref={setVideoRef(item._id)}
              src={item.video}
              className="h-full w-full object-cover"
              muted
              loop
              playsInline
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <div className="absolute right-4 top-[58%] flex flex-col gap-4 text-white">

              <button
                onClick={() => toggleLike(item._id)}
                className="flex flex-col items-center rounded-2xl bg-white/10 p-3"
              >
                <Heart
                  fill={isLiked ? "red" : "none"}
                  className={isLiked ? "text-red-500" : "text-white"}
                />
                <span className="text-xs">{likeCount}</span>
              </button>

              <button
                onClick={() => toggleSave(item._id)}
                className="flex flex-col items-center rounded-2xl bg-white/10 p-3"
              >
                <Bookmark
                  fill={isSaved ? "white" : "none"}
                  className="text-white"
                />
                <span className="text-xs">{saveCount}</span>
              </button>

              <button
                onClick={() => toggleShare(item._id)}
                className="flex flex-col items-center rounded-2xl bg-white/10 p-3"
              >
                <ExternalLink
                  className={isShared ? "text-blue-400" : "text-white"}
                />
                <span className="text-xs">{shareCount}</span>
              </button>

            </div>

            <div className="absolute bottom-20 left-4 text-white">
              <h2 className="text-2xl font-bold">{item.name}</h2>

              <p className="mt-1 w-[80%] text-sm text-white/80">
                {item.description}
              </p>

              <Link
                to={`/foodPartner/${item.foodPartner}`}
                className="mt-3 inline-block rounded-full bg-red-500 px-5 py-3 text-sm font-semibold"
              >
                Visit Store
              </Link>
            </div>
          </section>
        );
      })}

      <div className="fixed bottom-0 left-0 right-0 z-50">
        <BottomNav />
      </div>
    </div>
  );
};

export default Home;