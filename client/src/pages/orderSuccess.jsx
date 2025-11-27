import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

// Confetti animation library
import confetti from "canvas-confetti";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { selectedAddress } = useAppContext();

  // Random order ID
  const orderId = "ORD" + Math.floor(Math.random() * 900000 + 100000);

  // Trigger confetti on mount
  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-4 mt-20">

      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 max-w-lg w-full text-center animate-fadeInUp">

        {/* Animated Tick */}
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 bg-green-100 border border-green-300 rounded-full flex items-center justify-center animate-pingOnce">
            <span className="text-6xl text-green-600 animate-scaleIn">✓</span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-semibold text-green-700 mb-2 animate-fadeIn">
          Thank You!
        </h1>

        <p className="text-gray-600 mb-6 animate-fadeInDelay">
          Your order has been placed successfully.
        </p>

        {/* Order Details Card */}
        <div className="bg-green-50 border border-green-300 rounded-lg p-4 mb-6 text-left animate-fadeInDelay2">
          <p className="mb-2">
            <span className="font-medium">Order ID: </span>
            <span className="text-green-700">{orderId}</span>
          </p>

          {selectedAddress && (
            <p className="text-sm text-gray-700 leading-5">
              <span className="font-medium">Deliver To: </span>
              {selectedAddress.street}, {selectedAddress.city},{" "}
              {selectedAddress.state} - {selectedAddress.pincode}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 animate-fadeInDelay3">
          <button
            onClick={() => navigate("/")}
            className="py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
          >
            Continue Shopping
          </button>

          <button
            // onClick={() => navigate(`/order/${orderId}`)}
            onClick={() => navigate('/my-orders')}
            className="py-3 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg font-medium hover:bg-gray-200 transition"
          >
            View My Orders
          </button>
        </div>

      </div>

    </div>
  );
};

export default OrderSuccess;
