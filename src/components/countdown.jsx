import { useState, useEffect } from 'react';
import { SocialIcon } from 'react-social-icons';
import Popup from './popup';  // Import the Popup component

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showPopup, setShowPopup] = useState(true); // Control popup visibility

  useEffect(() => {
    const launchDate = new Date('2025-03-15T00:00:00');
    const timer = setInterval(() => {
      const now = new Date();
      const difference = launchDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Show Popup on Page Load */}
      {showPopup && <Popup onClose={() => setShowPopup(false)} />}

      {/* Logo Section */}
      <div className="mb-8 sm:mb-12 w-full flex justify-center items-center">
        <img src="/Soko Logo-01.png" alt="Brand Logo" className="w-3/4 sm:w-1/2 md:w-2/5 lg:w-1/3 max-w-[320px] min-w-[180px] h-auto" />
      </div>

      {/* Countdown Timer */}
      <div className="w-full max-w-[500px]">
        <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white/10 rounded-lg p-3 sm:p-4">
              <div className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-1 sm:mb-2 font-helvetica">
                {value}
              </div>
              <div className="text-white/60 text-xs sm:text-sm uppercase tracking-wider">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Media Links */}
      <div className="mt-12 flex space-x-6">
        <SocialIcon 
          url="https://www.instagram.com/sokoindia/" 
          style={{ height: 50, width: 50 }} 
          bgColor="transparent"
          fgColor="#fff"
        />
      </div>
    </div>
  );
};

export default CountdownTimer;
