// src/components/HeroSection.jsx
import React from "react";

const HeroSection = () => {
  return (
    <section className="bg-[#0A3D3F] from-secondary to-white py-16 animate-slide-up">
      <div className="max-w-7xl mx-auto text-center px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-textPrimary animate-bounce-subtle">
          Groceries delivered in minutes
        </h2>
        <p className="text-lg md:text-xl text-textSecondary text-white mb-8 max-w-2xl mx-auto">
          From snacks to essentials, get everything at your doorstep with lightning-fast delivery.
        </p>
        <button className="bg-white  text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-lg">
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
