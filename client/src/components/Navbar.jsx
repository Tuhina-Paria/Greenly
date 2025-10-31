import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false); // for mobile expanding search
  const { user, setUser, setShowUserLogin, navigate } = useAppContext();

  const logout = async () => {
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="w-full border-b border-gray-200 bg-white fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 sm:py-4">

        {/* ---------- Left: Logo ---------- */}
        <NavLink to="/" className="flex items-center gap-1">
          <img src="/favicon.svg" alt="Logo" className="h-8 sm:h-10" />
          <span className="text-lg sm:text-xl font-bold text-black">reenly</span>
        </NavLink>

        {/* ---------- Center: Search Bar (Desktop only) ---------- */}
        <div className="hidden sm:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full bg-gray-50 w-[280px] lg:w-[350px]">
          <input
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <img src={assets.search_icon} alt="search_icon" className="w-4 h-4 opacity-70" />
        </div>

        {/* ---------- Right Section ---------- */}
        <div className="hidden sm:flex items-center gap-6">
          <NavLink className="text-sm hover:text-primary" to="/">Home</NavLink>
          <NavLink className="text-sm hover:text-primary" to="/products">All Products</NavLink>
          <NavLink className="text-sm hover:text-primary" to="/">Contact</NavLink>

          {/* Cart Icon */}
          <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
            <img src={assets.nav_cart_icon} alt="nav_cart_icon" className="w-6 opacity-80" />
            <span className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full flex items-center justify-center">3</span>
          </div>

          {/* Login/Profile */}
          {!user ? (
            <button
              onClick={() => setShowUserLogin(true)}
              className="cursor-pointer px-6 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
            >
              Login
            </button>
          ) : (
            <div className="relative group">
              <img src={assets.profile_icon} alt="profile_icon" className="w-9 cursor-pointer" />
              <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-32 rounded-md text-sm z-40">
                <li onClick={() => navigate("/my-orders")} className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer">
                  My Orders
                </li>
                <li onClick={logout} className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer">
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* ---------- Mobile Right Section ---------- */}
        <div className="flex sm:hidden items-center gap-4">
          {/* Search icon toggles input */}
          <button onClick={() => setShowSearch(!showSearch)}>
            <img src={assets.search_icon} alt="search_icon" className="w-5 opacity-80" />
          </button>

          {/* Cart */}
          <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
            <img src={assets.nav_cart_icon} alt="nav_cart_icon" className="w-6 opacity-80" />
            <span className="absolute -top-2 -right-3 text-[10px] text-white bg-primary w-[16px] h-[16px] rounded-full flex items-center justify-center">
              3
            </span>
          </div>

          {/* Menu icon */}
          <button onClick={() => setOpen(!open)} aria-label="Menu">
            <img src={assets.menu_icon} alt="menu_icon" className="w-6" />
          </button>
        </div>
      </div>

      {/* ---------- Mobile Search (expand under navbar) ---------- */}
      {showSearch && (
        <div className="sm:hidden border-t border-gray-200 px-4 pb-2 pt-1 bg-white">
          <div className="flex items-center gap-2 border border-gray-300 px-3 rounded-full bg-gray-50">
            <input
              className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
              type="text"
              placeholder="Search products..."
            />
            <img src={assets.search_icon} alt="search_icon" className="w-4 h-4 opacity-70" />
          </div>
        </div>
      )}

      {/* ---------- Mobile Menu ---------- */}
      {open && (
        <div className="sm:hidden flex flex-col items-start gap-3 px-5 py-4 border-t border-gray-200 bg-white shadow-md text-sm">
          <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)}>All Products</NavLink>
          {user && <NavLink to="/my-orders" onClick={() => setOpen(false)}>My Orders</NavLink>}
          <NavLink to="/" onClick={() => setOpen(false)}>Contact</NavLink>

          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
            >
              Login
            </button>
          ) : (
            <button
              onClick={logout}
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
