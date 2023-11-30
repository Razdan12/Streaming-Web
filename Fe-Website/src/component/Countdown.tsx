import React, { useState, useEffect } from 'react';

const CountdownTimer: React.FC<{ targetDate: Date }> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    
    const end = targetDate.getTime() + 2 * 60 * 60 * 1000; 

    const interval = setInterval(() => {
      const current = new Date().getTime();
      const distance = end - current;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
      } else {
        setTimeLeft(distance);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [targetDate]);

  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 2)) / (1000 * 60 * 60)).toString().padStart(2, '0');
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000).toString().padStart(2, '0');

  return (
    <div>
      <div>{` ${hours} : ${minutes} : ${seconds} `}</div>
    </div>
  );
};

export default CountdownTimer;
