import React from 'react';
import "../style/Order.css";
import "../style/CartModal.css";
import "../style/Home.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faCheckCircle, faClock, faTruck } from '@fortawesome/free-solid-svg-icons';

import logoImage from '../assets/Logo.png';
import { useOrder } from '../OrderContext';

const Order = () => {
  const { orders } = useOrder();

  const handleBackHome = () => {
    window.history.back();
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return <FontAwesomeIcon icon={faCheckCircle} className="status-icon completed" />;
      case 'shipped':
        return <FontAwesomeIcon icon={faTruck} className="status-icon shipped" />;
      default:
        return <FontAwesomeIcon icon={faClock} className="status-icon processing" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? 'Unknown Date' : date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="cart-shop-container">
      <div className="orderContainer">
        <div className="shop-container">
          <div className="home-wrapper">
            {/* Header */}
            <header className="header-cover">
              <div className="logoContainer">
                <img src={logoImage} alt="HelpingHand Logo" className="logoLarge" />
              </div>
              <div className="back-button-container">
                <button className="home-btn-cart" onClick={handleBackHome}>BACK TO HOME</button>
              </div>
            </header>

            {/* Orders Section */}
            <div className="cart">
              <div className="order-banner">
                <FontAwesomeIcon icon={faBagShopping} className="order-icon" />
                <h1 className="order-banner-text">My Orders</h1>
              </div>

              <div className="ordersLabel">Order History</div>

              {orders.length === 0 ? (
                <div className="empty-order-container">
                  <p className="empty-cart-text">You haven't placed any orders yet.</p>
                  <button className="shop-now-btn" onClick={handleBackHome}>Shop Now</button>
                </div>
              ) : (
                <div className="orders-grid">
                  {orders.map((order, index) => (
                    <div className="order-card" key={order.id || index}>
                      {/* Order Header */}
                      <div className="order-header">
                        <div className="order-meta">
                          <span className="order-date">{formatDate(order.date)}</span>
                          <span className="order-id">
                            Order #{(order.id?.toString().slice(-6)) || '000000'}
                          </span>
                        </div>
                        <div className="order-status">
                          {getStatusIcon(order.status)}
                          <span className={`status-text ${order.status?.toLowerCase() || 'processing'}`}>
                            {order.status || 'Processing'}
                          </span>
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="order-product">
                        <img
                          src={order.product?.image || 'https://via.placeholder.com/100'}
                          alt={order.product?.name || 'Product Image'}
                          className="order-product-image"
                        />
                        <div className="order-product-details">
                          <h3 className="order-product-name">{order.product?.name || 'Unnamed Product'}</h3>
                          <p className="order-product-seller">Seller: {order.product?.seller || 'N/A'}</p>
                          <p className="order-product-quantity">Quantity: {order.quantity || 1}</p>
                        </div>
                      </div>

                      {/* Payment Summary */}
                      <div className="order-summary">
                        <div className="order-payment-method">
                          Payment: {order.paymentMethod || 'N/A'}
                          {order.paymentReference && (
                            <span className="payment-reference">(Ref: {order.paymentReference})</span>
                          )}
                        </div>
                        <div className="order-total">
                          Total: ₱{order.total?.toFixed(2) || '0.00'}
                        </div>
                      </div>

                      {/* Delivery Address */}
                      <div className="order-address">
                        <strong>Delivery Address:</strong> {order.address || 'N/A'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
