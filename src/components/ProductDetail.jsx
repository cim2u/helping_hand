import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

// ProductDetail Component
const ProductDetail = ({ product, onClose }) => {
  return (
    <div className="product-details-modal">
      <div className="modal-content-details">
        <FontAwesomeIcon
          icon={faTimes}
          className="close-modal-details"
          onClick={onClose}
        />
        <img
          src={product.imageUrl || "default-image.jpg"}
          alt={product.name}
          className="product-image-details"
        />
        <h2 className="product-title-details">{product.name}</h2>
        <p className="product-description-details">{product.description}</p>
        <div className="product-price-details">{product.price}</div>
        <button className="buy-button-details">Buy Now</button>
        <button className="cancel-button-details" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

// MyShop Component
const MyShop = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Sample product data
  const sampleProduct = {
    name: "Ribbon Keychain",
    price: "₱ 50",
    description: "A beautiful ribbon keychain for your keys.",
    imageUrl: "https://link-to-image.com/product.jpg",
  };

  return (
    <div className="shop-container">
      <div
        className="product-item-details"
        onClick={() => handleProductClick(sampleProduct)}
      >
        <img
          src={sampleProduct.imageUrl}
          alt={sampleProduct.name}
          className="product-image-details"
        />
        <div className="product-name-details">{sampleProduct.name}</div>
      </div>

      {isModalOpen && selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default MyShop;
