import React, { createContext, useContext, useState, useEffect } from "react";
import { Cart, getCart } from "../api/cartApi";
import { useAuth } from "./AuthContext";

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshCart = async () => {
    if (!isAuthenticated) {
      setCart(null);
      return;
    }

    setLoading(true);
    setError(null);
    console.log("Refreshing cart...");

    try {
      const cartData = await getCart();
      console.log("Cart data received:", cartData);
      setCart(cartData);
    } catch (err: any) {
      console.error("Error in refreshCart:", err);
      setError(err.response?.data?.message || "Failed to fetch cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Cart state changed:", cart);
  }, [cart]);

  useEffect(() => {
    console.log("Auth state changed:", isAuthenticated);
    if (isAuthenticated) {
      refreshCart();
    }
  }, [isAuthenticated]);

  return (
    <CartContext.Provider value={{ cart, loading, error, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
