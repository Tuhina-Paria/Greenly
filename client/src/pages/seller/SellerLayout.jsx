import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { useState } from "react";
import toast from "react-hot-toast";

const SellerLayout = () => {
  const { isSeller, setIsSeller,axios } = useAppContext();
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: assets.add_icon },
    { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
  ];

  const logout = async () => {
try {
  const {data}=await axios.get('/api/seller/logout');
  if(data.success){
    toast.success(data.message)
     navigate("/");
  }else{
    toast.error(data.message)
  }
} catch (error) {
  toast.error(error.message)
}   
  };

  return (
    <>
      {/* ------- TOP NAVBAR -------- */}
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white sticky top-0 z-50">
        
        {/* LEFT: Logo + Mobile Menu Button */}
        <div className="flex items-center gap-3">
          {/* Hamburger Button (mobile only) */}
          <button 
            className="md:hidden block text-2xl"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            ☰
          </button>

          <Link to="/" className="flex items-center gap-1">
            <img src="/favicon.svg" alt="Logo" className="h-8 sm:h-10" />
            <span className="text-lg sm:text-xl font-bold text-black">reenly</span>
          </Link>
        </div>

        {/* RIGHT PROFILE AREA */}
        <div className="flex items-center gap-5 text-gray-500">
          {/* <p>Hi! Admin</p>  */}
          <button onClick={logout} className="border rounded-full text-sm px-4 py-1 bg-primary hover:bg-primary-dull">
            Logout
          </button>
        </div>
      </div>

      {/* ------- MAIN LAYOUT -------- */}
      <div className="flex min-h-screen">

        {/* ------- SIDEBAR (Mobile + Desktop) -------- */}
        <div
          className={`fixed md:static top-0 left-0 h-full bg-white border-r border-gray-300 
          flex flex-col pt-20 md:pt-4 z-40 transition-all duration-300
          ${showSidebar ? "w-60" : "w-0 md:w-64"}
          overflow-hidden`}
        >
          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/seller"}
              onClick={() => setShowSidebar(false)} // close sidebar on mobile
              className={({ isActive }) =>
                `flex items-center py-3 px-4 gap-3 transition-all ${
                  isActive
                    ? "border-r-4 md:border-r-[6px] bg-primary/10 border-primary text-primary"
                    : "hover:bg-gray-100"
                }`
              }
            >
              <img src={item.icon} alt="" className="w-7 h-7" />
              <p className="hidden md:block">{item.name}</p>
            </NavLink>
          ))}
        </div>

        {/* ------- CONTENT AREA -------- */}
        <div className="flex-1 p-4 md:ml-0 ml-0">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default SellerLayout;
