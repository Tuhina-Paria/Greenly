import React from "react";
import { exploreCategories } from "../assets/assets.js";
import { useAppContext } from "../context/AppContext.jsx";

const ExploreCategories = () => {
  const { navigate } = useAppContext();
  const primaryColor = "#4fbf8b";
  const exploreMore = exploreCategories.slice(0, 6);

  return (
    <section className="mt-6 bg-gradient-to-b from-white to-[#f3fff8] py-6 px-4 sm:px-6">
      {/* ✅ Section Title */}
      <div className="text-center mb-5 sm:mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-700">
          🌿 Explore More Categories
        </h2>
        <p className="text-gray-500 mt-1 text-sm sm:text-base">
          Discover fresh essentials from every aisle
        </p>
      </div>

      {/* ✅ Category Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-5 max-w-6xl mx-auto">
        {exploreMore.map((category, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              scrollTo(0, 0);
            }}
            className="flex flex-col items-center cursor-pointer group p-3 bg-white rounded-2xl 
                       shadow-sm hover:shadow-md transition-all duration-300 border border-green-100 
                       hover:-translate-y-1"
          >
            {/* ✅ Image Box */}
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: primaryColor }}
            >
              <img
                src={category.image}
                alt={category.text}
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain 
                           group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* ✅ Label */}
            <p className="mt-3 text-sm md:text-base font-medium text-gray-800 text-center truncate">
              {category.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExploreCategories;
