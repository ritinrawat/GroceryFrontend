import React, { useEffect, useState } from 'react'
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
      <section className="px-4 py-4 animate-fade-in">
        <h2 className="text-xl font-bold mb-3 text-gray-900 px-2 sm:px-0">Latest Products</h2>
        <div className="flex gap-3 overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden pb-2 px-2 sm:px-0">
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
                className="min-w-[125px] sm:min-w-[170px] max-w-[150px] sm:max-w-none flex-shrink-0"
              >
                <ProductCard product={normalized} />
              </div>
            );
          })}
        </div>

      </section>

      <div className="px-4 py-4 space-y-8">
        {filteredCategories?.map((category, index) => {
          // ✅ Get all products from subcategories
          const allProducts = category.subcategories?.flatMap(
            (sub) => sub.products || []
          );
          // ✅ Show only latest 7
          const latestProducts = allProducts?.slice(-7).reverse();

          return (
            <div key={index} className="last:pb-8">
              {/* 🏷 Category Header */}
              <div className="flex items-center justify-between mb-3 px-2 sm:px-0">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 border rounded-full overflow-hidden bg-white">
                    <img
                      src={category.categoryImage}
                      alt={category.categoryName}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h2 className="text-lg font-bold capitalize text-gray-900">
                    {category.categoryName}
                  </h2>
                </div>
              </div>

              {/* 🛍 Horizontal Scroll Product List using ProductCard */}
              <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 px-2 sm:px-0">
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
                      className="min-w-[125px] sm:min-w-[170px] max-w-[150px] sm:max-w-none flex-shrink-0"
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
