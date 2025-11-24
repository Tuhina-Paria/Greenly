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
    <div className="max-w-4xl mx-auto p-4 mt-24">

      {/* Heading */}
      <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Order Summary
      </h1>

      {/* =================== ADDRESS CARD =================== */}
      <div className="bg-white p-5 rounded-xl shadow-md border border-gray-200 mb-6">
        <p className="text-lg font-semibold text-gray-800 mb-3">
          Delivery Address
        </p>

        <div className="flex items-center justify-between bg-green-50 border border-green-300 rounded-lg p-4">
          {selectedAddress ? (
            <>
              <p className="text-green-700 text-sm font-medium">
                Delivering to{" "}
                <span className="font-semibold">{selectedAddress.state}</span>,{" "}
                <span className="font-semibold">
                  {selectedAddress.pincode}
                </span>
              </p>

              <button
                onClick={() => setShowAddress(!showAddress)}
                className="text-green-700 underline text-sm font-medium"
              >
                Change
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowAddress(true)}
              className="text-green-600 underline text-sm font-medium"
            >
              Add Delivery Address
            </button>
          )}
        </div>

        {/* Address Dropdown */}
        {showAddress && (
          <div className="mt-3 bg-white border border-green-300 rounded-lg shadow-md p-4">
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

      {/* =================== ITEMS CARD =================== */}
      <div className="bg-white p-5 rounded-xl shadow-md border border-gray-200 mb-6">
        <p className="text-lg font-semibold text-gray-800 mb-3">
          Items in Your Order
        </p>

        <div className="space-y-4">
          {cartArray.map((item) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-200 pb-3"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="w-16 h-16 object-contain rounded border border-gray-300 bg-white"
                />

                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>

              <p className="font-semibold mt-2 sm:mt-0 text-gray-700">
                {currency}
                {(item.offerPrice * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* =================== PRICE CARD =================== */}
      <div className="bg-white p-5 rounded-xl shadow-md border border-gray-200">
        <p className="text-lg font-semibold text-gray-800 mb-3">
          Price Details
        </p>

        <div className="text-gray-700 space-y-2 text-sm sm:text-base">
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

          <p className="flex justify-between text-base font-semibold border-t pt-3 mt-3">
            <span>Total</span>
            <span className="text-green-700">
              {currency}
              {total.toFixed(2)}
            </span>
          </p>
        </div>
      </div>

      {/* =================== BUTTONS =================== */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={() => navigate("/cart")}
          className="flex-1 py-3 rounded-lg font-medium 
          bg-gray-200 text-gray-700 border border-gray-300
          hover:bg-gray-300 transition"
        >
          Back to Cart
        </button>

        <button
          onClick={handleConfirmOrder}
          className="flex-1 py-3 rounded-lg font-medium 
          bg-green-600 text-white shadow-md
          hover:bg-green-700 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
