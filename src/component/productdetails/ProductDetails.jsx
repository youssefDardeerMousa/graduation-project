import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '../../Context';
import './productdetails.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductDetails = () => {
  const { id, categoryId } = useParams();
  const { fetchProductById, fetchSubcategoryById, addToCart, addToWishlist } = useApi();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let result;
        if (categoryId) {
          result = await fetchSubcategoryById(categoryId, id);
          if (result.success === false) {
            throw new Error(result.message);
          }
          setMainImage(result.results?.Image?.Url);
        } else {
          result = await fetchProductById(id);
          if (result.success === false) {
            throw new Error(result.message);
          }
          setMainImage(result.results?.defaultImage?.url);
        }
        setProduct(result.results);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
      setLoading(false);
    };
    fetchData();
  }, [id, categoryId, fetchProductById, fetchSubcategoryById]);

  const handleAddToCart = async () => {
    setAddingToCart(true);
    const response = await addToCart(id, quantity);
    if (response.success) {
      navigate('/cart');
    } else {
      setError(response.message);
    }
    setAddingToCart(false);
  };

  const handleAddToWishlist = async () => {
    setWishlistLoading(true);
    try {
      const response = await addToWishlist(id);
      if (!response.success) {
        setError(response.message);
      }
      navigate('/wishlist');
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
      setError('Failed to add to wishlist');
    } finally {
      setWishlistLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <i className="fas fa-spin fa-spinner fs-1 text-success"></i>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

  if (!product) {
    return <div>No data available</div>;
  }

  const { Name, description, availableItems, price, finalPrice, discount, soldItems, images } = product;

  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + change));
  };

  return (
    <div className="product-details-container container">
      <h3 className="text-center  detailsText">Product Details</h3>
      <div className="row product-details">
        <div className="col-lg-6 image-section text-center">
          <div className="main-image mb-4">
            <img src={mainImage} alt={Name} className="img-fluid w-100" />
          </div>
          <div className="sub-images my-3 d-flex justify-content-center">
            {images?.map((img, index) => (
              <img
                key={index}
                src={img.url || img.Url}
                alt={`${Name} ${index}`}
                onClick={() => setMainImage(img.url || img.Url)}
                className="img-thumbnail mx-2 w-100"
              />
            ))}
          </div>
        </div>
        <div className="col-lg-6 product-info border p-4 shadow detailCart">
          <h2 className="mb-3 detailsCartHead">{Name}</h2>
          <p className="price ">
            Old price:{" "}
            <div className="cartText">
              {price ? `${price} EG` : "No price available"}
            </div>
          </p>
          <p className="price ">
            New price:{" "}
            <div className="cartText">
              {finalPrice ? `${finalPrice} EG` : "No price available"}
            </div>
          </p>
          {discount && (
            <p className="discount ">
              Discount: <div className="cartText">{discount}%</div>
            </p>
          )}
          <p className="availability ">
            Availability:{" "}
            <div className="cartText">
              {availableItems > 0 ? "Available" : "Not Available"}
            </div>
          </p>
          <p className="stock ">
            In stock: <div className="cartText">{availableItems} units</div>
          </p>
          <p className="sold ">
            Sold: <div className="cartText">{soldItems} units</div>
          </p>

          <div className="quantity my-3 ">
            <label htmlFor="quantity" className="form-label quantity">
              Quantity:{" "}
            </label>
            <div className="input-group quantityInput">
              <button
                className="btn btn-outline-success"
                type="button"
                onClick={() => handleQuantityChange(-1)}
              >
                -
              </button>
              <input
                type="text"
                className="form-control text-center text-success fw-bold qInput"
                value={quantity}
                readOnly
              />
              <button
                className="btn btn-outline-success"
                type="button"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </button>
            </div>
          </div>
          <div className="d-flex justify-content-center flex-column align-items-center">
            <button
              className="btn detailCartBtn w-75"
              onClick={handleAddToCart}
              disabled={addingToCart}
            >
              {addingToCart ? "Loading..." : "Add to Cart"}
            </button>
            <button
              className="btn detailCartBtn w-75"
              onClick={handleAddToWishlist}
              disabled={wishlistLoading}
            >
              {wishlistLoading ? "Adding to Wishlist..." : "Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>
      <p className="description ">
        <div className="text-center desc">Description</div>{" "}
        <p className="descP shadow-sm">{description}</p>
      </p>
    </div>
  );
};

export default ProductDetails;
