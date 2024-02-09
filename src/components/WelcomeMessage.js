import React, { useState, useEffect } from 'react';

export const WelcomeMessage = ({ username }) => {
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours();
      const greeting = hours < 12 ? 'Good morning' : hours < 18 ? 'Good afternoon' : 'Good evening';
      setCurrentTime(`${greeting}, ${username}! It is currently ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
// eslint-disable-next-line
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className="welcome-message rounded-full bg-green-900 text-cream p-4 flex items-center justify-between"
    >
      {currentTime && (
        <div className="flex items-center gap-2">
          <p className="text-2xl font-bold">{currentTime}</p>
          {/* Add icon if desired */}
        </div>
      )}
    </div>
  );
};

export default WelcomeMessage;
