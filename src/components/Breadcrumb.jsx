import React from 'react';
import { Link } from 'react-router-dom';

export default function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-600 mb-2 sm:mb-4 overflow-x-auto">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <span className="text-gray-400 flex-shrink-0">/</span>
          )}
          {item.link ? (
            <Link 
              to={item.link} 
              className="hover:text-blue-600 transition-colors flex-shrink-0"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium flex-shrink-0">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
} 