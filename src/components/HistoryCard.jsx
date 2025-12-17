import React from "react";

const HistoryCard = ({ order, onClick }) => {
  console.log("HistoryCard Order:", order); // Debugging line
  return (
    
    <div
      onClick={() => onClick(order)} // ✅ When clicked, send order data to parent
      className="bg-white shadow-md rounded-lg p-4 mb-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition"
    >
      {/* Left: 5 product images */}
      <div className="flex -space-x-2">
        {order.products.slice(0, 5).map((p, index) => (
          <img
            key={index}
            src={p.image}
            alt="product"
            className="w-10 h-10 rounded-full border border-gray-200 object-cover"
          />
        ))}

        {order.products.length > 5 && (
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 text-sm font-medium">
            +{order.products.length - 5}
          </div>
        )}
      </div>

      {/* Right: total amount */}
      <div className="text-right">
        <p className="text-gray-500 text-sm">Total</p>
        <p className="text-lg font-semibold text-green-600">₹{order.amount}</p>
      </div>
    </div>
  );
};

export default HistoryCard;
