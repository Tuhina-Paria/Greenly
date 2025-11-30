import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { useLocation } from "react-router-dom";

const Loading = () => {
  const { navigate } = useAppContext();
  let { search } = useLocation();

  const query = new URLSearchParams(search);
  const nextUrl = query.get("next");

  useEffect(() => {
    if (nextUrl) {
      setTimeout(() => {
        navigate(`/${nextUrl}`);
      }, 5000);
    }
  }, [nextUrl]);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-primary/30 backdrop-blur-md z-[9999]">
      {/* Outer ring */}
      <div className="relative w-24 h-24 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>

        {/* Glow pulse */}
        <div className="absolute w-24 h-24 rounded-full border-4 border-primary/20 animate-ping"></div>
      </div>

      <p className="text-primary font-semibold text-lg mt-6 animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default Loading;
