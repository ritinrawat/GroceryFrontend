import React from "react";
import { FaFacebookF, FaXTwitter, FaInstagram } from "react-icons/fa6";

const usefulLinks = ["Privacy", "Terms", "Contact", "FAQs"];

const categories = [
  "Vegetables & Fruits", "Bakery", "Dairy", "Munchies",
  "Cold Drinks", "Beauty", "Home Needs", "Personal Care"
];

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 py-8 md:px-20 animate-fade-in 
    text-xs sm:text-sm md:text-base">

      {/* TOP */}
      <div className="grid grid-cols-2 gap-6 mb-8">

        {/* Useful Links */}
        <div>
          <h3 className="font-semibold text-gray-300 mb-2 
          text-sm sm:text-base md:text-lg">
            Useful
          </h3>

          <ul className="space-y-1">
            {usefulLinks.map((link, i) => (
              <li key={i}
                className="hover:underline cursor-pointer
                text-xs sm:text-sm md:text-base"
              >
                {link}
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-semibold text-gray-300 mb-2
          text-sm sm:text-base md:text-lg">
            Categories
          </h3>

          <div className="grid grid-cols-1 gap-1">
            {categories.map((cat, i) => (
              <div key={i}
                className="hover:underline cursor-pointer
                text-xs sm:text-sm md:text-base"
              >
                {cat}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="border-t border-gray-700 pt-4 
      flex items-center justify-between">

        <p className="text-[10px] sm:text-xs md:text-sm text-gray-400">
          © Blink Commerce, 2025
        </p>

        <div className="flex gap-3">
          <FaFacebookF className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 cursor-pointer" />
          <FaXTwitter className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 cursor-pointer" />
          <FaInstagram className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 cursor-pointer" />
        </div>
      </div>

    </footer>
  );
};

export default Footer;
