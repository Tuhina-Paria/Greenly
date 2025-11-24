import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { currency, selectedAddress } = useAppContext();

  // Temporary order ID — in real backend this comes from DB
  const orderId = "ORD" + Math.floor(Math.random() * 900000 + 100000);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-4 mt-20">
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-10 max-w-lg w-full text-center">

        {/* Green Tick */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-green-100 border border-green-300 rounded-full flex items-center justify-center">
            <span className="text-5xl text-green-600">✓</span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-semibold text-green-700 mb-2">
          Order Confirmed!
        </h1>
        <p className="text-gray-600 text-sm mb-6">
          Thank you for shopping with us. Your order has been placed successfully.
        </p>

        {/* Order Details Card */}
        <div className="bg-green-50 border border-green-300 rounded-lg p-4 mb-6 text-left">
          <p className="mb-1">
            <span className="font-medium">Order ID: </span>
            <span className="text-green-700">{orderId}</span>
          </p>

          {selectedAddress && (
            <p className="text-sm text-gray-700">
              <span className="font-medium">Deliver To: </span>
              {selectedAddress.street}, {selectedAddress.city},{" "}
              {selectedAddress.state} - {selectedAddress.pincode}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/")}
            className="py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
          >
            Continue Shopping
          </button>

          <button
            onClick={() => navigate("/my-orders")}
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
