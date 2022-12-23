import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setcount] = useState(5);
  let history = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setcount((currCount) => --currCount);
    }, 1000);
    count === 0 && history("/");
    return () => clearInterval(interval);
  }, [count, history]);
  return (
    <div className="container p-5 text-center">
      <p>Redirecting you in {count} seconds...❤</p>
    </div>
  );
};

export default LoadingToRedirect;
