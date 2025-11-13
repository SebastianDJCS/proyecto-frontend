import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import GameLibrary from './pages/GameLibrary';
import GameForm from './pages/GameForm';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<GameLibrary />} />
        <Route path="/add-game" element={<GameForm />} />
        <Route path="/edit-game/:id" element={<GameForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
