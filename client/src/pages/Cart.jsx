
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { assets, dummyAddress } from "../assets/assets.js";  // import dummyAddress
import toast from "react-hot-toast";

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
    axios,
    user,
    setCartItems
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);

  // New states for address & payment
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddress, setShowAddress] = useState(false);
  const [paymentOption, setPaymentOption] = useState("COD");

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

const getUserAddress=async()=>{
  try {
    const {data}=await axios.post('/api/address/get')
    if(data.success){
      setAddresses(data.addresses);
      if(data.addresses.length > 0){
        setSelectedAddress(data.addresses[0])
      }
    }else{
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
    
  }
}

  useEffect(() => {
    if (products.length > 0) getCart();
  }, [products, cartItems]);

  const placeOrder = async () => {
    // For demo: just alert order details
    try {
      if(!selectedAddress){
        return toast.error("Please Select an Address")
      }
      //Place order with COD
      if(paymentOption === "COD"){
        const {data}=await axios.post("/api/order/cod",{
          userId:user._id,
          items:cartArray.map(item=>({product:item._id,quantity:item.quantity})),
          address:selectedAddress._id
        })
        if(data.success){
          toast.success(data.message)
          setCartItems({});
          navigate('/order-complete')
          
        }else{
          toast.error(data.message)
        }
      }
    } catch (error) {
          toast.error(error.message)
      
    }
    // TODO: Replace with API call to backend here to place order
  };


    useEffect(()=>{
if(user){
  getUserAddress();
}
    },[user])



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
                  onClick={() =>
                    navigate(`/products/${product.category}/${product._id}`)
                  }
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

        {/* RIGHT SECTION — ORDER SUMMARY + ADDRESS + PAYMENT */}
        <div className="max-w-[360px] w-full bg-white p-6 rounded-lg shadow-lg border border-gray-200 flex flex-col gap-8">

          {/* Order Summary */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
            <div className="text-gray-700 space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>
                  {currency}
                  {subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span className="text-green-600 font-semibold">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (2%)</span>
                <span>
                  {currency}
                  {tax.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between border-t border-gray-300 pt-3 font-semibold text-lg">
                <span>Total</span>
                <span className="text-green-700">
                  {currency}
                  {total.toFixed(2)}
                </span>
              </div>
            </div>
          </section>

          {/* Delivery Address */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-3 uppercase tracking-wide">Delivery Address</h2>
            <div
              className="border border-gray-300 rounded-lg p-4 bg-green-50 shadow-sm relative flex flex-col gap-1"
            >
              <p className="text-gray-700 min-h-[64px]">
                {selectedAddress
                  ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}`
                  : "No address selected"}
              </p>
              <button
                type="button"
                onClick={() => setShowAddress(!showAddress)}
                className="self-end text-green-600 hover:underline font-semibold"
                aria-expanded={showAddress}
                aria-controls="address-list"
              >
                Change
              </button>
              </div>
{showAddress && (
  <div
    id="address-list"
    className="mt-2 bg-white border border-gray-300 rounded-md max-h-56 overflow-auto shadow-lg"
  >
    {addresses.map((address, idx) => (
      <div
        key={idx}
        className="px-4 py-3 hover:bg-green-100 cursor-pointer border-b border-gray-200"
      >
        <div
          onClick={() => {
            setSelectedAddress(address);
            setShowAddress(false);
          }}
          className="text-gray-700 text-sm leading-5"
        >
          {address.street}, {address.city}, {address.state},{" "}
          {address.country}, {address.pincode}
        </div>

        {/* Buttons row like Meesho */}
        <div className="flex justify-end gap-4 mt-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/edit-address/${address._id}`);
            }}
            className="text-blue-600 text-sm font-semibold hover:underline"
          >
            Edit
          </button>

          <button
  onClick={async (e) => {
    e.stopPropagation();
    try {
      const response = await axios.delete(`/api/address/delete/${address._id}`);
      const data = response.data;  // <-- extract data from response

      if (data.success) {
        toast.success("Address deleted");
        getUserAddress(); // refresh list

        // Optional: If the deleted address was selected, clear selection
        if (selectedAddress && selectedAddress._id === address._id) {
          setSelectedAddress(null);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }}
  className="text-red-600 text-sm font-semibold hover:underline"
>
  Delete
</button>

        </div>
      </div>
    ))}

    {/* Add new address */}
    <p
      onClick={() => navigate("/add-address")}
      className="px-4 py-3 text-green-600 font-semibold cursor-pointer hover:bg-green-100 text-center"
    >
      + Add Address
    </p>
  </div>
)}
</section>

          {/* Payment Method */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-3 uppercase tracking-wide">Payment Method</h2>
            <div role="radiogroup" aria-label="Payment Methods" className="flex flex-col gap-2">
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  checked={paymentOption === "COD"}
                  onChange={() => setPaymentOption("COD")}
                  className="mr-2"
                />
                Cash On Delivery
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="Online"
                  checked={paymentOption === "Online"}
                  onChange={() => setPaymentOption("Online")}
                  className="mr-2"
                />
                Online Payment
              </label>
            </div>
          </section>

          <button
            onClick={placeOrder}
            className="w-full py-3 rounded-md font-semibold text-white bg-green-600 hover:bg-green-700 transition"
          >
            {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
          </button>
        </div> 
      </div>
    </div>
  );
};

export default Cart;

