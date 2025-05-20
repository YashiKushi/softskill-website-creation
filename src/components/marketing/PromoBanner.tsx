
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface CountdownProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const PromoBanner = () => {
  const [countdown, setCountdown] = useState<CountdownProps>({
    days: 1,
    hours: 13,
    minutes: 47,
    seconds: 19
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="promo-banner">
      <div className="flex items-center space-x-4">
        <span className="font-medium text-lg">МАЙСКИЕ СКИДКИ ДО 55%</span>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-white">
          {countdown.days} дн : {countdown.hours} ч : {countdown.minutes} мин : {countdown.seconds} сек
        </div>
        <Button className="bg-green-500 hover:bg-green-600 text-white font-medium">
          Выбрать программу
        </Button>
      </div>
    </div>
  );
};

export default PromoBanner;
