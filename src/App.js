import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import GameLibrary from './pages/GameLibrary';
import GameForm from './pages/GameForm';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Reviews from './pages/Reviews';
import AllReviews from './pages/AllReviews';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute><GameLibrary /></ProtectedRoute>} />
          <Route path="/add-game" element={<ProtectedRoute><GameForm /></ProtectedRoute>} />
          <Route path="/edit-game/:id" element={<ProtectedRoute><GameForm /></ProtectedRoute>} />
          <Route path="/game/:id/reviews" element={<ProtectedRoute><Reviews /></ProtectedRoute>} />
          <Route path="/all-reviews" element={<ProtectedRoute><AllReviews /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
