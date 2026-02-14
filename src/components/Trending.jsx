import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';


export function List({ setcatProducts }) {

  const [trendingdata, setTrendingdata] = useState([])
  useEffect(() => {
    const trending = async () => {
      try {
        const response = await fetch(`https://grocery-x2ds.onrender.com/homeproducts/getTrending`)
        if (!response.ok) throw new Error("404 or other error");
        const data = await response.json()
        console.log("trending data", data)
        setTrendingdata(data)
      } catch (error) {
        console.error("Error fetching trending products:", error)
      }
    }
    trending();
  }, [])
  const filteredCategories = setcatProducts
    ?.filter(
      (cat) =>
        cat.sortno && cat.sortno !== "no" && !isNaN(Number(cat.sortno)) // hide "no" or missing sortno
    )
    .sort((a, b) => Number(a.sortno) - Number(b.sortno)); //
  return (
    <div>
      <section className="px-0 py-4 animate-fade-in">
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-[#1f1f1f] px-2 sm:px-0 tracking-tight">
          Latest Products
        </h2>
        <div className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-4 px-2 sm:px-0">
          {trendingdata.map((item, idx) => {
            const cardKey = item._id || item.id || idx;
            // normalize trending product shape for ProductCard
            const normalized = {
              id: item._id || item.id || item.productId,
              image: item.mainImage,
              images: item.images,
              name: item.productName || item.name,
              discription: item.description || "",
              weight: item.weight || item.netWeight || "",
              price: item.productPrice || item.price || 0,
            };

            return (
              <div
                key={cardKey}
                className="min-w-[140px] sm:min-w-[180px] md:min-w-[200px] flex-shrink-0"
              >
                <ProductCard product={normalized} />
              </div>
            );
          })}
        </div>

      </section>

      <div className="px-0 py-4 space-y-12">
        {filteredCategories?.map((category, index) => {
          // ✅ Get all products from subcategories
          const allProducts = category.subcategories?.flatMap(
            (sub) => sub.products || []
          );
          // ✅ Show only latest 7
          const latestProducts = allProducts?.slice(-10).reverse();

          return (
            <div key={index} className="last:pb-8">
              {/* 🏷 Category Header */}
              <div className="flex items-center justify-between mb-5 px-2 sm:px-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-gray-50 border border-gray-100 p-1">
                    <img
                      src={category.categoryImage}
                      alt={category.categoryName}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold capitalize text-[#1f1f1f] tracking-tight">
                    {category.categoryName}
                  </h2>
                </div>
                <Link
                  to={`/maincat/${category.id || category._id}`}
                  className="text-sm font-bold text-[#0c831f] hover:text-[#0a6e1a] transition-colors"
                >
                  See all
                </Link>
              </div>

              {/* 🛍 Horizontal Scroll Product List using ProductCard */}
              <div className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar pb-4 px-2 sm:px-0">
                {latestProducts?.map((product, i) => {
                  // Normalize product shape so ProductCard can consume it
                  const normalized = {
                    id: product._id || product.id || product.productId,
                    image: product.productImage || product.images,
                    images: product.images,
                    name: product.productName || product.name,
                    weight: product.weight || product.netWeight || "",
                    price: product.productPrice || product.price || 0,
                  };
                  return (
                    <div
                      key={normalized.id || i}
                      className="min-w-[140px] sm:min-w-[180px] md:min-w-[200px] flex-shrink-0"
                    >
                      <ProductCard product={normalized} subcategoryName={category.categoryName} />
                    </div>
                  );
                })}

                {(!latestProducts || latestProducts.length === 0) && (
                  <p className="text-gray-500 text-center w-full py-4 text-sm">No products available</p>
                )}
              </div>
            </div>
          );
        })}
      </div>


    </div>
  )
}

export default List
