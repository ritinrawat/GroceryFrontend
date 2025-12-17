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
        const response = await fetch('https://grocery-x2ds.onrender.com/data');
        const data = await response.json();
        console.log('Fetched categories:', data.data);
        setCategories(data.data);
        // Set the first category as selected by default
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchapi();
  }, []);

  return (
    <section className="bg-gray-70 px-4 sm:px-6 py-8 animate-fade-in ">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center mb-6">
          <h2 className=" text-2xl md:text-base lg:text-3xl   font-semibold text-emerald-700">Shop by Category</h2>
        </div>

        {categories.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-gray-500">No categories available right now.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5 xl:grid-cols-6 gap-5">
            {categories.map((item) => (
              <Link
                key={item.id || item._id}
                to={`/maincat/${item.id || item._id}`}
                className="group bg-white shadow-md rounded-2xl p-5 flex flex-col items-center text-center hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 border border-gray-200"
              >
                <div className="w-30 h-30 mb-3 rounded-full bg-white flex items-center justify-center overflow-hidden border border-emerald-200">
                  <img
                    src={item.categoryImage}
                    alt={item.categoryName}
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-sm font-medium text-emerald-800 group-hover:text-emerald-600">{item.categoryName}</p>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-8 bg-gray-50 border border-emerald-100 rounded-lg ">
          <Trending setcatProducts={categories} />
        </div>
      </div>
    </section>
  );
};

export default CategoryList;




// http://192.168.29.251/laravel/blinkit-api/public/api/categories
