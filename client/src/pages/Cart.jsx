import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets.js";

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

  const subtotal = getCartAmount();
  const tax = subtotal * 0.02;
  const total = subtotal + tax;

  const getCart = () => {
    const temp = Object.entries(cartItems)
      .map(([id, qty]) => {
        const product = products.find((p) => p._id === id);
        return product ? { ...product, quantity: qty } : null;
      })
      .filter(Boolean);

    setCartArray(temp);
  };

  useEffect(() => {
    if (products.length > 0) getCart();
  }, [products, cartItems]);

  // If cart empty
  if (getCartCount() === 0)
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <img src={assets.empty_cart} alt="Empty Cart" className="w-32 mb-4" />
        <p className="text-gray-600 text-lg mb-4">Your cart is empty</p>
        <button
          onClick={() => navigate("/products")}
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
        >
          Shop Now
        </button>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 mt-20 mb-10">

      {/* Center heading */}
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800 ">
        Shopping Cart
      </h1>

      <div className="flex flex-col md:flex-row gap-6">

        {/* LEFT SECTION */}
        <div className="flex-1 bg-white shadow rounded-lg p-4 sm:p-6">

          {/* HEADER ROW (GREEN) */}
          <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr] text-white text-sm font-medium p-2 rounded bg-green-600 mb-3">
            <p>Product</p>
            <p className="text-center">Price</p>
            <p className="text-center">Subtotal</p>
            <p className="text-center">Action</p>
          </div>

          {/* CART ITEMS */}
          {cartArray.map((product) => (
            <div
              key={product._id}
              className="flex flex-col gap-3 py-4 border-b border-gray-200 sm:grid sm:grid-cols-[2fr_1fr_1fr_1fr] sm:items-center"
            >
              {/* PRODUCT BLOCK */}
              <div className="flex items-center gap-4">
                <div
                  className="w-24 h-24 border border-gray-300 rounded flex items-center justify-center overflow-hidden bg-white cursor-pointer"
                  onClick={() => navigate(`/products/${product.category}/${product._id}`)}
                >
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div>
                  <p className="font-semibold text-gray-800">{product.name}</p>
                  <p className="text-gray-500 text-sm">
                    Weight: {product.weight || "N/A"}
                  </p>

                  {/* Qty selector */}
                  <div className="flex items-center gap-2 mt-2">
                    <p className="text-sm">Qty:</p>
                    <select
                      value={cartItems[product._id]}
                      onChange={(e) =>
                        updateCartItem(product._id, Number(e.target.value))
                      }
                      className="border border-green-300 px-2 py-1 rounded text-sm focus:ring-green-400 outline-none"
                    >
                      {Array.from(
                        { length: Math.max(9, cartItems[product._id]) },
                        (_, i) => i + 1
                      ).map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* PRICE */}
              <p className="hidden sm:block text-center text-gray-700 font-medium">
                {currency}
                {product.offerPrice.toFixed(2)}
              </p>

              {/* SUBTOTAL */}
              <p className="hidden sm:block text-center text-gray-700 font-medium">
                {currency}
                {(product.offerPrice * product.quantity).toFixed(2)}
              </p>

              {/* ACTION */}
              <div className="hidden sm:flex justify-center">
                <button
                  onClick={() => removeFromCart(product._id)}
                  className="w-10 h-10 flex items-center justify-center bg-green-50 border border-green-200 rounded-full hover:bg-green-100"
                >
                  <Trash2 className="w-5 h-5 text-green-600" />
                </button>
              </div>

              {/* MOBILE ROW */}
              <div className="flex sm:hidden justify-between">
                <p className="font-medium text-gray-700">
                  {currency}
                  {(product.offerPrice * product.quantity).toFixed(2)}
                </p>

                <button
                  onClick={() => removeFromCart(product._id)}
                  className="w-9 h-9 flex items-center justify-center bg-green-50 border border-green-200 rounded-full"
                >
                  <Trash2 className="w-5 h-5 text-green-600" />
                </button>
              </div>
            </div>
          ))}

          {/* Continue shopping */}
         <button
  onClick={() => navigate("/products")}
  className="flex items-center gap-2 text-green-600 font-medium mt-6 hover:gap-3 transition"
>
  <img src={assets.arrow_right_icon_colored} className="w-5" />
  Continue Shopping
</button>



        </div>

        {/* RIGHT SECTION — PRICE DETAILS */}
        <div className="max-w-[360px] w-full bg-white p-5 rounded-lg shadow border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Price Details</h2>
          <hr className="border-gray-300 mb-5" />

          <div className="text-gray-700 space-y-2 text-sm">
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

            <p className="flex justify-between text-base font-semibold pt-3 border-t">
              <span>Total</span>
              <span className="text-green-700">
                {currency}
                {total.toFixed(2)}
              </span>
            </p>
          </div>

          <button
            onClick={() => navigate("/order-summary")}
            className="w-full py-3 mt-6 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
