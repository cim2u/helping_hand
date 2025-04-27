import React from 'react';

const ProductGrid = ({ products }) => {
  return (
    <div style={{ position: 'relative', display: 'flex', gap: '40px', padding: '40px' }}>
      {products.length > 0 ? (
        products.map((product, index) => (
          <div
            key={index}
            style={{
              position: 'relative',
              width: '220px',
              height: '260px',
              background: '#FEFEFE',
              border: '2px solid rgba(30, 30, 30, 0.65)',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              borderRadius: '16px',
              padding: '10px',
            }}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{
                position: 'absolute',
                width: '170px',
                height: '170px',
                left: '25px',
                top: '30px',
                border: '2px solid rgba(30, 30, 30, 0.65)',
                borderRadius: '16px',
                objectFit: 'cover',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '220px',
                left: '32px',
                width: '155px',
                height: '20px',
                fontFamily: 'Outfit',
                fontWeight: '700',
                fontSize: '20px',
                lineHeight: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                letterSpacing: '0.1px',
                color: '#7E3550',
                textAlign: 'center',
              }}
            >
              {product.name}
            </div>
          </div>
        ))
      ) : (
        <div>No products available</div>
      )}
    </div>
  );
};

export default ProductGrid;
