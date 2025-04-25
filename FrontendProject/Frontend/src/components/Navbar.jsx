import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { Menu, X, User } from "lucide-react";
import {  AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Active link style
  const linkStyle = (path) =>
    `hover:text-gray-200 transition ${
      location.pathname === path ? "border-b-2 border-white" : ""
    }`;

  return (
    <nav className="bg-green-700 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide hover:text-gray-200 transition">
          Event Manager
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/events" className={linkStyle("/events")}>
            Events
          </Link>
          {!user ? (
            <>
              <Link to="/login" className={linkStyle("/login")}>
                Login
              </Link>
              <Link to="/register" className={linkStyle("/register")}>
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              {/* User Profile */}
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>{user.username}</span>
              </div>
              
              <button
                onClick={() => dispatch(logout())}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Hamburger Menu (Mobile) */}
        <button 
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Dropdown Menu (Animated) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden flex flex-col items-center bg-green-800 text-white py-4 space-y-3"
          >
            <Link to="/events" onClick={() => setIsOpen(false)} className={linkStyle("/events")}>
              Events
            </Link>
            {!user ? (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)} className={linkStyle("/login")}>
                  Login
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)} className={linkStyle("/register")}>
                  Register
                </Link>
              </>
            ) : (
              <>
                {/* User Profile in Mobile Menu */}
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>{user.username}</span>
                </div>

                <button
                  onClick={() => {
                    dispatch(logout());
                    setIsOpen(false);
                  }}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
