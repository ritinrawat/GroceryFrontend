import React from "react";
import { FiArrowLeft, FiHash, FiClock, FiCalendar, FiCheckCircle } from "react-icons/fi";

const OrderDetails = ({ order, onClose }) => {
  if (!order) return null;

  const formattedDate = new Date(order.createdAt || Date.now()).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="bg-white rounded-3xl overflow-hidden flex flex-col h-full border border-gray-100">
      {/* Detail Header */}
      <div className="p-6 border-b border-gray-50 bg-white sticky top-0 z-20 flex items-center justify-between">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-[#059363] font-black text-xs uppercase tracking-widest hover:underline"
        >
          <FiArrowLeft size={16} /> Back to History
        </button>
        <span className="flex items-center gap-1 px-3 py-1 bg-green-50 text-[10px] font-black text-green-600 rounded-full uppercase tracking-tighter">
          <FiCheckCircle /> Successful
        </span>
      </div>

      <div className="flex-grow overflow-y-auto p-6 md:p-8 custom-scrollbar">
        {/* Order Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          <div className="space-y-1">
            <p className="flex items-center gap-1 text-[10px] font-black text-gray-400 uppercase tracking-widest"><FiHash /> Order ID</p>
            <p className="text-sm font-black text-gray-900">#{order._id.slice(-8).toUpperCase()}</p>
          </div>
          <div className="space-y-1">
            <p className="flex items-center gap-1 text-[10px] font-black text-gray-400 uppercase tracking-widest"><FiCalendar /> Date</p>
            <p className="text-sm font-black text-gray-900">{formattedDate}</p>
          </div>
          <div className="space-y-1">
            <p className="flex items-center gap-1 text-[10px] font-black text-gray-400 uppercase tracking-widest"><FiClock /> Delivery</p>
            <p className="text-sm font-black text-gray-900">10 Minutes Delivery</p>
          </div>
        </div>

        {/* Product Table */}
        <div className="space-y-6">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Items Ordered</h3>
          <div className="divide-y divide-gray-50 border-t border-b border-gray-50">
            {order.products.map((product, index) => (
              <div key={index} className="flex items-center gap-4 py-6 group">
                <div className="w-16 h-16 bg-gray-50 rounded-2xl p-2 flex-shrink-0 border border-gray-100 group-hover:bg-white group-hover:shadow-sm transition-all duration-300">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-grow">
                  <h4 className="text-sm font-black text-gray-900 mb-1 leading-snug">{product.name}</h4>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">₹{product.price} × {product.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-[#059363]">₹{product.price * product.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bill Summary Section */}
        <div className="mt-10 mb-6 bg-gray-50/50 rounded-3xl p-6 border border-gray-100 space-y-3">
          <div className="flex justify-between items-center text-xs font-bold text-gray-500 uppercase tracking-widest">
            <span>Item Total</span>
            <span className="text-gray-900">₹{order.amount - 20}</span>
          </div>
          <div className="flex justify-between items-center text-xs font-bold text-gray-500 uppercase tracking-widest">
            <span>Delivery Fee</span>
            <span className="text-green-600">FREE</span>
          </div>
          <div className="flex justify-between items-center text-xs font-bold text-gray-500 uppercase tracking-widest">
            <span>Handling Fee</span>
            <span className="text-gray-900">₹20</span>
          </div>
          <div className="h-px bg-gray-200 my-4"></div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-sm font-black text-gray-900 uppercase tracking-tighter">Grand Total</span>
            <span className="text-2xl font-black text-[#059363]">₹{order.amount}</span>
          </div>
        </div>

        <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-[0.15em]">Paid via Razorpay Secure Payment</p>
      </div>
    </div>
  );
};

export default OrderDetails;
