import React, { useEffect, useState } from 'react';
import { useApi } from '../../Context';
import { useNavigate } from 'react-router-dom';
import './wishlist.css';

const Wishlist = () => {
  const { fetchWishlist, removeFromWishlist } = useApi();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { wishlistCount, setWishlistCount } = useApi();
  const [updatingItemId, setUpdatingItemId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadWishlist = async () => {
      setLoading(true);
      try {
        const response = await fetchWishlist(localStorage.getItem('SecritData'));
        setWishlistItems(response.results);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch wishlist:', error);
        setLoading(false);
      }
    };
    loadWishlist();
  }, [fetchWishlist]);

  const handleRemoveItem = async (itemId) => {
    setUpdatingItemId(itemId);
    try {
      const response = await removeFromWishlist(itemId);
      if (response.success) {
        const updatedWishlist = await fetchWishlist(localStorage.getItem('SecritData'));
        setWishlistItems(updatedWishlist.results);
        setWishlistCount(updatedWishlist.results.length);
      } else {
        console.error('Failed to remove item from wishlist:', response.message);
      }
    } catch (error) {
      console.error('Failed to remove item from wishlist:', error);
    } finally {
      setUpdatingItemId(null);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <i className="fas fa-spin fa-spinner fs-1 text-success"></i>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center empty-wishlist-message">
        <i className="fas fa-heart fs-1 text-secondary mb-3"></i>
        <div className="text-center">Your wishlist is empty.</div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        {wishlistItems.map((item) => (
          <div key={item._id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src={item.defaultImage.url}
                alt={item.Name}
                className="card-img-top"
                onClick={() => navigate(`/productdetails/${item._id}`)}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.Name}</h5>
                <button
                  className="btn btn-danger mt-auto"
                  onClick={() => handleRemoveItem(item._id)}
                  disabled={updatingItemId === item._id}
                >
                  {updatingItemId === item._id ? (
                    <i className="fas fa-spin fa-spinner"></i>
                  ) : (
                    <i className="fas fa-trash"></i>
                  )}
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
