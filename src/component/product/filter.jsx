import React, { useEffect, useState } from 'react';
import { useApi } from '../../Context.js';

const Filter = ({ onCategorySelect }) => {
  const { fetchCategories } = useApi();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const data = await fetchCategories();
      setCategories(data);
      setLoading(false);
    };

    getCategories();
  }, [fetchCategories]);

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center mt-5">
        <i className="fas fa-spin fa-spinner fs-1 text-success"></i>
      </div>
      ) : (
        <select className="form-select" onChange={(e) => onCategorySelect(e.target.value)}>
          <option value="">All Categories</option>
          {categories?.categories?.map(category => (
            <option key={category._id} value={category._id}>{category.Name}</option>
          ))}
        </select>
      )}
    </>
  );
};

export default Filter;
