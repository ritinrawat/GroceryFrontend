import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus, FaTimes, FaShoppingCart, } from "react-icons/fa";
import { useCart } from "../contextApi/Context.jsx";
import Swal from "sweetalert2";
const VITE_RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;
const VITE_RAZORPAY_KEY_SECRET = import.meta.env.VITE_RAZORPAY_KEY_SECRET;
export default function MyCart({ onClose }) {
  const { addcartItems, addTocart, removeFromCart, clearCart } = useCart([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [getAddress, setGetAddress] = useState([]);


  console.log("Cart Items:", addcartItems.length);
  const delivery = 2;
  const handling = 5;
  const [grandTotal, setGrandTotal] = useState(0);
  const [showAddress, setShowAddress] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod"); // "cod" or "online"

  const [formAddress, setFormAddress] = useState({
    houseAddress: "",
    city: "",
    state: "",
    postalCode: "",
  });


  const handleChange = (e) => {
    setFormAddress({
      ...formAddress, [e.target.name]: e.target.value,
    });
  };
  const isFilled = (obj) => obj && Object.values(obj).every((v) => v.trim() !== "");

  const isAddressValid = isFilled(formAddress);

  console.log("address", isAddressValid)

  const handleProceed = () => {
    setShowAddress(true); // hide cart, show address (inputAddress && Object.values(inputAddress).every((value) => value.trim() !== ""))
  };
  const handlePlaceOrder = () => {
    if (!isAddressValid) {
      alert("Please fill in all address fields before placing your order.");
      return;
    }
    if (paymentMethod === "online") {
      handleOnlinePayment() //
    } else {
      handleCOD()
    }
  };
  const handleBack = () => {
    setShowAddress(false); // go back to cart
  };
  useEffect(() => {
    const total = addcartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(total);

    // calculate grand total
    setGrandTotal(total + delivery + handling);
  }, [addcartItems]);
  const loadRazorpay = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };
  const createOrder = async (paymentMethod) => {
    const token = localStorage.getItem("token");
    const res = await fetch("https://grocery-x2ds.onrender.com/payment/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        amount: grandTotal,
        Address: formAddress,
        paymentMethod,     // "cod" or "online"
      }),
    });

    const data = await res.json();
    return data.orderId;  // backend returns orderId
  };
  const handleOnlinePayment = async () => {
    const loaded = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js");
    if (!loaded) return alert("Failed to load Razorpay");
    const orderId = await createOrder("online");
    openRazorpayCheckout(orderId);
  };
  const handleCOD = async () => {
    const orderId = await createOrder("cod");
    Swal.fire({
      title: "🎉 Order Placed!",
      text: "Thank you for shopping with us.",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });

    clearCart();
    onClose();
  };
  const openRazorpayCheckout = (orderId) => {
    const token = localStorage.getItem("token");

    const options = {
      key: VITE_RAZORPAY_KEY_ID,
      amount: grandTotal * 100,
      currency: "INR",
      name: "My Shop",
      order_id: orderId,

      handler: async function (response) {
        await fetch("https://grocery-x2ds.onrender.com/payment/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }),
        });

        Swal.fire({
          title: "Payment Complete!",
          text: "Thank you for your purchase.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        clearCart();
        onClose();
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  const getaddress = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("https://grocery-x2ds.onrender.com/payment/getAddress", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed  1s to fetch address");
      const data = await response.json();
      setGetAddress(data.addresses);

      console.log("Fetched address:", data);
    } catch (err) {
      console.log("Error fetching address:", err);
    }
  };
  useEffect(() => {
    getaddress()
  }, [])


  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Cart Drawer */}
      <div className="relative w-full max-w-lg bg-gray-50 h-full shadow-2xl flex flex-col transition-transform duration-300 transform translate-x-0 overflow-hidden">

        {/* Header */}
        <div className="bg-white border-b border-gray-100 p-4 sm:p-5 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="bg-[#059363]/10 p-2 rounded-lg">
              <FaShoppingCart className="text-[#059363] text-xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 leading-none">
                {showAddress ? "Secure Checkout" : "Shopping Cart"}
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                {addcartItems.length} {addcartItems.length === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
            aria-label="Close cart"
          >
            <FaTimes className="text-gray-400 group-hover:text-gray-600 transition-colors" />
          </button>
        </div>

        {/* Step Indicator (Only if showing address) */}


        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {addcartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 h-full text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <FaShoppingCart className="text-gray-300 text-4xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 max-w-[240px] mb-8">
                Looks like you haven't added anything to your cart yet.
              </p>
              <button
                onClick={onClose}
                className="bg-[#059363] text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-[#059363]/30 hover:brightness-95 transition-all"
              >
                Explore Products
              </button>
            </div>
          ) : !showAddress ? (
            /* CART VIEW */
            <div className="p-4 sm:p-5 space-y-4">
              {addcartItems.map((item, index) => (
                <div
                  key={item.id || index}
                  className="bg-white rounded-2xl p-3 sm:p-4 border border-gray-100 shadow-sm flex gap-4 animate-in fade-in slide-in-from-right-4 duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 rounded-xl flex-shrink-0 border border-gray-100 p-1">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex flex-col flex-grow min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base truncate leading-tight">
                        {item.name}
                      </h4>
                    </div>
                    <p className="text-[11px] sm:text-xs text-gray-500 font-medium mt-0.5">
                      {item.weight || '750g'}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="font-bold text-gray-900">₹{item.price}</span>

                      {/* Modern Quantity Controller */}
                      <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg overflow-hidden h-8">
                        <button
                          onClick={() => removeFromCart(item)}
                          className="w-8 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors"
                        >
                          <FaMinus className="text-[10px]" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => addTocart(item)}
                          className="w-8 flex items-center justify-center hover:bg-green-50 hover:text-green-600 transition-colors"
                        >
                          <FaPlus className="text-[10px]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* CHECKOUT VIEW */
            <div className="p-4 sm:p-5 space-y-6 animate-in fade-in duration-300">
              {/* Saved Addresses */}
              {getAddress.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Select Address</h3>
                  <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
                    {getAddress.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => setFormAddress(item)}
                        className={`min-w-[240px] p-4 rounded-2xl border-2 transition-all cursor-pointer bg-white ${formAddress.houseAddress === item.houseAddress
                          ? "border-[#059363] shadow-md shadow-[#059363]/5"
                          : "border-gray-100 hover:border-gray-300"
                          }`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-sm font-bold text-gray-900">Address {index + 1}</p>
                          {formAddress.houseAddress === item.houseAddress && (
                            <div className="w-4 h-4 rounded-full bg-[#059363] flex items-center justify-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-white" />
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                          {item.houseAddress}, {item.city}, {item.state} - {item.postalCode}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Address Form */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Delivery Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-[11px] font-bold text-gray-400 uppercase ml-1">Flat / House / Building</label>
                    <input
                      name="houseAddress"
                      value={formAddress.houseAddress}
                      onChange={handleChange}
                      placeholder="e.g. A-102, Green Valley"
                      className="mt-1 w-full bg-gray-50 border-gray-100 rounded-xl px-4 py-3 placeholder:text-gray-300 focus:bg-white focus:ring-2 focus:ring-[#059363]/20 focus:border-[#059363] outline-none transition-all text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-gray-400 uppercase ml-1">City</label>
                      <input
                        name="city"
                        value={formAddress.city}
                        onChange={handleChange}
                        placeholder="City"
                        className="mt-1 w-full bg-gray-50 border-gray-100 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-[#059363]/20 focus:border-[#059363] outline-none transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-gray-400 uppercase ml-1">Postal Code</label>
                      <input
                        name="postalCode"
                        value={formAddress.postalCode}
                        onChange={handleChange}
                        placeholder="400001"
                        className="mt-1 w-full bg-gray-50 border-gray-100 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-[#059363]/20 focus:border-[#059363] outline-none transition-all text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Payment Method</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPaymentMethod("cod")}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${paymentMethod === "cod" ? "border-[#059363] bg-[#059363]/5" : "border-gray-50 bg-gray-50"
                      }`}
                  >
                    <span className="text-xl">💵</span>
                    <span className="text-xs font-bold text-gray-700">Cash on Delivery</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod("online")}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${paymentMethod === "online" ? "border-[#059363] bg-[#059363]/5" : "border-gray-50 bg-gray-50"
                      }`}
                  >
                    <span className="text-xl">💳</span>
                    <span className="text-xs font-bold text-gray-700">Online Payment</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer / Summary Section */}
        {addcartItems.length > 0 && (
          <div className="bg-white border-t border-gray-100 p-5 space-y-4 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Items Total</span>
                <span className="font-semibold text-gray-900">₹{totalPrice}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Delivery Fee</span>
                <span className="font-semibold text-gray-900 text-green-600">₹{delivery}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Handling Charges</span>
                <span className="font-semibold text-gray-900">₹{handling}</span>
              </div>
              <div className="flex justify-between text-lg pt-2 border-t border-gray-50">
                <span className="font-extrabold text-gray-900">Grand Total</span>
                <span className="font-extrabold text-gray-900">₹{grandTotal}</span>
              </div>
            </div>

            <button
              onClick={showAddress ? handlePlaceOrder : handleProceed}
              className="group relative w-full bg-[#059363] text-white py-4 rounded-2xl font-bold text-lg overflow-hidden transition-all shadow-xl shadow-[#059363]/20 hover:shadow-[#059363]/30 active:scale-[0.98]"
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                {showAddress ? "Place Order Now" : "Continue to Payment"}
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
