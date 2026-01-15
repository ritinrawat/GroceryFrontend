import React, { useEffect, useState, useRef } from 'react';
import SubcategoryProducts from '../components/SubcategoryProducts';
import Navbar from '../components/Navbar';
import Breadcrumb from '../components/Breadcrumb';
import { useParams } from 'react-router-dom';

export function MainCat() {
  const [subcategories, setSubCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const { categoryId } = useParams();
  const productContainerRef = useRef(null); // for desktop only
  const isProcessingRef = useRef(false);
  const subcatRefs = useRef([]);
  const scrollTimeoutRef = useRef(null);
  const lastScrollYRef = useRef(0);

  // Fetch category and subcategories
  useEffect(() => {
    const fetchapi = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://grocery-x2ds.onrender.com/category/${categoryId}`);
        const data = await response.json();

        console.log('Fetched category data:', data);

        if (data.subcategories.length > 0) {
          setSubCategories(data.subcategories);
          console.log('Fetched subcategories:', data.subcategories);
          setSelectedCategoryId(data.subcategories[0].id);
        }
        setCategoryName(data.categoryName || 'Category');
      } catch (error) {
        console.error('Fetch error:', error);
        setError('Failed to load category data');
      } finally {
        setLoading(false);
      }
    };

    fetchapi();
  }, [categoryId]);

  // Mobile: Auto-scroll to next/previous subcategory
  useEffect(() => {
    if (window.innerWidth >= 768) return;

    const handleScroll = () => {
      if (isProcessingRef.current) return;

      const currentScrollY = window.scrollY;
      const scrollDirection = currentScrollY > lastScrollYRef.current ? 'down' : 'up';
      lastScrollYRef.current = currentScrollY;

      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Debounce the scroll handling
      scrollTimeoutRef.current = setTimeout(() => {
        const threshold = 100;
        const scrollPosition = window.innerHeight + window.scrollY;
        const pageHeight = document.documentElement.scrollHeight;
        const currentIndex = subcategories.findIndex(cat => cat.id === selectedCategoryId);

        // Scroll down - go to next subcategory
        if (pageHeight - scrollPosition < threshold && scrollDirection === 'down') {
          const nextSubcategory = subcategories[currentIndex + 1];
          if (nextSubcategory) {
            isProcessingRef.current = true;
            setIsAutoScrolling(true);
            setSelectedCategoryId(nextSubcategory.id);
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setIsAutoScrolling(false);
              isProcessingRef.current = false;
            }, 400);
          }
        }
        // Scroll up - go to previous subcategory
        else if (window.scrollY < threshold && scrollDirection === 'up') {
          const prevSubcategory = subcategories[currentIndex - 1];
          if (prevSubcategory) {
            isProcessingRef.current = true;
            setIsAutoScrolling(true);
            setSelectedCategoryId(prevSubcategory.id);
            setTimeout(() => {
              window.scrollTo({ down: document.documentElement.scrollHeight, behavior: 'smooth' });
              setIsAutoScrolling(false);
              isProcessingRef.current = false;
            }, 400);
          }
        }
      }, 150); // Debounce delay
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [selectedCategoryId, subcategories]);
  // Mobile: Scroll sidebar to active subcategory
  useEffect(() => {
    if (window.innerWidth < 768 && subcatRefs.current) {
      const activeIndex = subcategories.findIndex(cat => cat.id === selectedCategoryId);
      if (activeIndex !== -1 && subcatRefs.current[activeIndex]) {
        subcatRefs.current[activeIndex].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [selectedCategoryId, subcategories]);

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      {/* Title - Mobile: Fixed, Desktop: Normal */}
      <div className="hidden lg:flex justify-center mt-2 sm:mt-4 mb-2 px-2 sm:px-0
                lg:static left-0 right-0 z-40 lg:z-auto bg-gray-100">
        <div className="w-full lg:max-w-7xl bg-white rounded-md p-3 sm:p-4">
          <Breadcrumb
            items={[
              { label: 'Home', link: '/' },
              { label: categoryName },
            ]}
          />
          <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold">
            {categoryName}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex justify-center flex-1 overflow-hidden px-2 sm:px-4 pb-4 lg:mt-0">
        {loading ? (
          <div className="w-full max-w-7xl flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600 text-sm sm:text-base">Loading categories...</p>
            </div>
          </div>
        ) : error ? (
          <div className="w-full max-w-7xl flex items-center justify-center">
            <div className="text-center">
              <p className="text-red-600 mb-4 text-sm sm:text-base">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-3 py-2 sm:px-4 sm:py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm sm:text-base"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-0 lg:gap-4 h-full">
            {/* Subcategory Sidebar/Navigation */}
            <aside className="
              w-full lg:w-72 
              bg-white lg:bg-transparent
              shadow-sm lg:shadow-none 
              sticky 
              lg:top-28 
              z-30 
              lg:h-[calc(100vh-140px)]
              border-b lg:border-none border-gray-100
              mb-4 lg:mb-0
            ">
              <div className="
                flex lg:flex-col 
                gap-2 lg:gap-2 
                p-2 lg:p-0 
                overflow-x-auto lg:overflow-y-auto 
                no-scrollbar scroll-smooth
              ">
                {subcategories.map((cate, index) => (
                  <button
                    key={cate.id}
                    ref={el => subcatRefs.current[index] = el}
                    onClick={() => setSelectedCategoryId(cate.id)}
                    className={`
                      flex flex-row items-center gap-3
                      flex-shrink-0 min-w-[120px] lg:min-w-0 lg:w-full
                      p-2 lg:p-4 rounded-2xl transition-all duration-300
                      ${selectedCategoryId === cate.id
                        ? 'bg-white lg:bg-white shadow-lg lg:shadow-md border-b-4 lg:border-b-0 lg:border-l-4 border-[#059363] text-[#059363] scale-[1.02]'
                        : 'bg-gray-50 lg:bg-white/50 border border-transparent text-gray-600 hover:bg-white hover:text-[#059363] lg:hover:shadow-sm'
                      }
                    `}
                  >
                    <div className={`
                      w-10 h-10 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0 transition-transform duration-300
                      ${selectedCategoryId === cate.id ? 'bg-[#059363]/5 scale-110' : 'bg-white'}
                    `}>
                      <img
                        src={cate.image}
                        alt={cate.name}
                        className="w-8 h-8 lg:w-12 lg:h-12 object-contain"
                      />
                    </div>

                    <span className={`text-[11px] lg:text-[13px] font-black text-left line-clamp-2 leading-tight uppercase tracking-wide
                      ${selectedCategoryId === cate.id ? 'opacity-100' : 'opacity-70'}
                    `}>
                      {cate.name}
                    </span>

                    {isAutoScrolling && selectedCategoryId === cate.id && (
                      <div className="absolute top-2 right-2 w-2 h-2 bg-[#059363] rounded-full animate-ping lg:hidden"></div>
                    )}
                  </button>
                ))}
              </div>
            </aside>


            {/* Product Container - Desktop: Scrollable */}
            <div
              ref={productContainerRef}
              className="flex-grow lg:w-[80%] lg:h-[calc(100vh-200px)] bg-[#f3f4f6] rounded-xl lg:rounded-2xl p-2 sm:p-4 mt-2 lg:mt-0 lg:overflow-y-auto shadow-inner"
            >
              <div className="bg-white rounded-xl lg:rounded-2xl shadow-sm min-h-full">
                <SubcategoryProducts
                  categoryId={selectedCategoryId}
                  subcategoryName={
                    subcategories.find(cat => cat.id === selectedCategoryId)?.name || 'Products'
                  }
                />
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default MainCat;


