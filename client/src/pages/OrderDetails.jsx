import React from "react";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const { orderId } = useParams();

  // Later you will replace this with API data
  const order = {
    productName: "Apple Watch",
    color: "Gray",
    price: 1500,
    shippingAddress: "45 Onye’s House",
    trackingId: "153468790876",
    deliveryDate: "11/03/26, 04:54 PM",
    productImage: "https://i.imgur.com/8Km9tLL.png",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex justify-center p-5">
      
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl mt-20 p-6 border border-green-100">

        {/* Delivery Illustration */}
        <div className="flex justify-center mb-4">
          <img
            src="/3d-delivery2.jpg"
            alt="delivery"
            className="w-45 drop-shadow-lg"
          />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-green-900">
          Order Status
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Your package is on the way
        </p>

        {/* Product Card */}
        <div className="flex items-center bg-green-50 border border-green-200 p-4 rounded-xl shadow-sm mb-6">
          <img
            src={order.productImage}
            alt="product"
            className="w-16 h-16 rounded-xl mr-4 border border-gray-200"
          />

          <div className="flex-1">
            <h2 className="font-semibold text-gray-800">{order.productName}</h2>
            <p className="text-gray-500 text-sm">Color: {order.color}</p>
          </div>

          <p className="font-semibold text-green-700">
            ${order.price.toFixed(2)}
          </p>
        </div>

        {/* Summary */}
        <h3 className="font-bold text-lg mb-2 text-gray-800">Order Summary</h3>

        <div className="border-t pt-4 space-y-3 text-sm">

          <div className="flex justify-between">
            <p className="text-gray-600">Order ID</p>
            <p className="font-medium">{orderId}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-600">Shipping Address</p>
            <p className="text-right font-medium">{order.shippingAddress}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-600">Tracking ID</p>
            <p className="font-medium">{order.trackingId}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-600">Est. Delivery Date</p>
            <p className="font-medium">{order.deliveryDate}</p>
          </div>
        </div>

        {/* Track Button */}
        <button className="w-full bg-green-600 text-white py-3 rounded-full mt-6 text-lg font-semibold hover:bg-green-700 active:scale-95 transition-all">
          Track Order
        </button>

        <p className="text-center text-green-600 text-sm mt-3">
         Your package is being shipped to you.
        </p>
      </div>
    </div>
  );
};

export default OrderDetails;
