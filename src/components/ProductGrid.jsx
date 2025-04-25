import React from 'react';
import '../style/ProductGrid.css';

const ProductGrid = ({ products }) => {
  return (
    <div className="frame-20-home">
      <div className="group-55-home">
        {products && products.length > 0 ? (
          products.map((product, index) => (
            <div className="product-card-home" key={index}>
              <img
                src={product.image}
                alt={product.name}
                className="product-image-home"
              />
              <div className="product-title-home">{product.name}</div>
              <div className="product-description-home">{product.description}</div>
            </div>
          ))
        ) : (
          <p className="no-products-home">No products available.</p>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
