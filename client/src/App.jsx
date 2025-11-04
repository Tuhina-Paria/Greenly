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


// Main App Component
const App = () => {
  const {showUserLogin}=useAppContext();

  // Get the current URL path using useLocation()
  // Example: if you are on "http://localhost:5173/seller", pathname = "/seller"
  const isSellerPath = useLocation().pathname.includes("seller");

  return (
    <div>

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
