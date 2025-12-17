// CartContext.js
import { createContext, useContext, useState } from "react";
import Swal from 'sweetalert2'
// 1️⃣ Create the context
const CartContext = createContext();
// 2️⃣ Provider to wrap your app
export function CartProvider({ children }) {
  const [addcartItems, setAddCartItems] = useState([]);
  const getCartItems = async () => {
    const token=localStorage.getItem('token')
      
        try {
          const response = await fetch(
            `https://grocery-x2ds.onrender.com/cart/get`,
            {
              
        method: 'GET',
          credentials: 'include',
        headers: { 'Content-Type': 'application/json',
              Authorization:`Bearer ${token}`
         },
            }
            
          );
          if (!response.ok) throw new Error("404 or other error");
    
          const data = await response.json();
          setAddCartItems(data.cartItems || []);
        } catch (error) {
          console.log("Error fetching cart items:", error);
        }
      };
         const addTocart= async (product,item)=>{
     try{
       const data = item || product;
 // handle both id styles
    const productId = data?.id || data?.productId;

    if (!productId) {
      throw new Error("Product ID not found");
    }
    const token=localStorage.getItem('token')
    if(!token) {
 Swal.fire({
  icon: "error",
  title: "Please Login First",
  text: "You need to be logged in to add items to your cart.",
});
      return;
    }
    console.log('token',token)
    const response = await fetch(`https://grocery-x2ds.onrender.com/cart/add`, {
  method: 'POST',
    credentials: 'include',
  headers: { 'Content-Type': 'application/json',
    Authorization:`Bearer ${token}`
   },
  body: JSON.stringify({
    productId,
  
  }),

});


getCartItems();
  // setCartItems((prev) => [...prev, product]); 
if (!response.ok) throw new Error("404 or other error");

      
     }catch(error){
      console.error("Error adding product to cart:", error);
  }

  }
    const removeFromCart = async (product,item) => {
    try {
         const data = item || product;

 

    // handle both id styles
    const productId = data?.id || data?.productId;

    if (!productId) {
      throw new Error("Product ID not found");
    }
     const token=localStorage.getItem('token')
      const response = await fetch(`https://grocery-x2ds.onrender.com/cart/remove`, {
        method: 'POST',
          credentials: 'include',
        headers: { 'Content-Type': 'application/json',
              Authorization:`Bearer ${token}`
         },
        body: JSON.stringify({
          productId
        }),
      });

      if (!response.ok) throw new Error("404 or other error");

      getCartItems();
    }
    catch (error) {
      console.error("Error removing product from cart:", error);
    }}
    const clearCart = () => {
  setAddCartItems([])  // clears frontend cart immediately
};
  return (
    <CartContext.Provider value={{ addcartItems,getCartItems,addTocart,removeFromCart,clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// 3️⃣ Custom hook (easy to use)
export function useCart() {
  return useContext(CartContext);
}
