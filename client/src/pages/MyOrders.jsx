import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { currency, axios, user } = useAppContext();
  const navigate = useNavigate();

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/user");
      if (data.success) {
        setMyOrders(data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyOrders();
    }
  }, [user]);

  return (
    <div className="mt-20 pb-16 max-w-2xl mx-auto px-4">
      {/* Title */}
      <div className="flex flex-col mb-8">
        <p className="text-2xl font-medium tracking-wide text-gray-800">
          My Orders
        </p>
        <div className="w-20 h-1 bg-primary rounded-full mt-1"></div>
      </div>

      {/* Orders */}
      {myOrders.map((order, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-xl shadow-md p-4 mb-8 bg-white"
        >
          {/* Header */}
          <div className="text-gray-700 text-sm mb-4">
            <p>
              <strong>Order ID:</strong> {order._id}
            </p>
            <p>
              <strong>Payment:</strong> {order.paymentType}
            </p>
            <p>
              <strong>Total:</strong> {currency}
              {order.amount}
            </p>
          </div>

          {/* Items */}
          {order.items.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg mb-4 bg-gray-50 md:bg-white md:flex md:border-b md:border-gray-200"
            >
              {/* ---------- MOBILE VIEW ---------- */}
              <div className="md:hidden">
                {/* Image */}
                <div className="w-full flex justify-center mb-3">
                  <img
                    src={item.product.image[0]}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                </div>

                {/* Product Info */}
                <h2 className="text-lg font-semibold text-gray-900 text-center">
                  {item.product.name}
                </h2>

                {/* Status Box */}
                <div className="bg-white p-3 rounded-xl shadow mb-3 text-sm">
                  <p>Quantity: {item.quantity}</p>
                  <p>Status: {order.status}</p>
                  <p>
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* ---------- DESKTOP VIEW ---------- */}
              <div className="hidden md:flex md:items-center md:justify-between w-full">
                {/* Left image + name */}
                <div className="flex items-center gap-2">
                  <img
                    src={item.product.image[0]}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {item.product.name}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      Category: {item.product.category}
                    </p>
                  </div>
                </div>

                {/* Center details */}
                <div className="text-gray-700 text-sm">
                  <p>Quantity: {item.quantity}</p>
                  <p>Status: {order.status}</p>
                  <p>
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* 🔥 SINGLE VIEW DETAILS BUTTON */}
<div className="w-full flex  justify-center mt-3">
  <button
    onClick={() => navigate(`/order/${order._id}`)}
    className="
      px-6 py-2 
      bg-primary text-white 
      rounded-lg text-sm font-medium 
      hover:bg-primary-dark transition
      w-full sm:w-1/2 lg:w-1/2
      text-center
    "
  >
    View Details
  </button>
</div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
