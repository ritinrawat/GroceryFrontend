// src/components/ProductCard.jsx
import { useState, useEffect } from "react";
import { useCart } from '../contextApi/Context.jsx'
import { FaPlus, FaMinus } from "react-icons/fa";
import { Link } from "react-router-dom";
const ProductCard = ({ product, subcategoryName }) => {
  const { addcartItems, getCartItems, addTocart, removeFromCart } = useCart([]);

  const productId = product?.id || product?._id || product?.productId || null;
  const productImage = product?.image || product?.productImage || "";
  const productName = product?.name || product?.productName || "";
  const productWeight = product?.weight || product?.netWeight || "";
  const productPrice = product?.price || product?.productPrice || 0;


  let quantity = 0;

  useEffect(() => {
    getCartItems();
  }, []);

  const currentItem = addcartItems.find(
    (item) => String(item.productId) === String(productId)
  );

  quantity = currentItem ? currentItem.quantity : 0;

  return (
    <div className="bg-white border border-gray-200 rounded-xl transition-all duration-300 hover:shadow-md flex flex-col h-full overflow-hidden group">

      {/* Image Section */}
      <Link
        to="/detail"
        state={{
          product: { ...product, id: productId, image: productImage, name: productName, price: productPrice },
          subcategoryName,
        }}
        className="block relative p-2 sm:p-4 bg-gray-50/50 group-hover:bg-white transition-colors"
      >
        <img
          src={productImage}
          alt={productName}
          className="
            h-28 w-full object-contain
            sm:h-40 transition-transform duration-300 group-hover:scale-105
          "
        />
      </Link>

      {/* Content Section */}
      <div className="p-2 sm:p-3 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3
            className="
              text-[13px] font-bold text-gray-800 line-clamp-2 
              sm:text-sm sm:leading-tight mb-1
            "
          >
            {productName}
          </h3>
          <p
            className="
              text-[11px] text-gray-500 font-medium
              sm:text-xs
            "
          >
            {productWeight}
          </p>
        </div>

        {/* Price and Action Section */}
        <div className="mt-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm sm:text-base font-bold text-gray-900">
              ₹{productPrice}
            </span>
          </div>

          {quantity === 0 ? (
            <button
              onClick={() => {
                const normalizedForCart = { ...product, id: productId };
                addTocart(normalizedForCart);
              }}
              className="
                w-full bg-brand bg-[#059363] hover:brightness-95 text-white font-bold rounded-lg
                flex items-center justify-center shadow-sm transition-all
                h-9 text-[13px] sm:h-10 sm:text-sm
              "
            >
              Add to Cart
            </button>
          ) : (
            <div
              className="
                w-full flex items-center justify-between bg-brand bg-[#059363] text-white rounded-lg
                h-9 px-3 text-[13px] sm:h-10 sm:px-4 sm:text-sm shadow-sm
              "
            >
              <button
                className="p-1 hover:bg-white/10 rounded  transition-colors"
                onClick={() => {
                  const normalizedForCart = { ...product, id: productId };
                  removeFromCart(normalizedForCart);
                }}
              >
                <FaMinus />
              </button>

              <span className="font-bold">{quantity}</span>

              <button
                className="p-1 hover:bg-white/10 rounded transition-colors"
                onClick={() => {
                  const normalizedForCart = { ...product, id: productId };
                  addTocart(normalizedForCart);
                }}
              >
                <FaPlus />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>



  );
};

export default ProductCard;
