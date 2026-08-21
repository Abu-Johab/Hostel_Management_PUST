import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './component/Login.jsx';
import Signup from './component/Signup.jsx';
import HomePage from './pages/HomePage.jsx';
import Rooms from './pages/Rooms.jsx';
import StudentApplyForm from './pages/StudentApply.jsx';
import './App.css';
import UserProfile from './pages/UserProfile.jsx';
import Notice from './pages/Notice.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminLogin from './pages/AdminLogin.jsx';

function App() {
  return (
    <Routes>
      {/* default route -> home */}
      <Route path="/" element={<Navigate to="/home" replace />} />

      <Route path="/home" element={<HomePage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/rooms" element={<Rooms />} />
      <Route path="/apply" element={<StudentApplyForm />} />
      <Route path="/user" element={<UserProfile />} />
      <Route path="/notice" element={<Notice />} />
      <Route path="/loginadmin" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminDashboard />} />

      {/* fallback */}
      <Route path="*" element={<div style={{padding:20}}>404 — Not Found</div>} />
    </Routes>
  );
}

export default App;