import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';


export function List({setcatProducts}){
  
  const [trendingdata,setTrendingdata]=useState([])
 useEffect(()=>{
 const trending=async()=>{
     try{
      const response=await fetch('https://grocery-x2ds.onrender.com/homeproducts/getTrending')
      if(!response.ok) throw new Error ("404 or other error");
      const data=await response.json()
      console.log("trending data",data)
      setTrendingdata(data)
      }catch(error){
        console.error("Error fetching trending products:",error)
     }
  }
  trending();
 },[])
  const filteredCategories = setcatProducts
    ?.filter(
      (cat) =>
        cat.sortno && cat.sortno !== "no" && !isNaN(Number(cat.sortno)) // hide "no" or missing sortno
    )
    .sort((a, b) => Number(a.sortno) - Number(b.sortno)); //
  return (
    <div>
      <section className="px-6 py-4 animate-fade-in">
        <h2 className="text-xl font-semibold mb-3">Latest Products</h2>
        <div className="flex gap-4 overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden pb-2">
          {trendingdata.map((item, idx) => {
            const cardKey = item._id || item.id || idx;
            // normalize trending product shape for ProductCard
            const normalized = {
              id: item._id || item.id || item.productId,
              image: item.mainImage,
              images:item.images,
              name: item.productName || item.name,
              discription: item.description || "",
              weight: item.weight || item.netWeight || "",
              price: item.productPrice || item.price || 0,
            };
            console.log("Normalized trending product", normalized);

            return (
              <div
                key={cardKey}
                className="min-w-[150px] sm:min-w-[160px] max-w-[220px] md:min-w-[180px] p-3 bg-white rounded-xl shadow-md border border-gray-200 flex-shrink-0 hover:shadow-lg transition-transform duration-200"
              >
                <ProductCard product={normalized} />
              </div>
            );
          })}
        </div>
          
      </section>
  
    <div className="p-4 space-y-8">
      {filteredCategories?.map((category, index) => {
        // ✅ Get all products from subcategories
        const allProducts = category.subcategories?.flatMap(
          (sub) => sub.products || []
        );
        // ✅ Show only latest 7
        const latestProducts = allProducts?.slice(-7).reverse();

        return (
          <div key={index}>
            {/* 🏷 Category Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <img
                  src={category.categoryImage}
                  alt={category.categoryName}
                  className="w-10 h-10 object-cover rounded-full border"
                />
                <h2 className="text-lg font-semibold capitalize">
                  {category.categoryName}
                </h2>
              </div>
            </div>

            {/* 🛍 Horizontal Scroll Product List using ProductCard */}
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
              {latestProducts?.map((product, i) => {
                // Normalize product shape so ProductCard can consume it
                const normalized = {
                  id: product._id || product.id || product.productId,
                  image: product.productImage || product.images,
                  images:product.images,
                  name: product.productName || product.name,
                  weight: product.weight || product.netWeight || "",
                  price: product.productPrice || product.price || 0,
                };
                return (
                  <div
                    key={normalized.id || i}
                    className="min-w-[150px] sm:min-w-[160px] max-w-[220px] md:min-w-[180px] p-3 bg-white rounded-xl shadow-md border border-gray-200 flex-shrink-0 hover:shadow-lg transition-transform duration-200"
                  >
                    <ProductCard product={normalized} subcategoryName={category.categoryName} />
                  </div>
                );
              })}

              {(!latestProducts || latestProducts.length === 0) && (
                <p className="text-gray-500 text-center">No products available</p>
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