import React, { useEffect, useState } from 'react';
import { useApi } from '../../Context';
import { useNavigate } from 'react-router-dom';
import './wishlist.css';

const Wishlist = () => {
  const { removeFromWishlist, fetchWishlistCount, wishlistCount, setWishlistCount, addToCart } = useApi();
  const [wishlistItems, setWishlistItems] = useState({ subcategories: [], products: [] });
  const [loading, setLoading] = useState(true);
  const [removingItemId, setRemovingItemId] = useState(null);
  const [addingToCartItemId, setAddingToCartItemId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadWishlist = async () => {
      setLoading(true);
      try {
        const response = await fetchWishlistCount();
        console.log("response", response);
        setWishlistItems(response.wishlist);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch wishlist:', error);
        setLoading(false);
      }
    };
    loadWishlist();
  }, [fetchWishlistCount]);

  

  const handleAddToCart = async (itemId) => {
    setAddingToCartItemId(itemId); // Set updating state for the specific item
    try {
      console.log('Adding to cart, item ID:', itemId);
      const response = await addToCart(itemId, 1);
      if (response.success) {
        navigate('/cart'); // Navigate to cart on successful addition
      } else {
        console.error('Failed to add item to cart:', response.message);
      }
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    } finally {
      setAddingToCartItemId(null); // Reset updating state
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <i className="fas fa-spin fa-spinner fs-1 text-success"></i>
      </div>
    );
  }

  if (wishlistItems.subcategories.length === 0 && wishlistItems.products.length === 0) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center empty-wishlist-message">
        <i className="fas fa-heart fs-1 text-secondary mb-3"></i>
        <div className="text-center">Your wishlist is empty.</div>
      </div>
    );
  }

  return (
    <div className="row">
      {wishlistItems.subcategories.map((cartItem, index) => (
        <div key={index} className="col-lg-3 col-md-4 col-sm-6 my-3 mb-4">
          {cartItem.subcategoryId && (
            <div className="card">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <img src={cartItem.subcategoryId.Image.Url} className='w-100' alt="" />
                  <h5 className="card-title text-center text-success fw-bold">{cartItem.subcategoryId.Name}</h5>
                  <p className="card-text text-center text-success fw-bold">Old Price: {cartItem.subcategoryId.price} EG</p>
                  <p className="card-text text-center text-success fw-bold">New Price: {cartItem.subcategoryId.finalPrice} EG</p>
                  <p className="card-text text-center text-success fw-bold">discount: {cartItem.subcategoryId.discount} %</p>
                </div>
                <div className="d-flex justify-content-between w-100 mt-3">
 
                  <button
                    className="btn btn-success mx-auto"
                    onClick={() => handleAddToCart(cartItem.subcategoryId._id)}
                    disabled={addingToCartItemId === cartItem.subcategoryId._id}
                  >
                    {addingToCartItemId === cartItem.subcategoryId._id ? (
                      <i className='fas fa-spinner fa-spin fs-4 text-dark'></i>
                    ) : (
                      'Add to Cart'
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {wishlistItems.products.map((cartItem, index) => (
        <div key={index} className="col-lg-3 col-md-4 col-sm-6 my-3 mb-4">
          {cartItem.productId && (
            <div className="card">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <img src={cartItem.productId.defaultImage.url} className='w-100' alt="" />
                  <h5 className="card-title text-center text-success fw-bold">{cartItem.productId.Name}</h5>
                  <p className="card-text text-center text-success fw-bold">Old Price: {cartItem.productId.finalPrice} EG</p>
                  <p className="card-text text-center text-success fw-bold">New Price: {cartItem.productId.finalPrice} EG</p>
                  <p className="card-text text-center text-success fw-bold">discount: {cartItem.productId.discount} %</p>
                </div>
                <div className="d-flex justify-content-between w-100 mt-3">
 
                  <button
                    className="btn btn-success mx-auto"
                    onClick={() => handleAddToCart(cartItem.productId._id)}
                    disabled={addingToCartItemId === cartItem.productId._id}
                  >
                    {addingToCartItemId === cartItem.productId._id ? (
                      <i className='fas fa-spinner fa-spin fs-4 text-dark'></i>
                    ) : (
                      'Add to Cart'
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
