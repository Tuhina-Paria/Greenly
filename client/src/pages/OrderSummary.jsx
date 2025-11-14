import React from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import StepProgress from "../components/StepProgress";

const OrderSummary = () => {
  const {
    cartItems,
    products,
    currency,
    selectedAddress,
    setShowAddress,
  } = useAppContext();

  const navigate = useNavigate();

  // Prepare cart array with product details and quantity
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
    // Add order save logic here
    navigate("/payment");
  };

  if (!cartArray.length)
    return (
      <div className="text-center p-10">
        <p>Your cart is empty</p>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-4 mt-20">
      {/* Step Progress */}
      <StepProgress currentStep={2} />

      <h1 className="text-2xl font-semibold mb-6">Order Summary</h1>

      {/* Delivery Address */}
      <div className="bg-green-50 border border-green-300 p-4 rounded mb-6 flex justify-between items-center">
        <p>
          Delivery at{" "}
          <span className="font-semibold">{selectedAddress?.state}</span>,{" "}
          <span className="font-semibold">{selectedAddress?.pincode}</span>
        </p>
        <button
          className="text-green-600 underline text-sm"
          onClick={() => {
            setShowAddress(true);
            navigate("/cart");
          }}
        >
          Change
        </button>
      </div>

      {/* Items */}
      <div className="mb-6 space-y-4">
        {cartArray.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center border-b border-gray-200 py-2"
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

            {/* Price */}
            <p className="font-semibold">
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

      {/* Confirm Button */}
      <button
   onClick={handleConfirmOrder}
        className="w-full py-3 mt-6 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition shadow-md"
      >
        Confirm Order
      </button>
    </div>
  );
};

export default OrderSummary;
