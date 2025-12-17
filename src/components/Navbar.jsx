import React, { useState, useEffect } from "react";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import MyCart from "./MyCart";
import { useCart } from "../contextApi/Context.jsx";

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [search, setSearch] = useState("");
  const [result, setResult] = useState("");
  

 

  const { addcartItems, getCartItems } = useCart();
  const token = localStorage.getItem("token");

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
<header className="bg-white shadow sticky top-0 z-50 ">
  <div className="max-w-7xl mx-auto lg:p-5 p-3 ">

    {/* WRAPPER: Mobile => column, Desktop => row */}
    <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">

      {/* TOP ROW FOR MOBILE: Logo + Buttons together */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-between">
        
        {/* Logo + Address (left side) */}
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold whitespace-nowrap">
            <span className="text-[#059363]">blink</span>
            <span className="text-[#059363]">it</span>
          </h1>

        </div>

        {/* Account + Cart (right side - always visible on mobile) */}
        <div className="flex items-center gap-3 md:hidden">
          {token ? (
            <div className="relative inline-block text-left">
              <Link to="/myAccount"   className="px-3 py-1.5 bg-gray-100 text-[#0A3D3F] rounded-full border text-sm">
                Account
              </Link>

            </div>
          ) : (
            <Link to="/login">
              <button className="px-3 py-1.5 bg-[#059363] p-5 text-white rounded-md text-sm">
                Login
              </button>
            </Link>
          )}

        {addcartItems.length > 0 ? (
  <button
  onClick={toggleCart}
  className="relative flex items-center justify-center w-13 h-13 rounded-full bg-[#059363] text-white shadow-lg"
>
  {/* Cart Icon */}
  <FiShoppingCart className="text-lg" />

  {/* Item Count Badge */}
  {itemCount > 0 && (
    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
      {itemCount}
    </span>
  )}
</button>
) : (
  <button
    className="relative flex items-center justify-center w-13 h-13 rounded-full bg-gray-300 text-white shadow-lg"
  >
    <FiShoppingCart className="text-lg" />
  </button>
)}
  </div>
      </div>

      {/* SEARCH BAR (placed in middle for desktop) */}
      <div className="w-full md:max-w-xl order-3 md:order-2">
        <div className="relative bg-gray-100 border border-gray-200 rounded-md">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder='Search "Products"'
            className="w-full pl-10 px-4 py-2 bg-gray-100 rounded-md text-sm focus:outline-none"
          />
        </div>

        {result.length > 0 && (
          <div className="absolute left-0 right-0 bg-white shadow-lg rounded-md mt-2 max-h-80 overflow-y-auto z-40">
            {result.map((item) => (
              <Link
                key={item._id}
                to="/detail"       
                onClick={() => setSearch("")}         
                state={{ item }}
                className="flex items-center gap-3 p-3 border-b hover:bg-gray-50"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded-md"
                />
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  {item.subcategory && (
                    <p className="text-xs text-gray-500">
                      {item.subcategory.name}
                    </p>
                  )}
                  <p className="text-sm text-green-600 font-semibold">
                    ₹{item.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT SIDE: Account + Cart (DESKTOP ONLY) */}
      <div className="hidden md:flex items-center gap-3 order-2 md:order-3">
        {token ? (
          <div className="relative inline-block text-left">
            <Link
             to="/myAccount"
              className="px-3 py-1.5 bg-gray-100 text-[#0A3D3F] font-semibold rounded-full border"
          
            >
              Account
            </Link>
          </div>
        ) : (
          <Link to="/login">
            <button className="px-3 py-2 bg-[#059363] text-white rounded-md">
            Login
            </button>
          </Link>
        )}

        {addcartItems.length > 0 ? (
          <button
            onClick={toggleCart}
            className="flex items-center  gap-2 px-4 py-2 cursor-pointer  bg-[#059363] text-white rounded-md shadow"
          >
            <FiShoppingCart className="text-lg font-bold" />
            <div className="text-left leading-tight ">
              <div className="text-lg font-semibold">{itemCount} items</div>
              <div className="text-sm font-semibold text-center">₹{totalPrice}</div>
            </div>
          </button>
        ) : (
          <button className="flex items-center gap-2 px-4 py-4 bg-gray-200 rounded-md text-sm">
            <FiShoppingCart/>
            <span>My Cart</span>
          </button>
        )}
      </div>
    </div>
  </div>

  {/* CART PANEL */}
  {isCartOpen && (
    <>
      <div className="fixed inset-0 z-40 p-5 bg-black/50" onClick={toggleCart} />
      <div className="fixed top-0 right-0 w-full sm:w-[380px] h-full z-50 bg-white shadow-lg">
        <MyCart onClose={toggleCart} />
      </div>
    </>
  )}
</header>

  );
};

export default Navbar;
