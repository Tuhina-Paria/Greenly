import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { dummyOrders } from "../assets/assets";
import { useParams } from "react-router-dom";


const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { currency,axios, user} = useAppContext();
  const { orderId } = useParams();  //



  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get(`/api/order/${orderId}`);  // ✅ fetch 1 order

      if (data.success) {
        setMyOrders([data.order]);   // ✅ wrap as array for your .map()
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
  if (user && orderId) {
    fetchMyOrders();
  }
}, [user, orderId]);

  return (
    <div className="mt-20 pb-16 max-w-5xl mx-auto px-4">
      {/* Title */}
      <div className="flex flex-col mb-8">
        <p className="text-2xl font-medium tracking-wide text-gray-800">
          Order Details 
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

  {/* Row 1 — Order ID + Address */}
  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 mb-2">
    <p><strong>Order ID:</strong> {order._id}</p>
    <p className="text-gray-600">
      <strong>Address:</strong> {order.address?.street}, {order.address?.city},
      <p> {order.address?.state},{order.address?.pincode}</p>

    </p>
  </div>

  {/* Row 2 */}
  <p><strong>Payment:</strong> {order.paymentType}</p>
  <p><strong>Total:</strong> {currency}{order.amount}</p>

</div>

          {/* Address Plain Text */}
          


          {/* Each Item */}
          {order.items.map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg mb-4 bg-gray-50 md:bg-white md:flex md:border-b md:border-gray-200`}
            >
              {/* ---------- MOBILE VIEW ---------- */}
              <div className="md:hidden"> 
                
                {/* Image */}
                <div className="w-full flex justify-center mb-3">
                  <img
                    src={item.product.image[0]}
                    className="w-24 h-24 rounded-lg object-cover shadow-sm"
                  />
                </div>

                {/* Product Info */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 text-center">
                    {item.product.name}
                  </h2>
                  {/* <p className="text-gray-500 text-sm mb-3">
                    Category: {item.product.category}
                  </p> */}
                </div>

                {/* Status Box */}
                <div className="bg-white p-3 rounded-xl shadow mb-3 text-sm">
                  <p>Quantity: {item.quantity}</p>
                  <p>Status: {order.status}</p>
                  <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>

                {/* Amount bottom */}
                {/* <p className="text-primary text-xl font-bold text-right">
                  {currency}{item.product.offerPrice * item.quantity}
                </p> */}
              </div>

              {/* ---------- DESKTOP VIEW ---------- */}
              <div className="hidden md:flex md:items-center md:justify-between w-full">
                
                {/* Left image + name */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.image[0]}
                    className="w-20 h-20 rounded-lg object-cover bg-gray-100"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {item.product.name}
                    </h2>
                    {/* <p className="text-gray-500 text-sm">
                      Category: {item.product.category}
                    </p> */}
                  </div>
                </div>

                {/* Center details */}
                <div className="text-gray-700 text-sm">
                  <p>Quantity: {item.quantity}</p>
                  <p>Status: {order.status}</p>
                  <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>

                {/* Right amount */}
                <p className="text-primary text-lg font-semibold"> Amount:
                  {currency}{item.product.offerPrice * item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyOrders;



