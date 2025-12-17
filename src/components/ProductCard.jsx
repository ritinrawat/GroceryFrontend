// src/components/ProductCard.jsx
import  { useState,useEffect} from "react";
import { useCart} from '../contextApi/Context.jsx'
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
<div className="bg-white   transition-all duration-200 overflow-hidden  w-full">

  {/* Image */}
  <Link 
    to="/detail"
    state={{
      product: { ...product, id: productId, image: productImage, name: productName, price: productPrice },
      subcategoryName,
    }}
  >
    <img
      src={productImage}
      alt={productName}
      className="
        h-20 w-full object-contain p-2   
        sm:h-28 sm:p-3       /* bigger on tablet/desktop */
      "
    />
  </Link>

  {/* Content */}
  <div className="px-2 pb-2 sm:px-3 sm:pb-3">

    <div className="flex justify-between items-start">
<h3
  className="
    text-[12px] font-semibold truncate
    w-full break-words line-clamp-2
    sm:text-sm sm:leading-snug
  "
>
  {productName}
</h3>



    </div>
    <p
      className="
        text-[10px] text-gray-500 mt-0.5
        sm:text-xs sm:mt-1  /* bigger on desktop */
      "
    >
      {productWeight}
    </p>
    <div className="mt-2 flex items-center justify-between gap-2">
            <p
        className="
          text-[12px] p-2 font-bold text-gray-900
          sm:text-sm   text-center
        "
      >
      ₹{productPrice}
      </p>
      {quantity === 0 ? (
        <button
          onClick={() => {
            const normalizedForCart = { ...product, id: productId };
            addTocart(normalizedForCart);
          }}
          className="
            w-full bg-[#059363] text-white font-medium rounded-md flex 
            items-center justify-center shadow-sm
            h-8 text-[12px]      /* mobile */
            sm:h-10 sm:text-sm   /* desktop bigger */
          "
        >
          Add
        </button>
      ) : (
        <div
          className="
            w-full flex items-center justify-between bg-[#059363] text-white rounded-md
            h-8 px-3 text-[12px]    /* mobile */
            sm:h-10 sm:px-4 sm:text-sm  /* desktop */
          "
        >
          <FaMinus
            className="cursor-pointer"
            onClick={() => {
              const normalizedForCart = { ...product, id: productId };
              removeFromCart(normalizedForCart);
            }}
          />

          <span className="font-medium">{quantity}</span>

          <FaPlus
            className="cursor-pointer"
            onClick={() => {
              const normalizedForCart = { ...product, id: productId };
              addTocart(normalizedForCart);
            }}
          />
        </div>
      )}
    </div>

  </div>
</div>



  );
};

export default ProductCard;
