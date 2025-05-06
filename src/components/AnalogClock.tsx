'use client';

import { useEffect, useState } from 'react';
import styles from './AnalogClock.module.css';

const AnalogClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      // Create a date object with UTC+5:30 offset (Indian Standard Time)
      const now = new Date();
      // UTC time in milliseconds
      const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
      // IST time (UTC+5:30) in milliseconds
      const istTime = new Date(utcTime + (5.5 * 3600000));
      setTime(istTime);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // Calculate the rotation angles for the clock hands
  const secondsRatio = time.getSeconds() / 60;
  const minutesRatio = (secondsRatio + time.getMinutes()) / 60;
  const hoursRatio = (minutesRatio + time.getHours()) / 12;

  return (
    <div className={styles.clockContainer}>
      <div className={styles.clockLabel}>UTC+5:30 (IST)</div>
      <div className={styles.clock}>
        <div className={styles.clockFace}>
          {/* Clock numbers */}
          {[...Array(12)].map((_, i) => (
            <div 
              key={i} 
              className={styles.number} 
              style={{ 
                transform: `rotate(${i * 30}deg) translateY(-40px) rotate(-${i * 30}deg)` 
              }}
            >
              {i === 0 ? 12 : i}
            </div>
          ))}
          
          {/* Clock hands */}
          <div 
            className={`${styles.hand} ${styles.hourHand}`} 
            style={{ transform: `rotate(${hoursRatio * 360}deg)` }}
          />
          <div 
            className={`${styles.hand} ${styles.minuteHand}`} 
            style={{ transform: `rotate(${minutesRatio * 360}deg)` }}
          />
          <div 
            className={`${styles.hand} ${styles.secondHand}`} 
            style={{ transform: `rotate(${secondsRatio * 360}deg)` }}
          />
          <div className={styles.centerDot} />
        </div>
      </div>
      <div className={styles.digitalTime}>
        {time.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit', 
          second: '2-digit',
          hour12: true 
        })}
      </div>
    </div>
  );
};

export default AnalogClock;