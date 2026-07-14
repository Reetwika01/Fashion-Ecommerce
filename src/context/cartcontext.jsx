import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Load cart from backend
  const fetchCart = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setCart([]);
      setTotalAmount(0);
      return;
    }

    try {
      setLoading(true);

      const response = await api.get("/cart");

      setCart(response.data.items || []);
      setTotalAmount(response.data.totalAmount || 0);
    } catch (error) {
      console.error("Failed to load cart:", error);

      setCart([]);
      setTotalAmount(0);
    } finally {
      setLoading(false);
    }
  };

  // Load cart when app starts
  useEffect(() => {
    fetchCart();
  }, []);

  // Add item to cart
  const addToCart = async (product) => {
    try {
      await api.post("/cart/add", {
        productId: product.id,
        quantity: product.quantity || 1,
      });

      await fetchCart();

      alert("Product added to cart");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Unable to add product to cart."
      );
    }
  };

  // Remove item
  const removeFromCart = async (cartItemId) => {
    try {
      await api.delete(`/cart/${cartItemId}`);

      await fetchCart();
    } catch (error) {
      console.error(error);
    }
  };

  // Update quantity
  const updateCartItem = async (cartItemId, quantity) => {
    try {
      await api.put(`/cart/${cartItemId}`, {
        quantity,
      });

      await fetchCart();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Unable to update quantity."
      );
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      await api.delete("/cart/clear");

      setCart([]);
      setTotalAmount(0);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalAmount,
        loading,
        fetchCart,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);