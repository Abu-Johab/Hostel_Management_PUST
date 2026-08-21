import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { auth } from "../firebase"; // Firebase auth instance
import { signOut } from "firebase/auth"; // Firebase sign out method

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation(); // Get the current location (page)

  // Check if current path is either '/rooms' or '/apply' to hide login/signup
  const hideAuthButtons = location.pathname === "/rooms" || location.pathname === "/apply";

  useEffect(() => {
    // Check user login status on component mount
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLoggedIn(!!user); // If user is logged in, set isLoggedIn to true
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navLinkClasses = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold underline"
      : "text-gray-700 hover:text-blue-600";

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      setIsLoggedIn(false); // Update the state to reflect that the user is logged out
    } catch (error) {
      console.error("Error logging out: ", error.message);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-gray-800">
          PUST Hall
        </Link>

        {/* Hamburger button (Mobile) */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 justify-center">
          <ul className="flex space-x-6 text-gray-700 font-medium">
            <li><NavLink to="/" className={navLinkClasses}>Home</NavLink></li>
            <li><NavLink to="/rooms" className={navLinkClasses}>Rooms</NavLink></li>
            <li><NavLink to="/apply" className={navLinkClasses}>Apply Now</NavLink></li>
            <li><NavLink to="/notice" className={navLinkClasses}>Notice</NavLink></li>
            <li><NavLink to="/user" className={navLinkClasses}>User</NavLink></li>
          </ul>
        </div>

        {/* Auth buttons (Hidden on /rooms and /apply pages) */}
        {!hideAuthButtons && !isLoggedIn && (
          <div className="hidden md:flex space-x-4">
            <Link
              to="/login"
              className="px-4 py-1 border border-blue-600 text-blue-600 rounded hover:bg-blue-100 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>
          </div>
        )}

        {/* Show Logout button if logged in */}
        {isLoggedIn && (
          <div className="hidden md:flex space-x-4">
            <button
              onClick={handleLogout}
              className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="space-y-3 text-gray-700 font-medium">
            <li><NavLink to="/" className={navLinkClasses}>Home</NavLink></li>
            <li><NavLink to="/rooms" className={navLinkClasses}>Rooms</NavLink></li>
            <li><NavLink to="/apply" className={navLinkClasses}>Apply Now</NavLink></li>
            <li><NavLink to="#" className={navLinkClasses}>Feedback</NavLink></li>
            <li><NavLink to="/user" className={navLinkClasses}>User</NavLink></li>
            {/* Mobile login/signup hidden if on /rooms or /apply */}
            {!hideAuthButtons && !isLoggedIn && <li><Link to="/login" className="block text-blue-600">Login</Link></li>}
            {!hideAuthButtons && !isLoggedIn && (
              <li>
                <Link
                  to="/signup"
                  className="block text-white bg-blue-600 px-3 py-1 rounded"
                >
                  Sign Up
                </Link>
              </li>
            )}
            {/* Mobile Logout visible if logged in */}
            {isLoggedIn && (
              <li>
                <button
                  onClick={handleLogout}
                  className="block text-white bg-red-600 px-3 py-1 rounded"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
