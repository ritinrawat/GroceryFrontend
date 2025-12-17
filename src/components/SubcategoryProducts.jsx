import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';

export default function SubcategoryProducts({ categoryId, subcategoryName = 'Products' }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fallbackProducts = [
    {
      id: "fallback-1",
      name: "Sample Product",
      weight: "1 kg",
      price: 28,
      image: "https://via.placeholder.com/150x150?text=Product",
    },
  ];

  useEffect(() => {
    if (!categoryId) return;

  const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      const sessionId = localStorage.getItem("sessionId");
      try {
        const response = await fetch(`https://grocery-x2ds.onrender.com/subcategory?id=${categoryId}&sessionId=${sessionId}`);
        
        if (!response.ok) throw new Error("404 or other error");
        const data = await response.json();
        console.log("Fetched products:", data.products);    
        setProducts(data.products); 
        

      } catch (error) {
        console.error("Error fetching products:", error);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);
  
  return (
    <>
      <section className="px-2 sm:px-4 lg:px-6 py-2 sm:py-4">
        {loading ? (
          <div className="flex items-center justify-center py-4 sm:py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
              <p className="text-gray-600 text-xs sm:text-sm">Loading {subcategoryName}...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-4 sm:py-8">
            <div className="text-center">
              <p className="text-red-600 text-xs sm:text-sm mb-2">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-2 py-1 sm:px-3 sm:py-1 bg-blue-500 text-white rounded text-xs sm:text-sm hover:bg-blue-600"
              >
                Retry
              </button>
            </div>
          </div>
        ) : (
          <>  
                      <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">{subcategoryName}</h2>
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 lg:gap-4 ">
               {(products.length > 0 ? products : fallbackProducts).map((product) => (
                 <ProductCard key={product.id || product.name} product={product} subcategoryName={subcategoryName} />
               ))}
             </div>
            {products.length === 0 && !loading && (
              <div className="text-center py-4 sm:py-8">
                <p className="text-gray-500 text-sm sm:text-base">No products found in this category.</p>
              </div>
            )}
          </>
        )}
      </section>
    </>
  )
} 
