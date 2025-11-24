import React from 'react'
// Import the Navbar component (shown only on user pages)
import Navbar from './components/Navbar'

// Import router components to handle navigation and routes
import { Route, Routes, useLocation } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'

// Import the Home page
import Home from './pages/Home'
import Footer from './components/Footer'

import { useAppContext } from './context/AppContext'
import Login from './components/Login'
import AllProducts from './pages/AllProducts'
import ProductCategory from './pages/ProductCategory'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import AddAddress from './pages/AddAddress'
import OrderSummary from './pages/OrderSummary'
import Payment from './pages/Payment'
import MyOrders from './pages/MyOrders'
import SellerLogin from './components/seller/SellerLogin'
import SellerLayout from './pages/seller/SellerLayout'
import AddProduct from './pages/seller/AddProduct'
import ProductList from './pages/seller/ProductList'
import Orders from './pages/seller/Orders'
import OrderSuccess from './pages/orderSuccess'


// Main App Component
const App = () => {
  const {showUserLogin,isSeller}=useAppContext();

  // Get the current URL path using useLocation()
  // Example: if you are on "http://localhost:5173/seller", pathname = "/seller"
  const isSellerPath = useLocation().pathname.includes("seller");

  return (
    <div className='text-default min-h-screen text-grey-700 bg-white'>

      {/* 
        If the current path includes "seller",
        don't show the Navbar (admin/seller dashboard usually has its own layout).
        Otherwise, show the Navbar for normal user pages.
      */}
      {isSellerPath ? null : <Navbar />}
      {showUserLogin ? <Login/> :null}

      <Toaster/>


      {/* 
        Apply page padding only for normal user pages.
        Seller/admin pages usually use full width, so we remove the padding there.
      */}
      <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>

        {/* Define all the routes in your app */}
        <Routes>
          {/* User homepage */}
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<AllProducts />} />
             <Route path='/products/:category' element={<ProductCategory/>} />
             <Route path='/products/:category/:id' element={<ProductDetails/>} />
             <Route path='/Cart' element={<Cart/>} />
             <Route path="/add-address" element={<AddAddress />} />
             <Route path="/order-summary" element={<OrderSummary />} />
             <Route path="/payment" element={<Payment />} />
             <Route path="/order-complete" element={<OrderSuccess />} />

             <Route path="/my-orders" element={<MyOrders />} />
            <Route
  path="/seller"
  element={isSeller ? <SellerLayout /> : <SellerLogin />}
>
  <Route index element={<AddProduct />} />
  <Route path="product-list" element={<ProductList />} />
  <Route path="orders" element={<Orders />} />
</Route>

          {/* 
            Later you can add a route for your Seller/Admin Dashboard here, like:
            <Route path='/seller/*' element={<SellerDashboard />} />
          */}
        </Routes>
      </div>
      {!isSellerPath && <Footer/>}
      
    </div>
    
  )
}

export default App
