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

  // ✅ Build cart array cleanly (no mutation)
  const getCart = () => {
    const tempArray = Object.entries(cartItems).map(([id, qty]) => {
      const product = products.find((item) => item._id === id);
      return product ? { ...product, quantity: qty } : null;
    }).filter(Boolean);
    setCartArray(tempArray);
  };

  // ✅ Navigate to product detail smoothly
  const handleNavigateToProduct = (category, id) => {
    navigate(`/products/${category.toLowerCase()}/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Remove from cart
  const handleRemove = (id) => removeFromCart(id);

  // ✅ Calculate totals
  const subtotal = getCartAmount();
  const tax = subtotal * 0.02;
  const total = subtotal + tax;

  const placeOrder = async () => {
    // You can integrate your order API here
    console.log("Placing order with:", {
      selectedAddress,
      paymentOption,
      total,
      cartArray,
    });
  };

  useEffect(() => {
    if (products.length > 0 && cartItems) {
      getCart();
    }
  }, [products, cartItems]);

  // ✅ Empty cart state
  if (getCartCount() === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-gray-600 py-20">
        <img src={assets.empty_cart} alt="Empty Cart" className="w-40 mb-6 opacity-80" />
        <p className="text-lg font-medium mb-4">Your cart is empty</p>
        <button
          onClick={() => navigate("/products")}
          className="bg-indigo-500 text-white px-5 py-2 rounded-full hover:bg-indigo-600 transition"
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 mt-20 px-4 md:px-8">
      {/* 🛒 Left Section */}
      <div className="flex-1 bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl md:text-3xl font-semibold mb-6 flex items-center justify-between">
          Shopping Cart
          <span className="text-sm text-indigo-500">{getCartCount()} Items</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-sm md:text-base font-medium pb-3 border-b">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr] text-gray-700 items-center text-sm md:text-base py-4 border-b last:border-none"
          >
            <div className="flex items-center gap-4">
              <div
                onClick={() => handleNavigateToProduct(product.category, product._id)}
                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-200 rounded-xl overflow-hidden hover:shadow-sm transition"
              >
                <img
                  className="w-full h-full object-cover"
                  src={product.image[0]}
                  alt={product.name}
                />
              </div>
              <div>
                <p className="font-semibold">{product.name}</p>
                <p className="text-gray-500 text-sm">Weight: {product.weight || "N/A"}</p>
                <div className="flex items-center gap-2 mt-1">
                  <p>Qty:</p>
                  <select
                    onChange={(e) =>
                      updateCartItem(product._id, Number(e.target.value))
                    }
                    value={cartItems[product._id]}
                    className="border rounded px-2 py-1 outline-none text-sm"
                  >
                    {Array.from(
                      { length: Math.max(9, cartItems[product._id]) },
                      (_, i) => i + 1
                    ).map((val) => (
                      <option key={val} value={val}>
                        {val}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <p className="text-center font-medium">
              {currency}
              {(product.offerPrice * product.quantity).toFixed(2)}
            </p>

            <button
              onClick={() => handleRemove(product._id)}
              className="mx-auto hover:scale-110 transition"
            >
              <img
                src={assets.refresh_icon}
                alt="remove"
                className="inline-block w-6 h-6 opacity-70"
              />
            </button>
          </div>
        ))}

        <button
          onClick={() => {
            navigate("/products");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="group flex items-center mt-8 gap-2 text-indigo-500 font-medium hover:gap-3 transition"
        >
          <img
            src={assets.arrow_right_icon_colored}
            alt="arrow"
            className="w-5 h-5"
          />
          Continue Shopping
        </button>
      </div>

      {/* 💳 Right Section */}
      <div className="w-full md:w-[360px] bg-white rounded-2xl shadow-md p-6 h-fit">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <hr className="border-gray-200 mb-5" />

        {/* Address */}
        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative flex justify-between items-start mt-2">
            <p className="text-gray-600 text-sm w-4/5">
              {selectedAddress
                ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}`
                : "No address found"}
            </p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-indigo-500 hover:underline text-sm"
            >
              Change
            </button>
            {showAddress && (
              <div className="absolute top-10 bg-white border border-gray-300 text-sm w-full shadow-lg rounded-md z-10">
                {addresses.map((address, index) => (
                  <p
                    key={index}
                    onClick={() => {
                      setSelectedAddress(address);
                      setShowAddress(false);
                    }}
                    className="p-2 text-gray-600 hover:bg-gray-100 cursor-pointer"
                  >
                    {address.street}, {address.city}, {address.state}
                  </p>
                ))}
                <p
                  onClick={() => navigate("/add-address")}
                  className="text-indigo-500 text-center p-2 hover:bg-indigo-50 cursor-pointer"
                >
                  + Add new address
                </p>
              </div>
            )}
          </div>

          {/* Payment */}
          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
          <select
            onChange={(e) => setPaymentOption(e.target.value)}
            className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 rounded-md outline-none"
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        {/* Summary */}
        <hr className="border-gray-200 mb-5" />
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
          <p className="flex justify-between text-base font-semibold pt-3 border-t mt-3">
            <span>Total</span>
            <span>
              {currency}
              {total.toFixed(2)}
            </span>
          </p>
        </div>

        <button
          onClick={placeOrder}
          className="w-full py-3 mt-6 bg-indigo-500 text-white rounded-md font-medium hover:bg-indigo-600 transition"
        >
          {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
        </button>
      </div>
    </div>
  );
};

export default Cart;
