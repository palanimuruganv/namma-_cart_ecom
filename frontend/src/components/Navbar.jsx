import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";

const Navbar = () => {
  const { userInfo, logout } = useAuth();
  const { itemsCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-gradient-primary sticky top-0 z-20 shadow-lg">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="text-2xl font-display font-extrabold text-white drop-shadow">
          Namma Cart
        </Link>

        <div className="flex items-center gap-5 text-sm font-medium text-white">
          <Link to="/" className="hover:text-cyan-200 transition-colors">Shop</Link>

          <Link to="/cart" className="relative hover:text-cyan-200 transition-colors">
            Cart
            {itemsCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg">
                {itemsCount}
              </span>
            )}
          </Link>

          {userInfo ? (
            <>
              <Link to="/myorders" className="hover:text-cyan-200 transition-colors">My Orders</Link>
              {userInfo.role === "admin" && (
                <Link to="/admin" className="hover:text-cyan-200 transition-colors">Admin</Link>
              )}
              <span className="text-blue-200">|</span>
              <span className="text-blue-100">Hi, {userInfo.name.split(" ")[0]}</span>
              <button onClick={handleLogout} className="border-2 border-white hover:bg-white hover:text-brand-600 text-white font-medium px-3 py-1.5 rounded-lg transition-all duration-300">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-white text-brand-600 hover:shadow-lg font-semibold px-4 py-1.5 rounded-lg transition-all duration-300 transform hover:scale-105">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
