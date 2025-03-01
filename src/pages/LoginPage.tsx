import React from "react";
import LoginForm from "../components/LoginForm";
import { useNavigate, useLocation } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const message = location.state?.message;

  const handleLoginSuccess = () => {
    navigate(from);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      {message && (
        <div className="mb-4 p-4 bg-blue-100 text-blue-700 rounded-md">
          {message}
        </div>
      )}
      <LoginForm onSuccess={handleLoginSuccess} />
    </div>
  );
};

export default LoginPage;
