import React from "react";

const OrderDetails = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="bg-white rounded-xl p-5 shadow-md mt-4 border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Order Details</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-lg font-bold"
        >
          ✕
        </button>
      </div>

      {/* Basic Info */}
      <div className="text-sm text-gray-600 mb-3">
        <p><strong>Order ID:</strong> {order.orderId}</p>
        <p><strong>Total:</strong> ₹{order.amount}</p>
        <p><strong>Status:</strong> {order.status}</p>
      </div>

      {/* Product List */}
      <div className="divide-y divide-gray-200 max-h-[50vh] overflow-y-auto">
        {order.products.map((product, index) => (
          <div key={index} className="flex items-center gap-4 py-3">
            <img
              src={product.image}
              alt={product.name}
              className="w-14 h-14 rounded-md object-cover border"
            />
            <div className="flex-1">
              <p className="text-gray-800 font-medium">{product.name}</p>
              <p className="text-gray-500 text-sm">
                ₹{product.price} × {product.quantity}
              </p>
            </div>
            <p className="text-green-600 font-semibold">
              ₹{product.price * product.quantity}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;
