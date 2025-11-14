import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { dummyAddress, assets } from "../assets/assets.js";
import StepProgress from "../components/StepProgress";



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
  // const [selectedAddress, setSelectedAddress] = useState(dummyAddress[0]);
  const { selectedAddress, setSelectedAddress } = useAppContext();

  const [paymentOption, setPaymentOption] = useState("COD");

  // Manage step: 1=Cart, 2=Address, 3=Payment
  const [currentStep, setCurrentStep] = useState(1);

  const subtotal = getCartAmount();
  const tax = subtotal * 0.02;
  const total = subtotal + tax;

  const getCart = () => {
    const tempArray = Object.entries(cartItems)
      .map(([id, qty]) => {
        const product = products.find((item) => item._id === id);
        return product ? { ...product, quantity: qty } : null;
      })
      .filter(Boolean);

    setCartArray(tempArray);
  };

  useEffect(() => {
    if (products.length > 0 && cartItems) getCart();
  }, [products, cartItems]);

  const placeOrder = async () => {
    console.log("Order placed:", { selectedAddress, paymentOption, total });
  };

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
    <>
      {/* Step Progress */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 mt-20">
        <StepProgress
          currentStep={currentStep}
          addressCompleted={!!selectedAddress}
          paymentCompleted={false}
        />
      </div>

      {/* Delivery Address Summary Bar */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 mt-6 mb-6 relative">
        <div className="flex items-center justify-between bg-green-50 border border-green-300 rounded-md p-4">
          {selectedAddress ? (
            <>
              <p className="text-green-700 font-medium text-sm">
                Delivery at <span className="font-semibold">{selectedAddress.state}</span>,{" "}
                <span className="font-semibold">{selectedAddress.pincode}</span>
              </p>
              <button
                onClick={() => setShowAddress(!showAddress)}
                className="text-green-600 underline text-sm"
              >
                Change
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowAddress(true)}
              className="text-green-600 font-semibold text-sm underline"
            >
              Add Delivery Address
            </button>
          )}

          {/* Address selection dropdown */}
          {showAddress && (
            <div className="absolute top-full left-0 z-50 mt-2 bg-white border border-green-300 rounded shadow p-4 w-full max-w-md">
              <p className="mb-2 font-semibold">Select Delivery Address</p>
              {addresses.map((addr, i) => (
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
      </div>

      {/* Main Cart + Order Summary */}
      <div className="flex flex-col md:flex-row mt-6 gap-6 px-4 md:px-8 max-w-5xl mx-auto">
        {/* LEFT SECTION */}
        <div className="flex-1 max-w-4xl bg-white shadow rounded-lg p-4 sm:p-6">
          <h1 className="text-2xl font-semibold mb-6 text-gray-800 flex justify-between items-center">
            Shopping Cart
            <span className="text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full">
              {getCartCount()} Items
            </span>
          </h1>

          {/* Desktop Header */}
          <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-sm font-medium pb-2 border-b border-gray-200 mb-2">
            <p>Product</p>
            <p className="text-center">Subtotal</p>
            <p className="text-center">Action</p>
          </div>

          {/* CART ITEMS */}
          {cartArray.map((product, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 py-4 border-b border-gray-100 hover:bg-green-50/40 transition rounded-lg
                         sm:grid sm:grid-cols-[2fr_1fr_1fr] sm:items-center"
            >
              {/* PRODUCT INFO */}
              <div className="flex items-center gap-3 sm:gap-5">
                <div
                  onClick={() => {
                    navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
                    scrollTo(0, 0);
                  }}
                  className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden bg-white"
                >
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain transition-transform duration-200 hover:scale-105"
                  />
                </div>

                <div>
                  <p className="font-semibold text-gray-800 text-sm sm:text-base">{product.name}</p>
                  <p className="text-gray-500 text-xs sm:text-sm">Weight: {product.weight || "N/A"}</p>

                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-sm">Qty:</p>

                    <select
                      onChange={(e) => updateCartItem(product._id, Number(e.target.value))}
                      value={cartItems[product._id]}
                      className="border border-green-300 rounded px-2 py-1 outline-none text-sm focus:ring-2 focus:ring-green-400"
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

              {/* SMALL SCREEN: SUBTOTAL + TRASH SIDE BY SIDE */}
              <div className="flex sm:hidden items-center justify-between mt-2">
                <p className="text-gray-700 font-medium text-sm">
                  {currency}
                  {(product.offerPrice * product.quantity).toFixed(2)}
                </p>

                <button
                  onClick={() => removeFromCart(product._id)}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-green-50 hover:bg-green-100
                             border border-green-200 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <Trash2 className="w-5 h-5 text-green-600" />
                </button>
              </div>

              {/* DESKTOP SUBTOTAL */}
              <p className="hidden sm:block text-center text-gray-700 font-medium text-base">
                {currency}
                {(product.offerPrice * product.quantity).toFixed(2)}
              </p>

              {/* DESKTOP TRASH */}
              <div className="hidden sm:flex justify-center">
                <button
                  onClick={() => removeFromCart(product._id)}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-green-50 hover:bg-green-100
                             border border-green-200 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <Trash2 className="w-5 h-5 text-green-600" />
                </button>
              </div>
            </div>
          ))}

          {/* CONTINUE SHOPPING */}
          <button
            onClick={() => {
              navigate("/products");
              scrollTo(0, 0);
            }}
            className="flex items-center gap-2 text-green-600 font-medium mt-6 hover:gap-3 transition"
          >
            <img src={assets.arrow_right_icon_colored} alt="arrow" className="w-5 h-5" />
            Continue Shopping
          </button>
        </div>

        {/* RIGHT SECTION */}
        <div className="max-w-[360px] w-full bg-white p-5 rounded-lg shadow border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Price Details</h2>
          <hr className="border-gray-300 mb-5" />

          {/* Summary */}
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
  onClick={() => navigate("/order-summary")}
  className="w-full py-3 mt-6 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition shadow-md"
>
  Place Order
</button>

        </div>
      </div>
    </>
  );
};

export default Cart;
