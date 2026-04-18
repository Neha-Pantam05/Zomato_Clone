import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import BottomNav from '../../Components/BottomNav'
import { Heart, Bookmark, MessageCircle } from 'lucide-react';

const Home = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRefs = useRef(new Map());
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const setVideoRef = (id) => (el) => {
    if (!el) { videoRefs.current.delete(id); return; }
    videoRefs.current.set(id, el);
  };

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/food/', {
          withCredentials: true,
        });
        setFoods(response.data.foodItems);
      } catch (error) {
        if (error.response?.status === 401) {
          // User not authenticated, redirect to choose user page
          navigate('/choose-user');
          return;
        }
        console.error('Error fetching foods:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, [navigate]);

  // Handle video playback based on scroll position
  useEffect(() => {
    if (!containerRef.current || foods.length === 0) return;

    const container = containerRef.current;
    let currentPlayingIndex = 0;

    const playVideo = async (index) => {
      const video = videoRefs.current.get(foods[index]?._id);
      if (video) {
        try {
          await video.play();
        } catch (error) {
          console.log('Video play failed:', error);
        }
      }
    };

    const pauseVideo = (index) => {
      const video = videoRefs.current.get(foods[index]?._id);
      if (video) {
        video.pause();
      }
    };

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const windowHeight = window.innerHeight;
      const newIndex = Math.round(scrollTop / windowHeight);

      if (newIndex !== currentPlayingIndex && newIndex >= 0 && newIndex < foods.length) {
        pauseVideo(currentPlayingIndex);
        currentPlayingIndex = newIndex;
        setCurrentVideoIndex(newIndex);
        playVideo(newIndex);
      }
    };

    // Play first video initially
    playVideo(0);

    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      // Pause all videos on cleanup
      foods.forEach((_, index) => pauseVideo(index));
    };
  }, [foods]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading videos...</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="h-screen overflow-y-scroll snap-y snap-mandatory bg-black pb-28">
      {foods.map((item) => (
        <section key={item._id} className="reel relative h-screen snap-start" role="listitem">
          <video
            ref={setVideoRef(item._id)}
            className="reel-video h-full w-full object-cover"
            src={item.video}
            muted
            playsInline
            loop
            preload="metadata"
            autoPlay={false}
          />

<div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

          <div className="absolute right-4 top-2/3 flex flex-col items-center gap-5 text-white">
            <button
              type="button"
              className="flex flex-col items-center gap-2 rounded-3xl bg-white/10 px-4 py-3 text-white transition hover:bg-white/15"
              aria-label="Like"
            >
              <span className="text-3xl"><Heart /></span>
              <span className="text-sm">{item.likeCount ?? 23}</span>
            </button>
            <button
              type="button"
              className="flex flex-col items-center gap-2 rounded-3xl bg-white/10 px-4 py-3 text-white transition hover:bg-white/15"
              aria-label="Save"
            >
              <span className="text-3xl"><Bookmark /></span>
              <span className="text-sm">{item.savedCount ?? 23}</span>
            </button>
            <button
              type="button"
              className="flex flex-col items-center gap-2 rounded-3xl bg-white/10 px-4 py-3 text-white transition hover:bg-white/15"
              aria-label="Comments"
            >
              <span className="text-3xl"><MessageCircle /></span>
              <span className="text-sm">{item.commentCount ?? 45}</span>
            </button>
          </div>

          <div className="absolute bottom-6 left-4 right-4 text-white">
            <div className="mb-4">
              <h2 className="text-2xl font-bold leading-tight mb-3">{item.name}</h2>
              <p className="text-sm text-white/70 line-clamp-3">{item.description}</p>
            </div>

            <Link
              to={`/foodPartner/${item.foodPartner}`}
              className="inline-flex items-center justify-center rounded-full bg-red-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition hover:bg-red-600"
              aria-label="Visit store"
            >
              Visit store
            </Link>
          </div>
        </section>
      ))}
      <BottomNav />
    </div>
  );
};

export default Home;
