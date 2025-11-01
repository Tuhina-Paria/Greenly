import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets.js";
import {toast} from 'react-hot-toast'

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
const { VITE_CURRENCY: currency } = import.meta.env;


  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const[cartItems,setCartItems]=useState({});


  //fetch all products
  const fetchProducts=async()=>{
    setProducts(dummyProducts);
  }

//Add produtc to cart
const addToCart=async(itemId)=>{
  let cardData=structuredClone(cartItems);
  if(cardData[itemId]){
    cardData[itemId]
+=1; }else{
  cardData[itemId]=1;
}
setCartItems(cardData);
toast.success("Added to Cart")
}

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




useEffect(()=>{
fetchProducts();
},[]);


  const value = { navigate, user, setUser, isSeller, setIsSeller,showUserLogin,setShowUserLogin,products ,currency,addToCart,updateCartItem,removeFromCart,cartItems,setCartItems};

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
