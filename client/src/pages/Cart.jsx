import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets, dummyAddress } from "../assets/assets.js";

const Cart = () => {
  const {
    products,
    currency,
    getCartCount,
    removeFromCart,
    cartItems,
    updateCartItem,
    navigate,
    getCartAmount,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddresses] = useState(dummyAddress);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(dummyAddress[0]);
  const [paymentOption, setPaymentOption] = useState("COD");

  const getCart = () => {
    const tempArray = Object.entries(cartItems)
      .map(([id, qty]) => {
        const product = products.find((item) => item._id === id);
        return product ? { ...product, quantity: qty } : null;
      })
      .filter(Boolean);
    setCartArray(tempArray);
  };

  const handleNavigateToProduct = (category, id) => {
    navigate(`/products/${category.toLowerCase()}/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRemove = (id) => removeFromCart(id);

  const subtotal = getCartAmount();
  const tax = subtotal * 0.02;
  const total = subtotal + tax;

  const placeOrder = async () => {
    console.log("Order placed:", { selectedAddress, paymentOption, total });
  };

  useEffect(() => {
    if (products.length > 0 && cartItems) {
      getCart();
    }
  }, [products, cartItems]);

  if (getCartCount() === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-gradient-to-b from-green-50 to-white px-6">
        <img src={assets.empty_cart} alt="Empty Cart" className="w-40 mb-6 opacity-90" />
        <p className="text-lg font-medium text-gray-600 mb-4">Your cart is empty</p>
        <button
          onClick={() => navigate("/")}
          className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-100 py-8 px-3 sm:px-6 md:px-10">
      <div className="flex flex-col md:flex-row gap-8 mt-18">
        {/* 🛒 Left Section */}
        <div className="flex-1 bg-white rounded-2xl shadow-md p-4 sm:p-6 border border-green-100">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-6 flex items-center justify-between text-gray-800">
            Shopping Cart
            <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
              {getCartCount()} Items
            </span>
          </h1>

          {/* 🧾 Header Row */}
          <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-sm font-medium pb-2 border-b border-gray-200 mb-2">
            <p className="text-left">Product Details</p>
            <p className="text-center">Subtotal</p>
            <p className="text-center">Action</p>
          </div>

          {/* Product List */}
          {cartArray.map((product, index) => (
            <div
              key={index}
              className="flex flex-col sm:grid sm:grid-cols-[2fr_1fr_1fr] sm:items-center justify-between gap-4 py-4 border-b border-gray-100 hover:bg-green-50/40 transition rounded-lg"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4 flex-1">
                <div
                  onClick={() => handleNavigateToProduct(product.category, product._id)}
                  className="cursor-pointer w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center border border-gray-200 rounded-xl overflow-hidden hover:shadow-md hover:border-green-300 transition"
                >
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold text-gray-800 text-sm sm:text-base">
                    {product.name}
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Weight: {product.weight || "N/A"}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-sm">Qty:</p>
                    <select
                      onChange={(e) => updateCartItem(product._id, Number(e.target.value))}
                      value={cartItems[product._id]}
                      className="border border-green-300 rounded px-2 py-1 outline-none text-sm focus:ring-2 focus:ring-green-400"
                    >
                      {Array.from({ length: Math.max(9, cartItems[product._id]) }, (_, i) => i + 1).map(
                        (val) => (
                          <option key={val} value={val}>
                            {val}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>
              </div>

              {/* Subtotal */}
              <p className="text-gray-800 font-medium text-center text-sm sm:text-base">
                {currency}
                {(product.offerPrice * product.quantity).toFixed(2)}
              </p>

              {/* Action */}
              <div className="flex justify-center">
                <button
                  onClick={() => handleRemove(product._id)}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-green-50 hover:bg-green-100 border border-green-200 shadow-sm hover:shadow-md transition-all duration-200"
                  title="Remove Item"
                >
                  <Trash2 className="w-5 h-5 text-green-600 hover:text-green-700 transition-transform hover:scale-110" />
                </button>
              </div>
            </div>
          ))}

          {/* Continue Shopping */}
          <button
            onClick={() => {
              navigate("/products");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group flex items-center mt-6 gap-2 text-green-600 font-medium hover:gap-3 transition"
          >
            <img src={assets.arrow_right_icon_colored} alt="arrow" className="w-5 h-5" />
            Continue Shopping
          </button>
        </div>

        {/* 💳 Right Section */}
        <div className="w-full md:w-[360px] bg-white rounded-2xl shadow-md p-5 sm:p-6 border border-green-100 mt-6 md:mt-0">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
          <hr className="border-green-200 mb-5" />

          {/* Address Section */}
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase text-gray-600">Delivery Address</p>
            <div className="relative flex justify-between items-start mt-2">
              <p className="text-gray-600 text-sm w-4/5">
                {selectedAddress
                  ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}`
                  : "No address found"}
              </p>
              <button
                onClick={() => setShowAddress(!showAddress)}
                className="text-green-600 hover:underline text-sm"
              >
                Change
              </button>
              {showAddress && (
  <div className="absolute top-10 bg-white border border-green-200 text-sm w-full shadow-lg rounded-md z-10">
    {addresses
      .filter(a => a.street && a.city && a.state)
      .map((address, index) => (
        <p
          key={index}
          onClick={() => {
            setSelectedAddress(address);
            setShowAddress(false);
          }}
          className="p-2 text-gray-600 hover:bg-green-50 cursor-pointer"
        >
          {address.street}, {address.city}, {address.state}
        </p>
      ))}

    <p
      onClick={() => navigate("/add-address")}
      className="text-green-600 text-center p-2 hover:bg-green-50 cursor-pointer border-t border-green-100"
    >
      + Add new address
    </p>
  </div>
)}

              
            </div>

            {/* Payment Method */}
            <p className="text-sm font-semibold uppercase text-gray-600 mt-6">Payment Method</p>
            <div className="relative mt-2">
              <select
                onChange={(e) => setPaymentOption(e.target.value)}
                value={paymentOption}
                className="w-full border border-green-400 bg-white px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-green-400 cursor-pointer shadow-sm text-sm sm:text-base truncate"
              >
                <option value="COD">💵 Cash On Delivery</option>
                <option value="Online">💳 Online Payment</option>
              </select>
            </div>
          </div>

          <hr className="border-green-200 mb-5" />

          {/* Summary Details */}
          <div className="text-gray-700 space-y-2 text-sm sm:text-base">
            <p className="flex justify-between">
              <span>Subtotal</span>
              <span>
                {currency}
                {subtotal.toFixed(2)}
              </span>
            </p>
            <p className="flex justify-between">
              <span>Shipping Fee</span>
              <span className="text-green-600">Free</span>
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

          <button
            onClick={placeOrder}
            className="w-full py-3 mt-6 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition shadow-md"
          >
            {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
