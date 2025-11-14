import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import StepProgress from "../components/StepProgress";

const Payment = () => {
  const {
    cartItems,
    products,
    currency,
    selectedAddress,
  } = useAppContext();

  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("COD"); // COD or Online

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

  const handlePlaceOrder = () => {
    // Here you can add your order submission logic (API call, etc)
    alert(`Order placed successfully!\nPayment Method: ${paymentMethod}`);
    navigate("/order-complete"); // Create this route/page later
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

console.log("Payment page rendered");
console.log({ cartItems, products, selectedAddress });


  return (
    <div className="max-w-5xl mx-auto p-4 mt-26">
      {/* Step Progress */}
      <div className="mb-8">
        <StepProgress currentStep={3} />
      </div>

      <h1 className="text-2xl font-semibold mb-6">Payment</h1>

      {/* Delivery Address */}
      <div className="bg-green-50 border border-green-300 p-4 rounded mb-6">
        <p>
          Delivery at{" "}
          <span className="font-semibold">{selectedAddress.state}</span>,{" "}
          <span className="font-semibold">{selectedAddress.pincode}</span>
        </p>
      </div>

      {/* Order Summary */}
      <div className="mb-6 text-gray-700 text-sm sm:text-base space-y-2 border border-gray-300 rounded p-4">
        <p className="flex justify-between">
          <span>Subtotal</span>
          <span>{currency}{subtotal.toFixed(2)}</span>
        </p>
        <p className="flex justify-between">
          <span>Tax (2%)</span>
          <span>{currency}{tax.toFixed(2)}</span>
        </p>
        <p className="flex justify-between font-semibold pt-3 border-t mt-3 text-green-700">
          <span>Total</span>
          <span>{currency}{total.toFixed(2)}</span>
        </p>
      </div>

      {/* Payment Method Selection */}
      <div className="mb-6">
        <p className="font-medium mb-2">Select Payment Method:</p>

        <label className="inline-flex items-center mr-6 cursor-pointer">
          <input
            type="radio"
            className="form-radio"
            name="paymentMethod"
            value="COD"
            checked={paymentMethod === "COD"}
            onChange={() => setPaymentMethod("COD")}
          />
          <span className="ml-2">Cash on Delivery</span>
        </label>

        <label className="inline-flex items-center cursor-pointer">
          <input
            type="radio"
            className="form-radio"
            name="paymentMethod"
            value="Online"
            checked={paymentMethod === "Online"}
            onChange={() => setPaymentMethod("Online")}
          />
          <span className="ml-2">Online Payment</span>
        </label>
      </div>

      {/* Place Order Button */}
      <button
        onClick={handlePlaceOrder}
        className="w-full py-3 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition shadow-md"
      >
        Place Order
      </button>
    </div>
  );
};

export default Payment;
