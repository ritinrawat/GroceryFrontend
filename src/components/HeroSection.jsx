// src/components/HeroSection.jsx
import React from "react";

const HeroSection = () => {
  return (
   <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-[#059363] via-[#0aa66f] to-[#eafff6] animate-slide-up">

  {/* Background Glow Blobs */}
  <div className="absolute top-[-120px] left-[-120px] w-[220px] sm:w-[300px] h-[220px] sm:h-[300px] bg-white/20 rounded-full blur-[90px] sm:blur-[110px]" />
  <div className="absolute bottom-[-120px] right-[-120px] w-[220px] sm:w-[300px] h-[220px] sm:h-[300px] bg-black/10 rounded-full blur-[90px] sm:blur-[110px]" />

  <div className="relative max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">

    {/* Badges */}
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6">
      <span className="px-3 sm:px-4 py-2 rounded-full bg-white/20 text-white text-xs sm:text-sm font-medium backdrop-blur-md border border-white/20">
        ⚡ 10 min delivery
      </span>
      <span className="px-3 sm:px-4 py-2 rounded-full bg-white/20 text-white text-xs sm:text-sm font-medium backdrop-blur-md border border-white/20">
        🥦 Fresh groceries
      </span>
      <span className="px-3 sm:px-4 py-2 rounded-full bg-white/20 text-white text-xs sm:text-sm font-medium backdrop-blur-md border border-white/20">
        💰 Best prices
      </span>
    </div>

    {/* Heading */}
    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5 drop-shadow-lg">
      Groceries delivered{" "}
      <span className="text-black/90">in minutes</span>
    </h2>

    {/* Sub text */}
    <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-10 max-w-xl sm:max-w-2xl mx-auto leading-relaxed">
      From snacks to daily essentials — get everything at your doorstep with
      super fast delivery and trusted quality.
    </p>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">

      <button className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-semibold text-white bg-black hover:bg-black/90 transition-all duration-300 transform hover:scale-105 shadow-xl">
        Shop Now 🚀
      </button>

      <button className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-semibold text-white bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:scale-105 shadow-lg">
        Explore Categories
      </button>

    </div>

  </div>
</section>

  );
};

export default HeroSection;
