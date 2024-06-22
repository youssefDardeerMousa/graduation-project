import React, { useEffect, useState } from 'react';
import { useApi } from '../../Context.js';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const { fetchAllProducts } = useApi();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const data = await fetchAllProducts();
      setProducts(data);
      setLoading(false);
    };

    getProducts();
  }, [fetchAllProducts]);

  if (loading) {
    return <div className="d-flex justify-content-center mt-5">
    <i className="fas fa-spin fa-spinner fs-1 text-success"></i>
  </div>
  }

  if (!products.results) {
    return <div>No products found</div>;
  }

  return (
    <div className="container">
      <div className="row">
        {products?.results?.map(product => (
          <div key={product._id} className="col-md-3">
            <div className="card">
              <img src={product?.defaultImage?.url} className="card-img-top" alt={product.Name} />
              <div className="card-body">
                <h5 className="card-title">{product.Name}</h5>
                <p className="card-text">{product.price} EG</p>
                <Link to="/" className="btn btn-primary bg-success">Add to Cart</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
