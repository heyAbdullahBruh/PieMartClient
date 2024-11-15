// src/context/CartContext.js
'use client';
import { createContext, useContext, useState } from 'react';

 const CartContext = createContext();

 const CartProvider = ({ children,token }) => {
  const [cartCount, setCartCount] = useState(0);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount ,token}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
      throw new Error("useCart must be used within a CartProvider");
    }
    return context;
  };

export default CartProvider;