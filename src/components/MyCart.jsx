import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus, FaTimes, FaShoppingCart,} from "react-icons/fa";
import { useCart } from "../contextApi/Context.jsx";
import Swal from "sweetalert2";
const VITE_RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;
const VITE_RAZORPAY_KEY_SECRET = import.meta.env.VITE_RAZORPAY_KEY_SECRET;
export default function MyCart({ onClose }) {
  const { addcartItems, addTocart, removeFromCart,clearCart} = useCart([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [getAddress, setGetAddress] = useState([]);


  console.log("Cart Items:", addcartItems.length);
  const delivery = 2;
  const handling = 5;
  const [grandTotal,setGrandTotal] = useState(0);
  const [showAddress,setShowAddress] = useState(false);
  const [paymentMethod,setPaymentMethod] = useState("cod"); // "cod" or "online"

const [formAddress, setFormAddress] = useState({
  houseAddress: "",
  city: "",
  state: "",
  postalCode: "",
});
 

const handleChange = (e) => {
  setFormAddress({
    ...formAddress,[e.target.name]: e.target.value,
  });
};
const isFilled = (obj) =>obj && Object.values(obj).every((v) => v.trim() !== "");

const isAddressValid = isFilled(formAddress);

  console.log("address",isAddressValid)

  const handleProceed = () => {
    setShowAddress(true); // hide cart, show address (inputAddress && Object.values(inputAddress).every((value) => value.trim() !== ""))
  };
  const handlePlaceOrder = () => {
    if (!isAddressValid) {
      alert("Please fill in all address fields before placing your order.");
      return;
    }
    if(paymentMethod==="online"){
   handleOnlinePayment() //
     } else{
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
  const getaddress=async()=>{
const token = localStorage.getItem("token");
try{
  const response= await fetch("https://grocery-x2ds.onrender.com/payment/getAddress",{
    method:"GET",
    headers:{
      "Content-Type":"application/json",
      Authorization:`Bearer ${token}`,
    },
  });
  if(!response.ok) throw new Error("Failed  1s to fetch address");
  const data= await response.json();
  setGetAddress(data.addresses);

  console.log("Fetched address:",data);
}catch(err){
  console.log("Error fetching address:",err);
}
  };
  useEffect(()=>{
getaddress()
  },[])
  

  return (
    showAddress==false ?(
       <div className="max-w-sm mx-auto shadow-lg bg-white  flex flex-col h-[100vh]  overflow-hidden">
         <div className="flex justify-between items-center border-b p-4 ">
    <h2 className="text-2xl font-bold text-gray-800">My Cart</h2>
    <button
      onClick={onClose}
      className="p-2 rounded-full hover:bg-gray-100 transition"
    >
      <FaTimes className="text-gray-600 text-xl" />
    </button>
  </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
     
     {addcartItems.length === 0 ? (
  <div className="flex flex-col items-center justify-center p-6 text-gray-700">
      <div className="text-6xl text-gray-500 mb-4">
        <FaShoppingCart />
      </div>
      <h1 className="text-2xl font-semibold mb-2">Your Cart is Empty</h1>
      <p className="text-center text-gray-500">Must add an item to the cart</p>
      <button
      onClick={onClose}
        className="w-full mt-10 bg-black text-white py-3  rounded-xl font-semibold text-lg transition hover:bg-gray-800"
      >
        Continue Shopping
      </button>
    </div>
) : (
        addcartItems.map((item, index) => (
          <div key={index} className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-md object-cover"
              />
              <div className="flex flex-col">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-gray-500">Quantity:{item.quantity || 'N/A'}</p>
                  <p className="text-sm font-medium">₹{item.price}</p>
              </div>
            </div>
            {/* Quantity Adjuster */}
            <div className="flex flex-col items-center gap-1">
        
              <div className="flex items-center border rounded-md overflow-hidden">
                <button
                  onClick={() => removeFromCart(item)}
                  className="px-2 "
                >
                  <FaMinus />
                </button>
                <span className="p-1">{item.quantity}</span>
                <button
                  onClick={() => addTocart(item)}
                  className="px-2  "
                >
           <FaPlus />
                </button>
              </div>
            </div>
  
          </div>
        ))
      )}
    </div>

    {/* Bill Section */}
    {addcartItems.length > 0 && (
      <div className="border-t px-4 py-4 bg-white space-y-2">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>₹{totalPrice}</p>
        </div>
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Delivery</p>
          <p>₹{delivery}</p>
        </div>
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Shipping</p>
          <p>₹{handling}</p>
        </div>
        <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-2">
          <p>Grand Total</p>
          <p>₹{totalPrice + delivery +handling}</p>
        </div>
        <button
          onClick={handleProceed}
          className="mt-4 w-full bg-[#059363] text-white py-3 rounded-md font-medium "
        >
          Checkout
        </button>
      
      </div>
    )}
    </div>):(
  <div className="max-w-2xl mx-auto my-4 bg-white rounded-2xl shadow-md overflow-hidden">

  {/* Header */}
  <div className="flex justify-between items-center border-b p-3 ">
    <h2 className="text-2xl font-semibold text-gray-800">Checkout</h2>
    <button
      onClick={handleBack}
      className="p-2 rounded-full hover:bg-gray-100 transition"
    >
      <FaTimes className="text-gray-600 text-xl" />
    </button>
  </div>

  {/* Shipping Info */}
  <div className="px-6 pt-6">
    <h3 className="text-lg font-semibold text-gray-800 mb-3">
      Shipping Information
    </h3>
    {/* Delivery / Pickup Options */}
    {/* Input Fields */}
    <div className="space-y-4">
      {/* Address Fields */}
      <div>
        <label className="text-sm font-medium text-gray-600">Street / House No.</label>
        <input
          name="houseAddress"
          placeholder="Enter your house or street name"
          className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black outline-none"
            value={formAddress.houseAddress}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-600">City</label>
          <input
            name="city"
               value={formAddress.city}
            placeholder="Enter city"
            className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black outline-none"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600">State</label>
          <input
            name="state"
               value={formAddress.state}
            placeholder="Enter state"
            className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black outline-none"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600">PIN Code</label>
          <input
            name="postalCode"
               value={formAddress.postalCode}
            placeholder="Enter ZIP code"
            className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black outline-none"
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
       <div className="grid grid-cols-2 gap-4  mt-5 ">
      <label onClick={()=>setPaymentMethod("cod")} className="border rounded-xl flex items-center gap-3 p-3 cursor-pointer hover:border-green-500 transition ">
        <input checked={paymentMethod=="cod"} onChange={()=>setPaymentMethod("cod")}   type="radio" name="payType" className="w-4 h-4" />
        <span className="font-medium text-gray-700 flex items-center gap-2">
          🚚COD
        </span>
      </label>

      <label onClick={()=>setPaymentMethod("online")}   className="border rounded-xl flex items-center gap-3 p-3 cursor-pointer hover:border-green-500 transition">
        <input checked={paymentMethod=="online"} onChange={()=>setPaymentMethod("online")} type="radio" name="payType" className="w-4 h-4" />
        <span className="font-medium text-gray-700 flex items-center gap-2">
          📦 OnlinePay
        </span>
      </label>
    </div>

  </div>

  {/* Bill Section */}
  <div className="px-6 py-6 border-t mt-6 bg-gray-50">
    <div className="space-y-2 text-sm">
      <div class="flex flex-row gap-5 overflow-x-auto no-scrollbar">
     {getAddress.map((item,index)=>(
  <div
  key={index}
  className="min-w-[260px] cursor-pointer"
   onClick={() => setFormAddress(item)}
>
  <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 
                  hover:shadow-md hover:border-green-500 transition-all duration-200">
    <p className="text-base font-semibold text-gray-800 tracking-wide">
      Delivery Address
    </p>

    <div className="mt-3 text-gray-600 space-y-1 leading-relaxed">
      <p className="font-medium text-gray-700 text-[15px]">
        {item.houseAddress}
      </p>

      <p className="text-sm">
        {item.city}, {item.state}
      </p>

      <p className="text-sm font-medium text-gray-700">
        PIN — {item.postalCode}
      </p>
    </div>
  </div>
</div>

     ))}
     </div>
      <div className="flex justify-between items-center text-lg font-semibold text-gray-800 border-t pt-4 mt-3">
        <span>Grand Total</span>
        <span className="text-green-600">₹{grandTotal}</span>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="w-full mt-5 bg-black text-white py-3 rounded-xl font-semibold text-lg transition"
      >
        Place Order
      </button>
    </div>
  </div>

</div>
));
}
