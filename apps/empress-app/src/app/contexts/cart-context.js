"use client";

import { createContext, useContext, useState } from "react";

const cartContext = createContext();

function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);
  return (
    <cartContext.Provider value={{ cart, setCart }}>
      {children}
    </cartContext.Provider>
  );
}

function useCartContext() {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartContextProvider");
  }
  return context;
}

export { CartContextProvider, useCartContext };
