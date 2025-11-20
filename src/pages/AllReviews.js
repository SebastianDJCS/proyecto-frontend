import React, { useState, useEffect } from 'react';
import { getAllReviews } from '../api/api';
import './AllReviews.css';

function AllReviews() {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllReviews();
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredReviews(reviews);
    } else {
      const filtered = reviews.filter(review =>
        review.gameId.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredReviews(filtered);
    }
  }, [searchTerm, reviews]);

  const fetchAllReviews = async () => {
    try {
      const response = await getAllReviews();
      setReviews(response.data);
      setFilteredReviews(response.data);
    } catch (err) {
      console.error('Error fetching all reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="container">
      <h2>Todas las Reseñas</h2>

      <div className="search-section">
        <input
          type="text"
          placeholder="Buscar por título del juego..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      <div className="reviews-list">
        {filteredReviews.length === 0 ? (
          <p>No hay reseñas para mostrar.</p>
        ) : (
          filteredReviews.map(review => (
            <div key={review._id} className="review-card">
              <h4>{review.title}</h4>
              <p><strong>Juego:</strong> {review.gameId?.title || '—'}</p>
              <p>{review.content}</p>
              <p>Rating: ⭐ {review.rating}/10</p>
              <p><strong>Usuario:</strong> {review.userId?.username || 'Anónimo'}</p>
              <small>{new Date(review.createdAt).toLocaleDateString()}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AllReviews;
