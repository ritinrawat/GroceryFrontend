// import React from "react";
// import ProductCard from "./ProductCard";
// import { useCart } from "../contextApi/Context";

// const ProductCategorySection = ({ title, products }) => {
//   const { addcartItems = [] } = useCart();

//   return (
//     <section className="mb-8 px-4 sm:px-6">
//       <h2 className="text-lg sm:text-xl font-semibold mb-4">{}</h2>
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//         {products.map((product, i) => {
//           const cartItem = addcartItems.find(
//             (item) => String(item.productId) === String(product._id) // ✅ compare ids properly
//           );

//           return (
//             <ProductCard
//               key={product._id || i}
//               product={product}
//               cartQuantity={cartItem ? cartItem.quantity : 0} // ✅ fallback to 0
//             />
//           );
//         })}
//       </div>
//     </section>
//   );
// };

// export default ProductCategorySection;
