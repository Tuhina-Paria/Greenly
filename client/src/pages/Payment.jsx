import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const { cartItems, products, currency, selectedAddress } = useAppContext();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("COD");

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

  const handlePlaceOrder = () => {
    alert(`Order placed successfully!\nPayment Method: ${paymentMethod}`);
    navigate("/order-complete");
  };

  if (!cartArray.length)
    return (
      <div className="text-center p-10">
        <p>Your cart is empty</p>
      </div>
    );

  if (!selectedAddress)
    return (
      <div className="text-center p-10">
        <p>Please select a delivery address before proceeding.</p>
      </div>
    );

  return (
    <div className="flex justify-center px-4 mt-28">
      <div className="w-full max-w-md">
        {/* PAGE TITLE */}
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-700">
          Payment
        </h1>

        {/* Delivery Address
        <div className="bg-green-600 text-white p-5 rounded-xl shadow-md mb-6 text-center">
          <h3 className="font-semibold text-lg">Delivery Address</h3>
          <p className="text-sm opacity-90 mt-1">
            {selectedAddress.street}, {selectedAddress.city},{" "}
            {selectedAddress.state} - {selectedAddress.pincode}
          </p>
        </div> */}

        {/* Payment Method (CENTERED) */}
        <div className="border border-gray-300 p-5 rounded-xl shadow-sm bg-white mb-8">
          <h3 className="text-gray-800 font-semibold text-lg text-center mb-4">
            Select Payment Method
          </h3>

          <div className="space-y-3">
            {/* COD */}
            <label
              htmlFor="payment-cod"
              className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg border 
                ${
                  paymentMethod === "COD"
                    ? "border-green-600 bg-green-50"
                    : "border-gray-300"
                }`}
            >
              <input
                id="payment-cod"
                type="radio"
                name="paymentMethod"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")}
              />
              <span className="font-medium text-gray-700">
                Cash on Delivery
              </span>
            </label>

            {/* ONLINE */}
            <label
              htmlFor="payment-online"
              className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg border 
                ${
                  paymentMethod === "Online"
                    ? "border-green-600 bg-green-50"
                    : "border-gray-300"
                }`}
            >
              <input
                id="payment-online"
                type="radio"
                name="paymentMethod"
                value="Online"
                checked={paymentMethod === "Online"}
                onChange={() => setPaymentMethod("Online")}
              />
              <span className="font-medium text-gray-700">Online Payment</span>
            </label>
          </div>
        </div>

        {/* Price Summary — LAST */}
        <div className="border border-gray-300 p-5 rounded-xl shadow-sm bg-white mb-8">
          <h3 className="text-gray-800 font-semibold text-lg mb-4 text-center">
            Price Details
          </h3>

          <p className="flex justify-between text-gray-700 mb-2 text-sm">
            <span>Subtotal</span>
            <span>{currency}{subtotal.toFixed(2)}</span>
          </p>

          <p className="flex justify-between text-gray-700 mb-2 text-sm">
            <span>Tax (2%)</span>
            <span>{currency}{tax.toFixed(2)}</span>
          </p>

          <p className="flex justify-between border-t pt-3 mt-3 text-lg font-semibold text-green-700">
            <span>Total</span>
            <span>{currency}{total.toFixed(2)}</span>
          </p>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/cart")}
            className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium 
              hover:bg-gray-300 transition shadow-sm"
          >
            Back
          </button>

          <button
            onClick={handlePlaceOrder}
            className="flex-1 py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition shadow-md"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
