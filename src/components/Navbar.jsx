import React, { useState, useEffect } from "react";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import MyCart from "./MyCart";
import { useCart } from "../contextApi/Context.jsx";


const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const { addcartItems, getCartItems } = useCart();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const total = addcartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(total);

    const item = addcartItems.reduce((sum, item) => sum + item.quantity, 0);
    setItemCount(item);
  }, [addcartItems]);

  useEffect(() => {
    getCartItems();
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!search.trim()) {
        setResult([]);
        return;
      }
      try {
        const response = await fetch(
          `https://grocery-x2ds.onrender.com/products/search?q=${search}`
        );
        if (!response.ok) throw new Error("404 or other error");

        const data = await response.json();
        setResult(data);
      } catch (error) {
        console.error("Error fetching search products:", error);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center py-3 md:h-20 gap-4 md:gap-8">

          {/* Logo & Location Section */}
          <div className="flex  items-center justify-between w-full md:w-auto gap-6">
            <Link to="/" className="flex-shrink-0">
              <div className="w-15 h-15 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center">
                <img
                  src="/logo1.png"
                  alt="Logo"
                  className="w-full h-full object-contain max-w-[80px]"
                />
              </div>
            </Link>


            {/* Delivery Location - Hidden on very small screens, visible elsewhere */}


            {/* Mobile Actions: Only shown when search is not full width on mobile */}
            <div className="flex items-center gap-3 md:hidden">
              {token ? (
                <Link
                  to="/myAccount"
                  className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600"
                >
                  <FaUser className="text-sm" />
                </Link>
              ) : (
                <Link to="/login" className="text-sm font-bold bg-[#059363] p-3 rounded-lg text-white">Login</Link>
              )}
            </div>
          </div>

          {/* Search Bar Section */}
          <div className="w-full relative group flex-grow order-3 md:order-2">
            <div className={`relative flex items-center transition-all duration-300 ${isSearchFocused ? 'ring-2 ring-[#059363]/20 border-[#059363]' : 'bg-gray-50 border-gray-100'} border rounded-xl overflow-hidden`}>
              <FiSearch className={`ml-4 text-xl ${isSearchFocused ? 'text-[#059363]' : 'text-gray-400'}`} />
              <input
                value={search}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder='Search "milk", "eggs" or "chips"'
                className="w-full px-4 py-3 bg-transparent text-sm font-medium focus:outline-none placeholder:text-gray-400"
              />
            </div>

            {/* Search Results Dropdown */}
            {result.length > 0 && isSearchFocused && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white shadow-2xl rounded-2xl border border-gray-100 overflow-hidden z-[60] animate-in fade-in zoom-in-95 duration-200">
                <div className="max-h-96 overflow-y-auto custom-scrollbar">
                  {result.map((item) => (
                    <Link
                      key={item._id}
                      to="/detail"
                      state={{ item }}
                      onClick={() => setSearch("")}
                      className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                    >
                      <img src={item.image} alt="" className="w-12 h-12 object-contain bg-gray-50 rounded-lg p-1" />
                      <div className="flex-grow">
                        <p className="text-sm font-bold text-gray-800">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.weight || 'Product'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-black text-gray-900">₹{item.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Desktop Actions Section */}
          <div className="hidden md:flex items-center gap-6 order-2  md:order-3">
            {!token ? (
              <Link to="/login" className="text-lg font-bold text-white p-3 rounded-lg bg-[#059363]  ">
                Login
              </Link>
            ) : (
              <Link to="/myAccount" className="text-sm font-black text-gray-700 hover:text-[#059363] px-4 py-2 rounded-xl bg-gray-50 hover:bg-[#059363]/5 transition-all uppercase tracking-wider">
                Account
              </Link>
            )}

            <button
              onClick={toggleCart}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${itemCount > 0
                ? 'bg-[#059363] text-white shadow-lg shadow-[#059363]/20 scale-105 cursor-pointer'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-75'
                }`}
            >
              <FiShoppingCart className="text-xl" />
              {itemCount > 0 ? (
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-xs font-bold uppercase tracking-tighter opacity-80">{itemCount} items</span>
                  <span className="text-sm font-black">₹{totalPrice}</span>
                </div>
              ) : (
                <span className="font-bold">My Cart</span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Floating Cart Button for Mobile (Shows when items exist) */}
      {itemCount > 0 && (
        <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] pointer-events-none">
          <button
            onClick={toggleCart}
            className="w-full pointer-events-auto bg-[#059363] text-white p-4 rounded-2xl flex items-center justify-between shadow-2xl shadow-[#059363]/40 active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg text-white">
                <FiShoppingCart size={20} />
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">{itemCount} Items</span>
                <span className="text-sm font-bold">₹{totalPrice}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 font-bold">
              View Cart <span className="text-xl">›</span>
            </div>
          </button>
        </div>
      )}

      {/* CART PANEL */}
      {isCartOpen && <MyCart onClose={toggleCart} />}
    </header>
  );
};

export default Navbar;
