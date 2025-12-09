// Timer effect
useEffect(() => {
  const timerId = setInterval(() => {
    setTime(prev => {
      if (prev < 360) {  // 6 minutes = 360 seconds
        return prev + 1;
      } else {
        clearInterval(timerId); // stop timer after 6 minutes
        return prev;
      }
    });
  }, 1000);

  return () => clearInterval(timerId); // cleanup on unmount
}, []);
