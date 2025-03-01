import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Product } from "../api/productsApi";
import { addToCart } from "../api/cartApi";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isAuthenticated, user } = useAuth();
  const { refreshCart } = useCart();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  const placeholderImage = "https://via.placeholder.com/300x200";

  const handleAddToCart = async () => {
    if (!isAuthenticated || !user) {
      navigate("/login", {
        state: {
          from: window.location.pathname,
          message: "Please login to add items to cart",
        },
      });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await addToCart(product._id);
      await refreshCart();
      alert("Product added to cart successfully!");
    } catch (err: any) {
      console.error("Error in handleAddToCart:", err);
      setError(err.response?.data?.message || "Failed to add to cart");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const img = e.target as HTMLImageElement;
    img.src = placeholderImage;
    img.onerror = null;
  };

  const handleImageLoad = () => {
    setImageError(false);
  };

  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <Link to={`/products/${product.slug}`}>
        <div className="aspect-w-16 aspect-h-9 mb-4 relative">
          <img
            src={product.imageUrl || placeholderImage}
            alt={product.name}
            className={`object-cover w-full h-48 rounded-lg ${
              imageError ? "opacity-50" : ""
            }`}
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
          {imageError && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              <span>Image not available</span>
            </div>
          )}
        </div>
        <h2 className="text-xl font-bold text-gray-800 hover:text-blue-600">
          {product.name}
        </h2>
      </Link>
      <p className="text-gray-600 mt-2 line-clamp-2">{product.description}</p>
      <div className="mt-4 flex justify-between items-center">
        <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
        <button
          onClick={handleAddToCart}
          disabled={isLoading}
          className={`px-4 py-2 rounded-md text-white ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? "Adding..." : "Add to Cart"}
        </button>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default ProductCard;
