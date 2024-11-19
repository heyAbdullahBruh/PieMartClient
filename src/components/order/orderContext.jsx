// src/context/CartContext.js
'use client';
import { createContext, useContext, useState } from 'react';

 const OrderContext = createContext();

 const OrderProvider = ({ children,user }) => {
  // const [cartCount, setCartCount] = useState(0);
  const [orderProduct ,setOrderProduct]=useState([]);
  return (
    <OrderContext.Provider value={{ orderProduct ,setOrderProduct,user}}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
    const context = useContext(OrderContext);
    if (!context) {
      throw new Error("useOrder must be used within a OrderProvider");
    }
    return context;
  };

export default OrderProvider;