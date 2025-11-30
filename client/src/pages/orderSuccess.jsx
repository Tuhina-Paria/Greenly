import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import confetti from "canvas-confetti";

const OrderSuccess = () => {
  const navigate = useNavigate();

  const orderId = "ORD" + Math.floor(Math.random() * 900000 + 100000);

  useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 60,
      origin: { y: 0.7 },
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4 mt-18">

      <div
        className="
          bg-white rounded-3xl shadow-xl
          w-full max-w-sm   /* PERFECT FOR MOBILE */
          sm:max-w-md       /* TABLET */
          lg:max-w-lg       /* LARGE SCREEN */
          py-10 px-6 sm:px-10
          text-center
        "
      >

        {/* Success Icon */}
        <div className="flex justify-center mb-5">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-100 border border-green-300 rounded-full flex items-center justify-center shadow-md">
            <span className="text-5xl sm:text-6xl text-green-600 font-bold">✓</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-700">
          Order Confirmed!
        </h1>

        {/* Subtitle */}
        <p className="text-gray-700 mt-2 text-sm sm:text-base">
          Thank you for your purchase.
        </p>

       

        {/* Delivery line */}
        <p className="text-green-900 mt-4 text-sm sm:text-base font-semibold">
          Your items will be delivered soon.
        </p>

        {/* Buttons */}
        <div className="flex flex-col items-center gap-3 mt-8 w-full">

          <button
            onClick={() => navigate("/")}
            className="
              w-full sm:w-auto
              px-6 py-3
              bg-green-600 text-white
              rounded-xl
              text-sm sm:text-base font-semibold
              hover:bg-green-700 transition
            "
          >
            Continue Shopping
          </button>

          <button
            onClick={() => navigate("/my-orders")}
            className="
              w-full sm:w-auto
              px-6 py-3
              bg-gray-100 text-gray-800
              border border-gray-300
              rounded-xl
              text-sm sm:text-base font-semibold
              hover:bg-gray-200 transition
            "
          >
            View My Orders
          </button>
        </div>

      </div>
    </div>
  );
};

export default OrderSuccess;
