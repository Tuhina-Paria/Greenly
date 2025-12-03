import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts ,dummyAddress} from "../assets/assets.js";
import {toast} from 'react-hot-toast';
import axios from 'axios';


axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
const { VITE_CURRENCY: currency } = import.meta.env;


  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const[cartItems,setCartItems]=useState({});
  const [searchQuery, setSearchQuery] = useState("");
 const [savedAddress, setSavedAddress] = useState(null);

  // Add selectedAddress state to track address used for order
  const [selectedAddress, setSelectedAddress] = useState(null);

//Fetch Seller status
const fetchSeller=async ()=>{
  try {
const {data}=await axios.get("/api/seller/is-auth");
if(data.success){
  setIsSeller(true);
}else{
   setIsSeller(false);
}
  } catch (error) {
    setIsSeller(false);
  }
}

//Fetch User Auth Status,User Data and Cart Items
const fetchUser =async ()=>{
  try {
   const { data } = await axios.get('https://greenly-backend-nu.vercel.app/api/user/is-auth', { withCredentials: true });

    if(data.success){
      setUser(data.user)
      setCartItems(data.user.cartItems)
    }
  } catch (error) {
    setUser(null);
  }
}




  //fetch all products
  const fetchProducts=async()=>{
    try {
      const {data}=await axios.get('/api/product/list')
      if(data.success){
        setProducts(data.products)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
// Add product to cart
const addToCart = async (itemId) => {

  // 1. Find the product details
  const product = products.find(p => p._id === itemId);

  // 2. Check stock
  if (!product?.inStock) {
    toast.error("This product is out of stock.");
    return; // ❌ stop here
  }

  // 3. Add to cart normally
  let cartData = structuredClone(cartItems);

  if (cartData[itemId]) {
    cartData[itemId] += 1;
  } else {
    cartData[itemId] = 1;
  }

  setCartItems(cartData);
  toast.success("Added to Cart");
};


//update cart item Quantity
const updateCartItem=(itemId,quantity)=>{
  let cardData=structuredClone(cartItems);
  cardData[itemId]=quantity;
  setCartItems(cardData);
  toast.success("Cart Updated");

}
// Remove product from cart
const removeFromCart = (itemId) => {
  let cartData = structuredClone(cartItems);

  if (cartData[itemId]) {
    cartData[itemId] -= 1;

    if (cartData[itemId] === 0) {
      delete cartData[itemId];
    }

    setCartItems(cartData); // ✅ update state
    toast.success("Removed from Cart");
  }
};


// get cart item count
const getCartCount=()=>{
  let totalCount=0;
  for(const item in cartItems){
    totalCount+=cartItems[item];
  }
  return totalCount
}

//get cart total Amount
const getCartAmount = () => {
  let totalAmount = 0;
  for (const items in cartItems) {
    let itemInfo = products.find((product) => product._id === items);
    if (itemInfo && cartItems[items] > 0) {
      totalAmount += itemInfo.offerPrice * cartItems[items];
    }
  }
  return Math.floor(totalAmount * 100) / 100;
};


useEffect(()=>{
  fetchUser();
  fetchSeller();
fetchProducts();
},[]);



//Update Database Cart Items

useEffect(()=>{
  const updateCart=async ()=>{
    try {
      await axios.post('/api/cart/update', { cartItems }, { withCredentials: true });

      if(!data.success){
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
   
  }
  
  if(user){
    updateCart();
  }
},[cartItems])





// save user address

const saveUserAddress = (addr) => {
  setSavedAddress(addr);
};


  const value = { navigate, user, setUser, isSeller, setIsSeller,showUserLogin,setShowUserLogin,products ,currency,addToCart,updateCartItem,removeFromCart,cartItems,setCartItems,searchQuery,setSearchQuery,getCartAmount,getCartCount,savedAddress,selectedAddress,setSelectedAddress,isLoggedIn,setIsLoggedIn,axios,fetchProducts,fetchUser,setCartItems};

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
