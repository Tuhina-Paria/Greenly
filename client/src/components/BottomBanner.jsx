import React from "react";
import Slider from "react-slick";
import { assets } from "../assets/assets.js";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BottomBanner = () => {
  const settings = {
    dots: true, // ✅ show dots
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    pauseOnHover: false,
    appendDots: dots => (
      <div style={{ marginTop: "10px" }}>
        <ul className="flex justify-center gap-2">{dots}</ul>
      </div>
    ),
    customPaging: i => (
      <div
        className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gray-300 hover:bg-green-500 transition-all duration-300"
      ></div>
    ),
  };

  const images = [
    assets.main_banner11,
    assets.main_banner10,
    assets.main_banner8,
  ];

  return (
    <div className="w-full flex justify-center mt-6 px-2 sm:px-4 mt-20 pb-14">
      <div className="w-full md:w-[95%] lg:w-[90%] overflow-hidden rounded-2xl shadow-md">
        <Slider {...settings}>
          {images.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={img}
                alt={`banner-${index}`}
                className="
                  w-full
                  h-[160px] 
                  sm:h-[200px] 
                  md:h-[260px] 
                  lg:h-[330px]
                  object-cover 
                  rounded-2xl
                  transition-transform duration-700 ease-in-out
                  hover:scale-[1.02]
                "
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BottomBanner;
