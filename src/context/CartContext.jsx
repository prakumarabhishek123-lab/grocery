import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (product, quantity, weight) => {
    setCartItems(prevItems => {
      const existingIndex = prevItems.findIndex(
        item => item.id === product.id && item.weight === weight
      );
      if (existingIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + quantity
        };
        return newItems;
      }
      return [...prevItems, { ...product, quantity, weight }];
    });
  };

  const updateQuantity = (productId, weight, newQty) => {
    if (newQty < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId && item.weight === weight
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const removeFromCart = (productId, weight) => {
    setCartItems(prevItems =>
      prevItems.filter(item => !(item.id === productId && item.weight === weight))
    );
  };

  const clearCart = () => setCartItems([]);

  const getCartCount = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0);

  const getCartTotal = () =>
    cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      cartOpen,
      setCartOpen,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      getCartCount,
      getCartTotal,
    }}>
      {children}
    </CartContext.Provider>
  );
};
