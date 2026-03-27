import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

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

  const handleVisitStore = (foodPartner) => {
    // Implement navigation to store page or modal
    console.log('Visit store for:', foodPartner);
    // For now, just alert
   
  };

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
    <div ref={containerRef} className="h-screen overflow-y-scroll snap-y snap-mandatory bg-black">
      {foods.map((item) => (
        <section key={item._id} className="reel relative h-screen snap-start" role="listitem">
          <video
            ref={setVideoRef(item._id)}
            className="reel-video w-full h-full object-cover"
            src={item.video}
            muted
            playsInline
            loop
            preload="metadata"
            autoPlay={false} // We'll control this manually
          />
          <div className="absolute bottom-0 left-0 p-4 text-white bg-none text-left max-w-xs">
            <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
            <p className="text-sm mb-4 line-clamp-2">{item.description}</p>
            
            <button
              onClick={() => handleVisitStore(item.foodPartner)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold"
            >
              <Link className="reel-btn" to={"/foodPartner/" + item.foodPartner} aria-label="Visit store">Visit store</Link>
            </button>
          </div>
        </section>
      ))}
    </div>
  );
};

export default Home;
