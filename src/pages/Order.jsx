import React from 'react';
import "../style/Order.css";
import "../style/CartModal.css";
import "../style/Home.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';

import logoImage from '../assets/Logo.png'; // Update the path if needed

const Order = () => {
  const handleBackHome = () => {
    // You can replace this with actual navigation logic
    window.history.back();
  };

  return (
    <div className="cart-shop-container">
    <div className="orderContainer">
      {/* Header Image and Logo */}
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
          

          {/* Back Button */}
          <div className="cart">
           
          </div>
        </div>
      </div>

    <div className="order-banner">
  <FontAwesomeIcon icon={faBagShopping} className="order-icon" />
  <h1 className="order-banner-text">Orders</h1>
</div>


      {/* Orders Label */}
      <div className="ordersLabel">Orders</div>

      {/* Order Item 1 */}
      <div className="orderItem" style={{ top: '382px' }}>
        <div
          className="orderImage"
          style={{ backgroundImage: 'url("484966389_666914819395756_5237641564430598218_n.jpg")' }}
        />
        <div className="orderDescription">
          Flower Seller: Sissy Shey<br />
          Quantity: 1<br />
          Total: ₱50
        </div>
      </div>

      {/* Order Item 2 */}
      <div className="orderItem" style={{ top: '542px' }}>
        <div
          className="orderImage"
          style={{ backgroundImage: 'url("485083742_673045595101672_5844131352349017864_n.jpg")' }}
        />
        <div className="orderDescription">
          Flower Seller: Sissy Shey<br />
          Quantity: 1<br />
          Total: ₱50
        </div>
      </div>

      {/* Underline Text */}
      <div className="underlineText">See more orders</div>
    </div>
    </div>
  );
};

export default Order;
