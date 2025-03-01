import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import CartIcon from "./CartIcon";

const Navigation: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-xl font-bold text-gray-800 hover:text-blue-600"
            >
              Tech Store
            </Link>
          </div>

          <div className="flex space-x-4">
            <Link
              to="/products"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md"
            >
              Products
            </Link>
            <CartIcon />
            {isAuthenticated ? (
              <>
                <span className="text-gray-700 px-3 py-2">
                  {user?.username}
                </span>
                <button
                  onClick={logout}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
