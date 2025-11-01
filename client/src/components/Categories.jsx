import React from 'react'
import { categories } from '../assets/assets.js'
import { useAppContext } from '../context/AppContext.jsx'

const Categories = () => {
  const { navigate } = useAppContext();

  return (
    <div className="mt-12 py-10 bg-gradient-to-b from-[#F4FFF6] to-white">
      {/* Section Title */}
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-green-700">Popular Categories</h2>
        <div className="w-20 sm:w-24 h-1 bg-green-500 mx-auto mt-2 rounded-full"></div>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4 sm:gap-6 px-4 sm:px-8">
        {categories.map((category, index) => (
          <div
            key={index}
            className="group cursor-pointer py-4 sm:py-6 px-3 sm:px-4 rounded-2xl flex flex-col justify-center items-center 
                       transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-100 border border-gray-100"
            style={{
              backgroundColor: category.bgColor,
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              scrollTo(0, 0);
            }}
          >
            <img
              src={category.image}
              alt={category.text}
              className="group-hover:scale-110 transition-transform duration-300 rounded-full shadow-md shadow-green-100 w-14 h-14 sm:w-20 sm:h-20 object-contain"
            />
            <p className="text-xs sm:text-sm font-semibold text-gray-800 mt-2 sm:mt-3">
              {category.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories
