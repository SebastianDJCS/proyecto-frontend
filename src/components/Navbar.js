import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <h1>🎮 GameTracker</h1>
      <ul>
        <li><Link to="/">Biblioteca</Link></li>
        <li><Link to="/add-game">Agregar Juego</Link></li>
        <li><Link to="/dashboard">Estadísticas</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
