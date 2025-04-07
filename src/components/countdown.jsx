import { useEffect, useRef, useState } from 'react';
import { SocialIcon } from 'react-social-icons';
import Popup from './popup';

const CountdownTimer = () => {
  const [showPopup, setShowPopup] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    const handleUserGesture = () => {
      if (audioRef.current) {
        audioRef.current.play().catch((error) => {
          console.log('Playback error:', error);
        });
        window.removeEventListener('click', handleUserGesture);
      }
    };

    window.addEventListener('click', handleUserGesture);
    return () => window.removeEventListener('click', handleUserGesture);
  }, []);

  return (
    <div className="h-screen bg-black flex flex-col justify-between items-center p-4 text-center font-helvetica overflow-hidden">
      {/* Hidden audio */}
      <audio ref={audioRef} src="/Runaway-ye.mp3" style={{ display: 'none' }} />

      {/* Popup */}
      {showPopup && <Popup onClose={() => setShowPopup(false)} />}

      {/* Main content */}
      <div className="flex flex-col justify-center items-center space-y-3 flex-grow">
        {/* Logo */}
        <img
          src="/Soko Logo-01.png"
          alt="Brand Logo"
          className="w-[180px] sm:w-[220px] md:w-[260px] lg:w-[280px] h-auto transition-transform duration-300 hover:scale-105"
        />

        {/* Brand message */}
        <div className="text-white/90 max-w-md px-4 space-y-3">
          <p className="text-sm sm:text-base md:text-lg font-light leading-relaxed tracking-wide">
            Rooted in Calcutta. Influenced by hip hop. Built for the culture.
          </p>
          <p className="text-sm sm:text-base md:text-lg font-light leading-relaxed tracking-wide">
            We’re a clothing brand creating space for the city’s boldest voices. Premium streetwear that speaks for itself, and a community that moves together.
          </p>
          <p className="text-sm sm:text-base md:text-lg font-light leading-relaxed tracking-wide">
            This is style with purpose. Welcome to the scene.
          </p>
        </div>
      </div>

      {/* Instagram section */}
      <div className="flex flex-col items-center text-white/70 text-xs sm:text-sm md:text-base tracking-wider space-y-1 mb-6">
        <p>Site’s still cookin’</p>
        <p>But the heat’s live on the gram.</p>
        <p>Tap in, check the drops, hit the DMs to cop.</p>

        {/* Instagram icon */}
        <SocialIcon
          url="https://www.instagram.com/sokoindia/"
          style={{ height: 40, width: 40 }}
          bgColor="transparent"
          fgColor="#fff"
          className="mt-3 transition-transform duration-300 hover:scale-110"
        />
      </div>
    </div>
  );
};

export default CountdownTimer;