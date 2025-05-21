// src/context/OrderContext.js
import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [userUploadedQR, setUserUploadedQR] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [orders, setOrders] = useState([]);

  const addToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => prev.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addOrder = (order) => {
    setOrders((prevOrders) => [...prevOrders, order]);
  };

  const handleOrderSubmit = () => {
    const newOrder = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      product: cartItems[0] || {},
      quantity: cartItems.length,
      total: cartItems.reduce((sum, item) => sum + item.price, 0),
      status: 'Processing',
      paymentMethod: 'Gcash',
      paymentReference: userUploadedQR?.name || 'N/A',
      address: 'N/A',
    };

    addOrder(newOrder);
    console.log('Order submitted!', newOrder);

    clearCart();
    setUserUploadedQR(null);
  };

  return (
    <OrderContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        userUploadedQR,
        setUserUploadedQR,
        userEmail,
        setUserEmail,
        userName,
        setUserName,
        handleOrderSubmit,
        orders,
        addOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

// Custom hook
export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
