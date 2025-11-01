import React from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const ProductCard = ({ product }) => {
  const { currency, addToCart, removeFromCart, cartItems } = useAppContext();

  return (
    product && (
      <div className="border border-gray-200 rounded-lg bg-white p-3 
                      w-[150px] sm:w-[180px] md:w-[200px] mx-auto
                      shadow-sm hover:shadow-md transition-all duration-200 
                      hover:-translate-y-1">
        {/* ✅ Product Image */}
        <div className="group flex items-center justify-center h-[120px] sm:h-[140px] md:h-[160px] overflow-hidden">
          <img
            className="group-hover:scale-105 transition-transform duration-300 w-full h-full object-contain"
            src={Array.isArray(product.image) ? product.image[0] : product.image}
            alt={product.name}
          />
        </div>

        {/* ✅ Product Info */}
        <div className="mt-2 text-left text-sm text-gray-600">
          <p className="text-xs text-gray-400 uppercase tracking-wide">
            {product.category}
          </p>
          <p className="text-gray-800 font-medium text-sm truncate">
            {product.name}
          </p>

          {/* ✅ Rating */}
          <div className="flex items-center gap-1 mt-1">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  className="w-3 h-3"
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt="star"
                />
              ))}
            <p className="text-xs text-gray-500">(4)</p>
          </div>

          {/* ✅ Price & Add Button */}
          <div className="flex items-end justify-between mt-3">
            <p className="text-sm sm:text-base font-semibold text-green-600">
              {currency}
              {product.offerPrice}
              <span className="text-gray-400 text-xs line-through ml-1">
                {currency}
                {product.price}
              </span>
            </p>

            <div onClick={(e) => e.stopPropagation()} className="text-primary">
              {!cartItems[product._id] ? (
                <button
                  className="flex items-center justify-center gap-1 bg-indigo-100 border border-indigo-300 
                             w-[60px] sm:w-[70px] h-[28px] sm:h-[32px] rounded text-indigo-600 
                             text-xs font-medium hover:bg-indigo-200 transition"
                  onClick={() => addToCart(product._id)}
                >
                  <img src={assets.cart_icon} alt="cart_icon" className="w-3" />
                  Add
                </button>
              ) : (
                <div className="flex items-center justify-center gap-2 w-[60px] sm:w-[70px]
                 h-[28px] sm:h-[32px] bg-indigo-600 text-white rounded select-none">
                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="cursor-pointer text-sm px-1 h-full"
                  >
                    -
                  </button>
                  <span className="text-sm">{cartItems[product._id]}</span>
                  <button
                    onClick={() => addToCart(product._id)}
                    className="cursor-pointer text-sm px-1 h-full"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCard;
