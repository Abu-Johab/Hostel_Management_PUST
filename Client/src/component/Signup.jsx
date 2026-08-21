import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";  // Import Firebase auth instance
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";  // Firebase function for signup
import dormImage from "../assets/pust_photo.jpg"; // Dormitory Image

const SignUp = () => {
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password
  const navigate = useNavigate(); // Navigate to other pages

  // Handle the signup form submission
  const submitSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!"); // If passwords do not match
      return;
    }

    try {
      // Firebase signup logic
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send verification email
      await sendEmailVerification(user);

      alert("Verification email sent! Please check your inbox.");
      navigate("/login"); // Redirect to the login page after successful signup
    } catch (error) {
      alert("Error signing up: " + error.message); // Show error message if signup fails
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gray-100">
      {/* Dormitory Image */}
      <div className="hidden md:flex items-center justify-center bg-blue-900">
        <img src={dormImage} alt="Dormitory" className="w-4/5 rounded-lg shadow-lg" />
      </div>

      {/* Signup Form */}
      <div className="flex flex-col items-center justify-center px-6 py-10 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Create Your Hostel Account
          </h2>
          <form onSubmit={submitSignup} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Handle email input change
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Handle password input change
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} // Handle confirm password input change
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Log In
            </Link>
          </p>

          <div className="text-center mt-6">
            <Link to="/" className="text-sm text-gray-500 hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
