import React, { useState, useEffect } from 'react';
import { getGames, deleteGame } from '../api/api';
import { Link } from 'react-router-dom';
import './GameLibrary.css';

function GameLibrary() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await getGames();
      setGames(response.data);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar juego?')) {
      await deleteGame(id);
      setGames(games.filter(g => g._id !== id));
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="container">
      <h2>Mi Biblioteca de Juegos</h2>
      <div className="games-grid">
        {games.map(game => (
          <div key={game._id} className="game-card">
            <h3>{game.title}</h3>
            <p>Género: {game.genre}</p>
            <p>Plataforma: {game.platform}</p>
            <p>Rating: ⭐ {game.rating}/10</p>
            <p>Horas jugadas: {game.hoursPlayed}h</p>
            <p>Estado: {game.status}</p>
            <Link to={`/edit-game/${game._id}`}><button>Editar</button></Link>
            <button onClick={() => handleDelete(game._id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameLibrary;
