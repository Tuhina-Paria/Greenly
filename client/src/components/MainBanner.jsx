import React from 'react'
import Slider from "react-slick";
import { assets } from '../assets/assets.js'

// ✅ Import slider CSS once (only if not already imported globally)
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const MainBanner = () => {

  const settings = {
    dots: true,                // small navigation dots
    infinite: true,            // loop forever
    autoplay: true,            // auto-slide
    autoplaySpeed: 2000,       // 3 seconds
    slidesToShow: 1,           // show one image at a time
    slidesToScroll: 1,
    arrows: false,             // hide arrows for clean look
    fade: true,                // smooth fade transition
  };

  const images = [
    assets.main_banner5,
    assets.main_banner4,
    assets.main_banner_bg,
  ];

  return (
    <div className="w-full mx-auto px-2 md:px-8 mt-4">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index} className="relative">
            <img
              src={img}
              alt={`banner-${index}`}
              className="
                w-full 
                h-[180px] sm:h-[250px] md:h-[400px] 
                object-cover 
                rounded-2xl shadow-md
              "
            />
             {index === 2 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-black  rounded-2xl">
                <h2 className="text-lg sm:text-2xl md:text-4xl font-bold mb-2 drop-shadow-lg">
                  Your Health is in Your Hand! 
                </h2>
                <p className="text-sm sm:text-base md:text-lg drop-shadow-md">
                  Freshness you can trust, every day.
                </p>
              </div>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MainBanner;
