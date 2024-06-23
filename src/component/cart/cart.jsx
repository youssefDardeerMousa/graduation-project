import React, { useEffect, useState } from 'react';
import { useApi } from '../../Context';
import { useNavigate } from 'react-router-dom'; // import useNavigate for navigation
import './Cart.css';

const Cart = () => {
  const { fetchCart, updateCart, removeProductFromCart } = useApi();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cartCount, setCartCount } = useApi();
  const [updatingItemId, setUpdatingItemId] = useState(null);
  const [CartData, setCartData] = useState([]);
  const navigate = useNavigate(); // useNavigate hook for navigation
  
  useEffect(() => {
    const loadCart = async () => {
      setLoading(true);
      try {
        const response = await fetchCart(localStorage.getItem('SecritData'));
        setCartItems(response.results);
        setLoading(false);
        setCartCount(response.results.itemCounts.totalCount);
        setCartData([...response.results.subcategory, ...response.results.products]);
      } catch (error) {
        console.error('Failed to fetch cart:', error);
        setLoading(false);
      }
    };
    loadCart();
  }, [fetchCart, setCartCount]);

  const handleUpdateQuantity = async (productId, quantity) => {
    setUpdatingItemId(productId);
    try {
      const response = await updateCart(productId, quantity);
      if (response.success) {
        const updatedCart = await fetchCart(localStorage.getItem('SecritData'));
        setCartItems(updatedCart.results);
      } else {
        console.error('Failed to update cart:', response.message);
      }
    } catch (error) {
      console.error('Failed to update cart:', error);
    } finally {
      setUpdatingItemId(null);
    }
  };

  const handleIncreaseQuantity = async (productId, currentQuantity) => {
    const newQuantity = currentQuantity + 1;
    handleUpdateQuantity(productId, newQuantity);
  };

  const handleDecreaseQuantity = async (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      handleUpdateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = async (itemId, isProduct) => {
    setUpdatingItemId(itemId);
    try {
      const response = await removeProductFromCart(itemId);
      if (response.success) {
        const updatedCart = await fetchCart(localStorage.getItem('SecritData'));
        setCartItems(updatedCart.results);
        setCartCount(updatedCart.itemCounts.totalCount);

        if (!isProduct) {
          setCartItems(prevItems => ({
            ...prevItems,
            subcategory: prevItems.subcategory.filter(item => item.subcategoryId._id !== itemId)
          }));
        }
      } else {
        console.error('Failed to remove item from cart:', response.message);
      }
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
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

  if (CartData.length === 0) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center empty-cart-message">
        <i className="fas fa-shopping-cart fs-1 text-secondary mb-3"></i>
        <div className="text-center">Your cart is empty.</div>
      </div>
    );
  }

  const handleCheckout = () => {
    navigate('/order');
  };

  return (
    <div className="container">
      <h3 className="text-center my-5 fw-bold cartH">Shopping Cart</h3>
      <div className="row">
        {cartItems?.subcategory?.map((cartItem, index) => (
          <div key={index} className="col-lg-3 col-md-4 col-sm-6 my-3 mb-4">
            {cartItem.subcategoryId && (
              <div className="card">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <img
                      src={cartItem.subcategoryId.Image.Url}
                      className="w-100"
                      alt=""
                    />
                    <h5 className="card-title text-center text-success fw-bold">
                      {cartItem.subcategoryId.Name}
                    </h5>
                    <p className="card-text text-center text-success fw-bold">
                      Quantity: {cartItem.quantity}
                    </p>
                    <p className="card-text text-center text-success fw-bold">
                      Old Price: {cartItem.subcategoryId.price} EG
                    </p>
                    <p className="card-text text-center text-success fw-bold">
                      New Price: {cartItem.subcategoryId.finalPrice} EG
                    </p>
                    <p className="card-text text-center text-success fw-bold">
                      discount: {cartItem.subcategoryId.discount} %
                    </p>
                  </div>
                  <div>
                    <button
                      className="btn btn-outline-success btn-sm me-2"
                      onClick={() =>
                        handleIncreaseQuantity(
                          cartItem.subcategoryId._id,
                          cartItem.quantity
                        )
                      }
                      disabled={updatingItemId === cartItem.subcategoryId._id}
                    >
                      +
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() =>
                        handleDecreaseQuantity(
                          cartItem.subcategoryId._id,
                          cartItem.quantity
                        )
                      }
                      disabled={updatingItemId === cartItem.subcategoryId._id}
                    >
                      -
                    </button>
                    <button
                      className="btn btn-outline-secondary btn-sm ms-2"
                      onClick={() =>
                        handleRemoveItem(cartItem.subcategoryId._id, false)
                      }
                      disabled={updatingItemId === cartItem.subcategoryId._id}
                    >
                      {updatingItemId === cartItem.subcategoryId._id ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        "Remove"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {cartItems?.products?.map((cartItem, index) => (
          <div key={index} className="col-lg-3 col-md-4 col-sm-6 my-3 mb-4">
            {cartItem.productId && (
              <div className="card shadow-sm cardItem">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <img
                      src={cartItem.productId.defaultImage.url}
                      className="w-100"
                      alt=""
                    />
                    <p className="card-title text-center cartTitle">
                      {cartItem.productId.Name}
                    </p>

                    <p className="card-text text-center  cartDetails">
                      Old Price:{" "}
                      <div className="cartItem">
                        {cartItem.productId.finalPrice}
                        EG
                      </div>{" "}
                    </p>
                    <p className="card-text text-center  cartDetails">
                      New Price:{" "}
                      <div className="cartItem">
                        {cartItem.productId.finalPrice}
                        EG
                      </div>{" "}
                    </p>
                    <p className="card-text text-center  cartDetails">
                      discount:{" "}
                      <div className="cartItem">
                        {cartItem.productId.discount}%
                      </div>{" "}
                    </p>
                  </div>
                  <div>
                    <button
                      className="btn btn-outline-success btn-sm me-2"
                      onClick={() =>
                        handleIncreaseQuantity(
                          cartItem.productId._id,
                          cartItem.quantity
                        )
                      }
                      disabled={updatingItemId === cartItem.productId._id}
                    >
                      +
                    </button>
                    <p className="card-text text-center fw-bold d-inline">
                      {cartItem.quantity}
                    </p>
                    <button
                      className="btn btn-outline-success btn-sm ms-2"
                      onClick={() =>
                        handleDecreaseQuantity(
                          cartItem.productId._id,
                          cartItem.quantity
                        )
                      }
                      disabled={updatingItemId === cartItem.productId._id}
                    >
                      -
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm ms-2 d-block removeBtn"
                      onClick={() =>
                        handleRemoveItem(cartItem.productId._id, true)
                      }
                      disabled={updatingItemId === cartItem.productId._id}
                    >
                      {updatingItemId === cartItem.productId._id ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        "Remove"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="d-flex flex-column align-items-center my-5">
        <h5 className=" summary">Cart Summary</h5>
        <table className="table table-bordered mt-3">
          <tbody>
            <tr>
              <td>Payment Price</td>
              <td>{cartItems.Paymentprice} EG</td>
            </tr>
            <tr>
              <td>Product Count</td>
              <td>{cartItems.itemCounts?.productCount}</td>
            </tr>
            <tr>
              <td>Subcategory Count</td>
              <td>{cartItems.itemCounts?.subcategoryCount}</td>
            </tr>
            <tr>
              <td className="total">Total Count</td>
              <td className="total">{cartItems.itemCounts?.totalCount}</td>
            </tr>
          </tbody>
        </table>
        <p className="checkText">Now It is The Time To Check Out</p>
        <button
          className="btn btn-outline-secondary my-3 btn-sm ms-2 checkBtn"
          onClick={handleCheckout}
        >
          Checkout
          <i className="fa-solid fa-arrow-right ms-3"></i>
        </button>
      </div>
    </div>
  );
};

export default Cart;
