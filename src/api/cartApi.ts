import api from "../utils/api";
import { Product } from "./productsApi";

export interface CartItem {
  product: Product;
  quantity: number;
  _id: string;
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const addToCart = async (
  productId: string,
  quantity: number = 1
): Promise<Cart> => {
  try {
    console.log("Adding to cart:", { productId, quantity });
    const response = await api.post<Cart>("/api/cart/add", {
      productId,
      quantity,
    });
    console.log("Cart response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error adding to cart:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getCart = async (): Promise<Cart> => {
  try {
    const response = await api.get<Cart>("/api/cart");
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching cart:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateCartItemQuantity = async (
  itemId: string,
  quantity: number
): Promise<Cart> => {
  try {
    console.log("Updating cart item:", { itemId, quantity });
    const response = await api.put<Cart>(`/api/cart/item/${itemId}`, {
      quantity,
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error updating cart item:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const removeCartItem = async (itemId: string): Promise<Cart> => {
  try {
    console.log("Removing cart item:", { itemId });
    const response = await api.delete<Cart>(`/api/cart/item/${itemId}`);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error removing cart item:",
      error.response?.data || error.message
    );
    throw error;
  }
};
