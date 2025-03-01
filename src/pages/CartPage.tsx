import React from "react";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import { updateCartItemQuantity, removeCartItem } from "../api/cartApi";

const CartPage: React.FC = () => {
  const { cart, loading, error, refreshCart } = useCart();
  const [updatingItems, setUpdatingItems] = React.useState<Set<string>>(
    new Set()
  );

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setUpdatingItems((prev) => new Set(prev).add(itemId));
    try {
      await updateCartItemQuantity(itemId, newQuantity);
      await refreshCart();
    } catch (err) {
      console.error("Failed to update quantity:", err);
    } finally {
      setUpdatingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    if (!window.confirm("Are you sure you want to remove this item?")) return;

    setUpdatingItems((prev) => new Set(prev).add(itemId));
    try {
      await removeCartItem(itemId);
      await refreshCart();
    } catch (err) {
      console.error("Failed to remove item:", err);
    } finally {
      setUpdatingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-gray-600">Loading cart...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 p-4 text-center">
        Error loading cart: {error}
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link
          to="/products"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  const total = cart.items.reduce(
    (sum, item) => sum + item.quantity * (item.product?.price || 0),
    0
  );

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="divide-y divide-gray-200">
          {cart.items.map((item) => (
            <div key={item._id} className="p-4 flex items-center">
              <div className="w-24 h-24 flex-shrink-0 mr-4">
                <img
                  src={item.product.imageUrl || "/images/placeholder-image.svg"}
                  alt={item.product.name}
                  className="w-full h-full object-cover rounded"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/placeholder-image.svg";
                    target.onerror = null;
                  }}
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">
                  {item.product.name}
                </h3>
                <p className="text-gray-500">${item.product.price}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 disabled:opacity-50"
                    onClick={() =>
                      handleQuantityChange(item._id, item.quantity - 1)
                    }
                    disabled={updatingItems.has(item._id) || item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="w-12 text-center">{item.quantity}</span>
                  <button
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 disabled:opacity-50"
                    onClick={() =>
                      handleQuantityChange(item._id, item.quantity + 1)
                    }
                    disabled={updatingItems.has(item._id)}
                  >
                    +
                  </button>
                </div>
                <span className="font-medium w-24 text-right">
                  ${(item.quantity * item.product.price).toFixed(2)}
                </span>
                <button
                  className="text-red-600 hover:text-red-800 disabled:opacity-50"
                  onClick={() => handleRemoveItem(item._id)}
                  disabled={updatingItems.has(item._id)}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Total:</span>
            <span className="text-xl font-bold">${total.toFixed(2)}</span>
          </div>
          <button
            className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => {
              // Checkout logic will be implemented here
              alert("Checkout functionality coming soon!");
            }}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
