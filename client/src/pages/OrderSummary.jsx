import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { dummyAddress } from "../assets/assets.js";

const OrderSummary = () => {
  const {
    cartItems,
    products,
    currency,
    selectedAddress,
    setSelectedAddress,
  } = useAppContext();

  const navigate = useNavigate();
  const [showAddress, setShowAddress] = useState(false);

  // Prepare cart array
  const cartArray = Object.entries(cartItems)
    .map(([id, qty]) => {
      const product = products.find((item) => item._id === id);
      return product ? { ...product, quantity: qty } : null;
    })
    .filter(Boolean);

  const subtotal = cartArray.reduce(
    (acc, item) => acc + item.offerPrice * item.quantity,
    0
  );
  const tax = subtotal * 0.02;
  const total = subtotal + tax;

  const handleConfirmOrder = () => {
    navigate("/payment");
  };

  if (!cartArray.length)
    return (
      <div className="text-center p-10">
        <p>Your cart is empty</p>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-4 mt-20 relative">
      <h1 className="text-2xl font-semibold mb-6">Order Summary</h1>

      {/* Address Bar */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 mb-6 relative">
        <div className="flex items-center justify-between bg-green-50 border border-green-300 rounded-md p-4">
          {selectedAddress ? (
            <>
              <p className="text-green-700 font-medium text-sm">
                Delivery at{" "}
                <span className="font-semibold">{selectedAddress.state}</span>,{" "}
                <span className="font-semibold">{selectedAddress.pincode}</span>
              </p>

              <button
                onClick={() => setShowAddress(!showAddress)}
                className="text-green-600 underline text-sm"
              >
                Change
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowAddress(true)}
              className="text-green-600 font-semibold text-sm underline"
            >
              Add Delivery Address
            </button>
          )}

          {showAddress && (
            <div className="absolute top-full left-0 z-50 mt-2 bg-white border border-green-300 rounded shadow p-4 w-full max-w-md">
              <p className="mb-2 font-semibold">Select Delivery Address</p>

              {dummyAddress.map((addr, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setSelectedAddress(addr);
                    setShowAddress(false);
                  }}
                  className="cursor-pointer p-2 hover:bg-green-100 rounded"
                >
                  {addr.street}, {addr.city}, {addr.state}, {addr.pincode}
                </div>
              ))}

              <button
                onClick={() => {
                  setShowAddress(false);
                  navigate("/add-address");
                }}
                className="mt-3 text-green-600 underline"
              >
                + Add New Address
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Cart Items */}
      <div className="mb-6 space-y-4">
        {cartArray.map((item) => (
          <div
            key={item._id}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-200 py-2"
          >
            {/* Image + Name + Qty */}
            <div className="flex items-center gap-4">
              <img
                src={item.image[0]}
                alt={item.name}
                className="w-16 h-16 object-contain rounded border border-gray-300 bg-white"
              />
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>

            {/* Price (below on mobile, right on big screens) */}
            <p className="font-semibold mt-2 sm:mt-0">
              {currency}
              {(item.offerPrice * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* Price Summary */}
      <div className="text-gray-700 space-y-2 text-sm sm:text-base border-t pt-4">
        <p className="flex justify-between">
          <span>Subtotal</span>
          <span>
            {currency}
            {subtotal.toFixed(2)}
          </span>
        </p>

        <p className="flex justify-between">
          <span>Tax (2%)</span>
          <span>
            {currency}
            {tax.toFixed(2)}
          </span>
        </p>

        <p className="flex justify-between text-base font-semibold pt-3 border-t mt-3">
          <span>Total</span>
          <span className="text-green-700">
            {currency}
            {total.toFixed(2)}
          </span>
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={() => navigate("/cart")}
          className="flex-1 py-3 bg-gray-300 text-gray-800 rounded-md font-medium hover:bg-gray-400 transition"
        >
          Cancel
        </button>

        <button
          onClick={handleConfirmOrder}
          className="flex-1 py-3 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition"
        >
         Continue
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
