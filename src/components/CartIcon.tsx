import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

const CartIcon: React.FC = () => {
  const { cart, loading } = useCart();

  console.log("CartIcon render:", { cart, loading });

  if (cart?.items) {
    console.log("Cart items:", cart.items);
    console.log("Cart items length:", cart.items.length);
    cart.items.forEach((item, index) => {
      console.log(`Item ${index}:`, item);
    });
  }

  const itemCount =
    cart?.items?.reduce((total, item) => {
      console.log("Processing item:", item);
      console.log("Current quantity:", item.quantity);
      return total + (item.quantity || 0);
    }, 0) || 0;

  console.log("Final item count:", itemCount);

  return (
    <Link
      to="/cart"
      className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md flex items-center"
    >
      <span>Cart</span>
      <span
        className="ml-1 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
        title={`Items in cart: ${itemCount}`}
      >
        {loading ? "..." : itemCount}
      </span>
    </Link>
  );
};

export default CartIcon;
