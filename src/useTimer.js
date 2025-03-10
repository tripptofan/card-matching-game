import React, { useState, useEffect } from 'react';

function CountdownTimer({ initialSeconds }) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (!!seconds && seconds > 0) {
      const timerId = setTimeout(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);

      return () => clearTimeout(timerId); // Clear timeout if component unmounts
    }
  }, [seconds]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    {
        time: seconds ? formatTime(seconds) : false,
    }
  );
}

export default CountdownTimer;