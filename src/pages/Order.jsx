import React from 'react';
import "../style/Order.css";
import "../style/CartModal.css";
import "../style/Home.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../CartContext'; // Added useCart

import logoImage from '../assets/Logo.png';

const Order = () => {
  const { cartItems, decrement } = useCart();

  const handleBackHome = () => {
    window.history.back();
  };

  return (
    <div className="cart-shop-container">
      <div className="orderContainer">
        {/* Header */}
        <div className="shop-container">
          <div className="home-wrapper">
            <header className="header-cover">
              <div className="logoContainer">
                <img src={logoImage} alt="HelpingHand Logo" className="logoLarge" />
              </div>
              <div className="back-button-container" onClick={handleBackHome}>
                <button className="home-btn-cart">BACK TO HOME</button>
              </div>
            </header>

            <div className="cart">
              <div className="order-banner">
                <FontAwesomeIcon icon={faBagShopping} className="order-icon" />
                <h1 className="order-banner-text">Orders</h1>
              </div>

              <div className="ordersLabel">Orders</div>

              {cartItems.length === 0 ? (
                <p className="empty-cart-text">Your cart is empty.</p>
              ) : (
                <div className="cart-grid">
                  {cartItems.map((item) => (
                    <div className="product-card-cart" key={item.id}>
                      <div className="product-image-border">
                        <img
                          className="product-img-cart"
                          src={item.imageUrl || 'https://via.placeholder.com/100'}
                          alt={item.name}
                        />
                      </div>

                      <div className="product-details-cart">
                        <h2 className="product-name-cart">{item.name}</h2>
                        <p className="seller-name-cart">Seller: {item.seller}</p>
                        <p className="product-price-cart">Price: ₱{item.price?.toFixed(2)}</p>
                        <p className="product-total-cart">
                          Total: ₱{(item.price * item.quantity).toFixed(2)}
                        </p>

                        <div className="quantity-wrapper-cart">
                          <p className="quantity-label-cart">Quantity:</p>
                          <div className="quantity-counter-cart">
                            <button
                              className="qty-btn-cart"
                              onClick={() => decrement(item.id)}
                            >
                              –
                            </button>
                            <span className="qty-display-cart">{item.quantity}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="underlineText">See more orders</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
