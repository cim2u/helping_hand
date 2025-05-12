// components/ProductList.jsx
import React from 'react';
import "../style/MyShop.css"

const ProductList = ({ handleProductClick }) => {
  const products = [
    {
      name: "Ribbon Keychain",
      image: "https://i.imgur.com/YP2DSeS.png",
      price: 15.0,
      seller: "Sissy Shyey.",
    },
    {
      name: "Ukay-Ukay",
      image: "https://i.imgur.com/v1VcOJ8.jpeg",
      price: 20.0,
      description: "Reusable eco-friendly tote bag.",
    },
    {
      name: "Handmade Flower Bouquet",
      image: "https://i.imgur.com/mLTxJQf.png",
      price: 18.0,
      description: "Handcrafted notebook made from recycled materials.",
    },
    {
      name: "Handmade Flower Bouquet",
      image: "https://i.imgur.com/Tc4gW95.png",
      price: 12.0,
      description: "Set of 4 wooden coasters with a rustic feel.",
    },
  ];

  return (
    <div className="product1-grid">
      {products.map((product, index) => (
        <div
          key={index}
          className="product-item"
          onClick={() => handleProductClick(product)}
        >
          <img src={product.image} alt={product.name} className="product-image" />
          <div className="product-name">{product.name}</div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
