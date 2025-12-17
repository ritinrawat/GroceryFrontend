import { useState ,useEffect} from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaPlus, FaMinus, FaTimes } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useCart } from "../contextApi/Context.jsx";
import ReactMarkdown from "react-markdown";
export default function ProductPage() {

  const location=useLocation()
  const {product,subcategoryName,item}=location.state;  
  const current=item || product
  console.log("Item",item)
  console.log("Product",product)
    const [selectedImage, setSelectedImage] = useState(current?.image);
 console.log("Current",current)
 useEffect(() => {
  setSelectedImage(current?.image);
}, [current?.image]);
    const { addcartItems, addTocart, removeFromCart } = useCart([]);
const currentItem = addcartItems.find(
  (cart) => String(cart.productId) === String(current.id)
);
const quantity = currentItem ? currentItem.quantity : 0;

  return (
    <>
    <Navbar/>
<div className="w-full">
  {/* GRID → Mobile = single column, Desktop = 2 columns */}
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 p-0 md:p-6">

    {/* LEFT SECTION → Images */}
    <div className="bg-white flex flex-col items-center">
      {/* Mobile: Full width | Desktop: Medium width */}
      <img
        src={selectedImage}
        alt={current?.name}
        className="
          w-full 
          h-64 
          object-cover 
          md:object-contain 
          md:w-[80%] 
          md:h-[380px] 
          rounded-md
        "
      />

      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar px-3 py-2 mt-2 w-full md:w-[80%]">
        {[current?.image, ...current?.images].map((img, idx) => (
          <img
            key={idx}
            src={img}
            onClick={() => setSelectedImage(img)}
            className={`w-14 h-14 rounded-md border cursor-pointer
              ${selectedImage === img ? "border-green-600" : "border-gray-300"}`}
          />
        ))}
      </div>
    </div>

    {/* RIGHT SECTION → Details */}
    <div className="bg-white px-3 py-4 md:px-0 md:py-0">

      {/* Breadcrumb */}
      <nav className="text-xs text-gray-500 mb-2 md:mb-4">
        Home / {current?.subcategory?.name || subcategoryName} / {current?.name}
      </nav>
      {/* Name */}
      <h1 className="text-lg md:text-2xl font-semibold leading-tight">
        {current?.name}
      </h1>
      <p className="text-gray-500 text-xs md:text-sm mt-1">⏱ 10 MINS</p>

      {/* Price */}
      <p className="text-xl md:text-2xl font-semibold mt-3">₹{current?.price}</p>

      <p className="text-gray-500 text-xs mt-1">(Inclusive of all taxes)</p>

      {/* Description */}
      
  <p
  className="text-sm md:text-base text-gray-700 mt-3 leading-tight"
  dangerouslySetInnerHTML={{
    __html: current?.description || current?.discription
  }}
/>


      {/* Cart Buttons */}
      {quantity === 0 ? (
        <button
          onClick={() => addTocart(current)}
          className="w-full md:w-48 bg-green-600 text-white py-3 rounded-lg mt-4 cursor-pointer text-sm font-medium"
        >
          Add to cart
        </button>
      ) : (
        <div className="w-full cursor-pointer  md:w-48 bg-green-600 text-white py-3 rounded-lg mt-4 flex justify-center items-center gap-4">
          <FaMinus
            onClick={() => removeFromCart(current)}
            className="text-sm cursor-pointer"
          />
          <span className="text-sm">{quantity}</span>
          <FaPlus
            onClick={() => addTocart(current)}
            className="text-sm cursor-pointer"
          />
        </div>
      )}

      {/* Why Blinkit */}
      <div className="mt-8">
        <h2 className="text-base md:text-lg font-semibold mb-3">
          Why shop from blinkit?
        </h2>

        <div className="flex gap-3 items-start mb-3">
          <span className="text-yellow-500 text-xl">⚡</span>
          <p className="text-sm md:text-base text-gray-600 leading-tight">
            Superfast delivery from stores near you.
          </p>
        </div>

        <div className="flex gap-3 items-start mb-3">
          <span className="text-yellow-600 text-xl">💰</span>
          <p className="text-sm md:text-base text-gray-600 leading-tight">
            Best prices & offers directly from manufacturers.
          </p>
        </div>

        <div className="flex gap-3 items-start mb-3">
          <span className="text-green-600 text-xl">🛒</span>
          <p className="text-sm md:text-base text-gray-600 leading-tight">
            5000+ products across categories.
          </p>
        </div>
      </div>
    </div>

  </div>
</div>


    <Footer/>
       </>
  );
}
