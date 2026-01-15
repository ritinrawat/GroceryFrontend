import React from "react";
import { FiChevronRight, FiCheckCircle } from "react-icons/fi";

const HistoryCard = ({ order, onClick }) => {
  const formattedDate = new Date(order.createdAt || Date.now()).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div
      onClick={() => onClick(order)}
      className="bg-white border border-gray-100 rounded-2xl p-5 mb-3 flex items-center justify-between cursor-pointer hover:border-[#059363] hover:shadow-md transition-all duration-300 group"
    >
      <div className="flex items-center gap-5">
        {/* Product Image Stack */}
        <div className="flex -space-x-3">
          {order.products.slice(0, 3).map((p, index) => (
            <div
              key={index}
              className="w-12 h-12 rounded-xl border-2 border-white bg-gray-50 overflow-hidden shadow-sm"
              style={{ zIndex: 3 - index }}
            >
              <img
                src={p.image}
                alt=""
                className="w-full h-full object-contain p-1"
              />
            </div>
          ))}
          {order.products.length > 3 && (
            <div className="w-12 h-12 rounded-xl border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-black text-gray-500 shadow-sm relative z-0">
              +{order.products.length - 3}
            </div>
          )}
        </div>

        {/* Order Info */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-black text-gray-900 leading-none">Order #{order._id.slice(-6).toUpperCase()}</span>
            <span className="flex items-center gap-1 px-2 py-0.5 bg-green-50 text-[10px] font-black text-green-600 rounded-full uppercase tracking-tighter">
              <FiCheckCircle /> Delivered
            </span>
          </div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{formattedDate}</p>
        </div>
      </div>

      {/* Right side: Amount & Arrow */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-lg font-black text-gray-900 leading-none">₹{order.amount}</p>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{order.products.length} Items</p>
        </div>
        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-[#059363]/10 group-hover:text-[#059363] transition-colors">
          <FiChevronRight size={20} />
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
