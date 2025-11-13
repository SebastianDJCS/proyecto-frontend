import React, { useState, useEffect } from 'react';
import { getGames } from '../api/api';
import './Dashboard.css';

function Dashboard() {
  const [stats, setStats] = useState({
    totalGames: 0,
    totalHours: 0,
    averageRating: 0,
    completed: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await getGames();
      const games = response.data;
      
      const totalHours = games.reduce((sum, g) => sum + g.hoursPlayed, 0);
      const avgRating = games.length > 0 ? (games.reduce((sum, g) => sum + g.rating, 0) / games.length).toFixed(2) : 0;
      const completed = games.filter(g => g.status === 'completado').length;

      setStats({
        totalGames: games.length,
        totalHours,
        averageRating: avgRating,
        completed
      });
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="container">
      <h2>📊 Dashboard de Estadísticas</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total de Juegos</h3>
          <p className="stat-value">{stats.totalGames}</p>
        </div>
        <div className="stat-card">
          <h3>Horas Jugadas</h3>
          <p className="stat-value">{stats.totalHours}h</p>
        </div>
        <div className="stat-card">
          <h3>Rating Promedio</h3>
          <p className="stat-value">⭐ {stats.averageRating}</p>
        </div>
        <div className="stat-card">
          <h3>Juegos Completados</h3>
          <p className="stat-value">{stats.completed}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
