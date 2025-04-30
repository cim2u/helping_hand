import React from 'react';
import '../style/CartModal.css'; // if you're using the CSS directly

const CartModal = () => {
  return (
    <div className="cart">
      <div className="header">
        <div className="logo">
          <h1 className="helping">Helping</h1>
          <h1 className="hand">Hand</h1>
        </div>
        <button className="subscribe-btn">SUBSCRIBE</button>
      </div>

      <div className="product-card">
        <img
          className="product-img"
          src="484589002_2153466115094869_6556585425154466136_n.jpg"
          alt="Ribbon Keychain"
        />
        <div className="product-details">
          <h2 className="product-name">Ribbon Keychain</h2>
          <p className="seller-name">Seller: Sissy Shey</p>
          <p className="quantity">Quantity:</p>
          {/* Select dropdown can go here */}
          <button className="buy-now-btn">BUY NOW</button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
