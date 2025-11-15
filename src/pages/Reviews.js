import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getReviews, createReview, getGame } from '../api/api';
import './Reviews.css';

function Reviews() {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [game, setGame] = useState(null);
  const [newReview, setNewReview] = useState({ title: '', content: '', rating: 1 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGame();
    fetchReviews();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchGame = async () => {
    try {
      const response = await getGame(id);
      setGame(response.data);
    } catch (err) {
      console.error('Error fetching game:', err);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await getReviews(id);
      setReviews(response.data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createReview({ ...newReview, gameId: id });
      setNewReview({ title: '', content: '', rating: '' });
      fetchReviews();
    } catch (err) {
      console.error('Error creating review:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prev => ({ ...prev, [name]: value }));
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="container">
      {game && (
        <div className="game-header">
          <h2>Reseñas de {game.title}</h2>
          {game.coverImage && <img src={game.coverImage} alt={game.title} className="game-cover" />}
        </div>
      )}

      <div className="reviews-section">
        <h3>Agregar Reseña</h3>
        <form onSubmit={handleSubmit} className="review-form">
          <input
            type="text"
            name="title"
            placeholder="Título de la reseña"
            value={newReview.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="content"
            placeholder="Contenido de la reseña"
            value={newReview.content}
            onChange={handleChange}
            required
          />
          <select name="rating" value={newReview.rating} onChange={handleChange}>
            {[1,2,3,4,5,6,7,8,9,10].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
          <button type="submit">Publicar Reseña</button>
        </form>
      </div>

      <div className="reviews-list">
        <h3>Reseñas ({reviews.length})</h3>
        {reviews.length === 0 ? (
          <p>No hay reseñas aún.</p>
        ) : (
          reviews.map(review => (
            <div key={review._id} className="review-card">
              <h4>{review.title}</h4>
              <p>{review.content}</p>
              <p>Rating: ⭐ {review.rating}/10</p>
              <small>{new Date(review.createdAt).toLocaleDateString()}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Reviews;
