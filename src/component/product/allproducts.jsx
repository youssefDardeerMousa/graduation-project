import React, { useState, useEffect } from 'react';
import { useApi } from '../../Context.js';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate
import Search from './search.jsx';
import "./allproducts.css";

const Allproducts = () => {
  const { fetchAllProducts, fetchCategories, fetchSubcategoriesByCategoryId, searchProductsByName, searchSubcategoriesByName } = useApi();
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();  // Initialize navigate

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchAllProducts();
        setItems(data.results);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
      setLoading(false);
    };

    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    getProducts();
    getCategories();
  }, [fetchAllProducts, fetchCategories]);

  const handleCategorySelect = async (categoryId) => {
    setSelectedCategoryId(categoryId);
    setLoading(true);
    try {
      if (categoryId) {
        const data = await fetchSubcategoriesByCategoryId(categoryId);
        setItems(data.results);
      } else {
        const data = await fetchAllProducts();
        setItems(data.results);
      }
    } catch (error) {
      console.error('Error fetching subcategories or products:', error);
    }
    setLoading(false);
  };

  const handleSearch = async (searchTerm) => {
    setLoading(true);
    try {
      let data;
      if (selectedCategoryId) {
        data = await searchSubcategoriesByName(selectedCategoryId, searchTerm);
        setItems(data.subcategories);
      } else {
        data = await searchProductsByName(searchTerm);
        setItems(data.results);
      }
    } catch (error) {
      console.error('Error searching products or subcategories:', error);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1 className="my-4">Our Available Products</h1>
      <Search onSearch={handleSearch} />
      <div className="mb-3">
        <select className="form-select" onChange={(e) => handleCategorySelect(e.target.value)}>
          <option value="">All Categories</option>
          {categories?.map(category => (
            <option key={category._id} value={category._id}>{category.Name}</option>
          ))}
        </select>
      </div>
      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <i className="fas fa-spin fa-spinner fs-1 text-success"></i>
        </div>
      ) : (
        <div className="card-container">
          {items?.map(item => (
            <div key={item._id} className="col-lg-3 col-md-4 col-sm-6 my-3">
              <div className="card">
                <img src={item.defaultImage?.url || item.Image?.Url} className="card-img-top" alt={item.Name} />
                <div className="card-body">
                  <h5 className="card-title text-center">{item.Name}</h5>
                  <p className="card-text text-center text-success fw-bold">{item.price ? `${item.price} EG` : 'No price available'}</p>
                  <div className="d-flex justify-content-center">
                    <Link
                      to={selectedCategoryId ? `/category/${selectedCategoryId}/subcategory/${item._id}` : `/product/${item._id}`}
                      className="btn btn-success"
                    >
                      Choose This {selectedCategoryId ? 'Subcategory' : 'Product'}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Allproducts;
