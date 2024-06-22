import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

// Create a Context for the API
const ApiContext = createContext();

// Create a provider component
export const ApiProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  

  useEffect(() => {
    setAuthToken();
    // Fetch cart count from local storage on component mount
    const initialCartCount = localStorage.getItem('cartCount') || 0;
    setCartCount(Number(initialCartCount));
    fetchWishlistCount();
  }, []);

  useEffect(() => {
    // Save cart count to local storage whenever it changes
    // localStorage.setItem('cartCount', cartCount);
  }, [cartCount]);

  const setAuthToken = () => {
    const storedToken = localStorage.getItem('SecritData');
    setToken(storedToken);
  };

  const fetchAllProducts = async () => {
    const response = await axios.get('https://clean-green-agriculture.vercel.app/product', {
      headers: {
        token: `CleanAndGreen_${token}`,
      },
    });
    return response.data;
  };

  const fetchCategories = async () => {
    const response = await axios.get('https://clean-green-agriculture.vercel.app/category', {
      headers: {
        token: `CleanAndGreen_${token}`,
      },
    });
    return response.data;
  };

  const fetchSubcategoriesByCategoryId = async (categoryId) => {
    const response = await axios.get(`https://clean-green-agriculture.vercel.app/category/${categoryId}/subcategory`, {
      headers: {
        token: `CleanAndGreen_${token}`,
      },
    });
    return response.data;
  };

  const searchProductsByName = async (name) => {
    const response = await axios.get(`https://clean-green-agriculture.vercel.app/product/search/searchbyName?name=${name}`, {
      headers: {
        token: `CleanAndGreen_${token}`,
      },
    });
    return response.data;
  };

  const searchSubcategoriesByName = async (categoryId, name) => {
    const response = await axios.get(`https://clean-green-agriculture.vercel.app/category/${categoryId}/subcategory/search?name=${name}`, {
      headers: {
        token: `CleanAndGreen_${token}`,
      },
    });
    return response.data;
  };

  const fetchProductById = async (productId) => {
    try {
      const response = await axios.get(`https://clean-green-agriculture.vercel.app/product/${productId}`, {
        headers: {
          token: `CleanAndGreen_${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch product',
      };
    }
  };

  const fetchSubcategoryById = async (categoryId, subcategoryId) => {
    try {
      const response = await axios.get(`https://clean-green-agriculture.vercel.app/category/${categoryId}/subcategory/${subcategoryId}`, {
        headers: {
          token: `CleanAndGreen_${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch subcategory',
      };
    }
  };

  const addToCart = async (productId, quantity) => {
    try {
      const response = await axios.post('https://clean-green-agriculture.vercel.app/cart', {
        productId,
        quantity,
      }, {
        headers: {
          token: `CleanAndGreen_${token}`,
        },
      });
      if (response.data.success) {
        const newCartCount = cartCount + quantity;
        setCartCount(newCartCount);
        // Update local storage with new cart count
        localStorage.setItem('cartCount', newCartCount);
      }
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to add to cart',
      };
    }
  };

  const updateCart = async (productId, quantity) => {
    try {
      const response = await axios.patch(
        `https://clean-green-agriculture.vercel.app/cart`,
        {
          productId,
          quantity,
        },
        {
          headers: {
            token: `CleanAndGreen_${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update cart',
      };
    }
  };

  const removeProductFromCart = async (productId) => {
    const response = await axios.patch(`https://clean-green-agriculture.vercel.app/cart/${productId}`, {}, {
      headers: {
        token: `CleanAndGreen_${token}`,
      },
    });
    return response.data;
  };

  const clearCart = async () => {
    const response = await axios.patch(`https://clean-green-agriculture.vercel.app/cart/clear`, {}, {
      headers: {
        token: `CleanAndGreen_${token}`,
      },
    });
    return response.data;
  };

  const fetchCoupons = async () => {
    try {
      const response = await axios.get('https://clean-green-agriculture.vercel.app/coupon', {
        headers: {
          token: `CleanAndGreen_${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching coupons:', error);
      throw error;
    }
  };

  const createOrder = async (orderData) => {
    try {
      const response = await axios.post('https://clean-green-agriculture.vercel.app/order/createOrder', orderData, {
        headers: {
          token: `CleanAndGreen_${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const updateToken = (newToken) => {
    localStorage.setItem('SecritData', newToken);
    setToken(newToken);
  };

  const fetchCart = async (token) => {
    const response = await axios.get('https://clean-green-agriculture.vercel.app/cart', {
      headers: {
        token: `CleanAndGreen_${token}`,
      },
    });
    return response.data;
  };
  const fetchWishlistCount = async () => {
    try {
      const response = await axios.get('https://clean-green-agriculture.vercel.app/wishlist', {
        headers: {
          token: `CleanAndGreen_${localStorage.getItem('SecritData')}`,
        },
      });
      setWishlistCount(response.data.results.length);
    } catch (error) {
      console.error('Failed to fetch wishlist count:', error);
    }
  };

  const addToWishlist = async (id) => {
    try {
      console.log('Adding to wishlist, product ID:', id); // Log the ID to ensure it's correct
      const response = await axios.post('https://clean-green-agriculture.vercel.app/wishlist/add', {
        id,
      }, {
        headers: {
          token: `CleanAndGreen_${localStorage.getItem('SecritData')}`,
        },
      });
      if (response.data.success) {
        fetchWishlistCount();
      }
      console.log("response.data", response.data);
      return response.data;
    } catch (error) {
      console.error('Error adding to wishlist:', error.response?.data || error.message); // Improved logging
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to add to wishlist',
      };
    }
  };
  

  const removeFromWishlist = async (itemId) => {
    try {
      const response = await axios.patch('https://clean-green-agriculture.vercel.app/wishlist/remove', {
        itemId,
      }, {
        headers: {
          token: `CleanAndGreen_${localStorage.getItem('SecritData')}`,
        },
      });
      if (response.data.success) {
        fetchWishlistCount();
      }
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to remove from wishlist',
      };
    }
  };
  return (
    <ApiContext.Provider value={{
      setAuthToken,
      fetchAllProducts,
      fetchCategories,
      fetchSubcategoriesByCategoryId,
      searchProductsByName,
      searchSubcategoriesByName,
      fetchProductById,
      fetchSubcategoryById,
      addToCart,
      fetchCart,
      updateCart,
      removeProductFromCart,
      clearCart,
      fetchCoupons,
      createOrder,
      cartCount,
      token,
      setCartCount,
      updateToken,
      addToWishlist,
      removeFromWishlist,
      wishlistCount
    }}>
      {children}
    </ApiContext.Provider>
  );
};

// Custom hook to use the API context
export const useApi = () => {
  return useContext(ApiContext);
};
