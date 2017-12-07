import React from 'react';
import { Link } from 'react-router-dom';

const ProductList = ({ products }) => {
  return (
    <div>
      <p>
        <Link className="btn btn-primary" to="/products/new">
          <span className="glyphicon glyphicon-plus" />
        </Link>
      </p>
      <div className="list-group">
        {products.map(product => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="list-group-item"
          >
            {product.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
