// CategoryList.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Make sure this import exists if you're using <Link>
import Trending from './Trending';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchapi = async () => {
      try {
        const response = await fetch(`https://grocery-x2ds.onrender.com/data`);
        const data = await response.json();
        console.log('Fetched categories:', data.data);
        setCategories(data.data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchapi();
  }, []);

  // Blinkit-style pastel background colors for category circles/cards
  const bgColors = [
    'bg-[#f8f6e9]', // cream
    'bg-[#f3f9f3]', // mint
    'bg-[#fdf3f3]', // rose
    'bg-[#f3f9ff]', // azure
    'bg-[#f9f3ff]', // lavender
    'bg-[#fff7ed]', // peach
    'bg-[#effefb]', // cyan
    'bg-[#f5f5f5]', // gray
  ];

  return (
    <section className="bg-white py-8 sm:py-12 animate-fade-in">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1f1f1f] tracking-tight">
            Shop by Category
          </h2>
          {/* <button className="text-sm font-bold text-[#0c831f] hover:underline">View All</button> */}
        </div>

        {categories.length === 0 ? (
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="w-full aspect-square bg-gray-100 rounded-2xl mb-2"></div>
                <div className="h-3 w-12 bg-gray-100 mx-auto rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-x-4 gap-y-8 sm:gap-x-6">
            {categories.map((item, index) => (
              <Link
                key={item.id || item._id}
                to={`/maincat/${item.id || item._id}`}
                className="group flex flex-col items-center text-center transition-all duration-300"
              >
                {/* Image Container with Pastel Background */}
                <div className={`
                  relative w-full aspect-square rounded-2xl sm:rounded-3xl
                  overflow-hidden mb-3 p-2 sm:p-4
                  ${bgColors[index % bgColors.length]}
                  transition-all duration-300 group-hover:scale-105 group-hover:shadow-md
                `}>
                  <img
                    src={item.categoryImage}
                    alt={item.categoryName}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </div>

                {/* Category Name */}
                <p className="text-[10px] sm:text-[13px] font-bold text-[#1f1f1f] leading-tight line-clamp-2 max-w-[90%] group-hover:text-[#0c831f] transition-colors">
                  {item.categoryName}
                </p>
              </Link>
            ))}
          </div>
        )}

        {/* Latest Products & Category-wise Products Section */}
        <div className="mt-16 pt-10 border-t border-gray-100">
          <Trending setcatProducts={categories} />
        </div>
      </div>
    </section>
  );
};

export default CategoryList;




// http://192.168.29.251/laravel/blinkit-api/public/api/categories
