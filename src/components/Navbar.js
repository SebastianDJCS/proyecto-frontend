import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h1>🎮 GameTracker</h1>
      <ul>
        {user ? (
          <>
            <li><Link to="/">Biblioteca</Link></li>
            <li><Link to="/add-game">Agregar Juego</Link></li>
            <li><Link to="/all-reviews">Todas las Reseñas</Link></li>
            <li><Link to="/dashboard">Estadísticas</Link></li>
            <li><span>Hola, {user.username}</span></li>
            <li><button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Iniciar Sesión</Link></li>
            <li><Link to="/register">Registrarse</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
