import api from "../utils/api"; // Импортируем настроенный экземпляр api
import { AxiosError } from "axios";

// Define the structure of a Product
export interface Product {
  _id: string; // MongoDB uses _id instead of id
  name: string;
  slug: string;
  price: number;
  description: string;
  image: string;
  imageUrl: string; // Добавляем поле для изображения
  category: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

// Define the structure of the response from the API
export interface ProductsResponse {
  total: number;
  page: number;
  pages: number;
  products: Product[];
}

// Fetch all products with optional pagination
export const fetchProducts = async (
  page: number = 1,
  limit: number = 10
): Promise<ProductsResponse> => {
  try {
    const response = await api.get<ProductsResponse>(
      `/api/products?page=${page}&limit=${limit}`
    );
    console.log("Products response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching products:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Get a single product by ID
export const getProductById = async (id: string): Promise<Product> => {
  try {
    const response = await api.get<Product>(`/api/products/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching product:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Fetch a single product by slug
export const fetchProductBySlug = async (slug: string): Promise<Product> => {
  try {
    const response = await api.get<Product>(`/api/products/${slug}`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(`Error fetching product with slug ${slug}:`, {
      message: axiosError.message,
      config: axiosError.config,
      response: axiosError.response?.data,
    });
    throw error;
  }
};
