import React, { useState, useEffect } from 'react';
import { createGame, updateGame, getGame } from '../api/api';
import { useParams, useNavigate } from 'react-router-dom';
import './GameForm.css';

function GameForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    platform: '',
    rating: "",
    hoursPlayed:"" ,
    status: 'pendiente',
    coverImage: ''
  });

  useEffect(() => {
    if (id) {
      fetchGame();
    }
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchGame = async () => {
    try {
      const response = await getGame(id);
      setFormData(response.data);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateGame(id, formData);
      } else {
        await createGame(formData);
      }
      navigate('/');
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="container">
      <h2>{id ? 'Editar Juego' : 'Agregar Nuevo Juego'}</h2>
      <form onSubmit={handleSubmit} className="form">
        <input type="text" name="title" placeholder="Título del juego" value={formData.title} onChange={handleChange} required />
        <input type="text" name="genre" placeholder="Género" value={formData.genre} onChange={handleChange} />
        <input type="text" name="platform" placeholder="Plataforma" value={formData.platform} onChange={handleChange} />
        <input type="number" name="rating" min="0" max="10" placeholder="Rating" value={formData.rating} onChange={handleChange} />
        <input type="number" name="hoursPlayed" min="0" placeholder="Horas jugadas" value={formData.hoursPlayed} onChange={handleChange} />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="pendiente">Pendiente</option>
          <option value="jugando">Jugando</option>
          <option value="completado">Completado</option>
        </select>
        <input type="url" name="coverImage" placeholder="URL de la imagen de portada" value={formData.coverImage} onChange={handleChange} />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}

export default GameForm;
