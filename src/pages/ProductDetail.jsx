import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaPlus, FaMinus, FaTimes } from "react-icons/fa";
import { useLocation, Link } from "react-router-dom";
import { useCart } from "../contextApi/Context.jsx";
import ReactMarkdown from "react-markdown";
export default function ProductPage() {
  const location = useLocation();
  const { product, subcategoryName, item } = location.state || {};
  const current = item || product;

  const [selectedImage, setSelectedImage] = useState(current?.image);
  const { addcartItems, addTocart, removeFromCart } = useCart([]);

  useEffect(() => {
    if (current?.image) {
      setSelectedImage(current.image);
    }
  }, [current]);

  const currentItem = addcartItems.find(
    (cart) => String(cart.productId) === String(current?.id || current?._id)
  );
  const quantity = currentItem ? currentItem.quantity : 0;

  if (!current) {
    return <div className="min-h-screen flex items-center justify-center">Loading product...</div>;
  }

  const allImages = [current.image, ...(current.images || [])].filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-8">

          {/* Breadcrumb - Hidden on mobile for cleaner look */}
          <nav className="hidden md:flex items-center gap-2 text-xs font-semibold text-gray-400 mb-6 uppercase tracking-widest">
            <Link to="/" className="hover:text-[#059363] transition-colors">Home</Link>
            <span>/</span>
            <span className="hover:text-[#059363] transition-colors">{current?.subcategory?.name || subcategoryName}</span>
            <span>/</span>
            <span className="text-gray-900">{current?.name}</span>
          </nav>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">

              {/* Left: Product Images */}
              <div className="p-4 md:p-8 border-b lg:border-b-0 lg:border-r border-gray-100 bg-white">
                <div className="sticky top-28 space-y-6">
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50/50 flex items-center justify-center p-4">
                    <img
                      src={selectedImage}
                      alt={current.name}
                      className="max-h-full max-w-full object-contain hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Thumbnails */}
                  {allImages.length > 1 && (
                    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                      {allImages.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedImage(img)}
                          className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl border-2 overflow-hidden transition-all ${selectedImage === img ? "border-[#059363] bg-[#059363]/5" : "border-gray-100 hover:border-gray-200"
                            }`}
                        >
                          <img src={img} alt="" className="w-full h-full object-contain p-1" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Product Details */}
              <div className="p-6 md:p-10 lg:p-14 flex flex-col">
                <div className="flex-grow">
                  <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-full uppercase tracking-wider mb-4">
                    {current.weight || '750g'}
                  </span>

                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 leading-tight mb-2">
                    {current.name}
                  </h1>

                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center gap-1 bg-yellow-400 text-black px-2 py-0.5 rounded text-xs font-bold">
                      <span>⚡</span> 10 MINS
                    </div>
                    <span className="text-gray-400 text-sm">|</span>
                    <span className="text-[#059363] text-sm font-bold">In Stock</span>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-gray-900">₹{current.price}</span>
                      <span className="text-sm text-gray-400 font-medium">MRP ₹{Math.round(current.price * 1.2)}</span>
                    </div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide mt-1">(Inclusive of all taxes)</p>
                  </div>

                  <div className="space-y-4 mb-10">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Product Description</h3>
                    <div
                      className="text-gray-600 text-sm md:text-base leading-relaxed prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: current.description || current.discription }}
                    />
                  </div>

                  {/* Add to Cart Section */}
                  <div className="flex flex-col sm:flex-row gap-4 sticky bottom-4 sm:static md:mb-10">
                    {quantity === 0 ? (
                      <button
                        onClick={() => addTocart(current)}
                        className="flex-grow bg-[#059363] text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-[#059363]/20 hover:shadow-[#059363]/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                      >
                        Add to Cart <FaPlus size={14} />
                      </button>
                    ) : (
                      <div className="flex-grow bg-[#059363] text-white py-4 rounded-2xl flex items-center justify-between px-8 shadow-xl shadow-[#059363]/20">
                        <button
                          onClick={() => removeFromCart(current)}
                          className="hover:bg-white/10 p-2 rounded-lg transition-colors"
                        >
                          <FaMinus size={18} />
                        </button>
                        <div className="flex flex-col items-center">
                          <span className="text-xs font-bold uppercase opacity-80 tracking-widest">{quantity} in cart</span>
                          <span className="text-xl font-black">Added</span>
                        </div>
                        <button
                          onClick={() => addTocart(current)}
                          className="hover:bg-white/10 p-2 rounded-lg transition-colors"
                        >
                          <FaPlus size={18} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Why Shop From Us Section */}
                <div className="mt-12 pt-10 border-t border-gray-100">
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Why shop from blinkit?</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col gap-2">
                      <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center text-xl">⚡</div>
                      <p className="text-xs font-bold text-gray-900 leading-tight">Superfast delivery from stores near you</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-xl">💰</div>
                      <p className="text-xs font-bold text-gray-900 leading-tight">Best prices & offers directly from manufacturers</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-xl">🛒</div>
                      <p className="text-xs font-bold text-gray-900 leading-tight">5000+ products across categories</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

