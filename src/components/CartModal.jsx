import React, { useRef } from 'react';
import PaymentConfirmationModal from './PaymentConfirmationModal';
import '../style/CartModal.css';

const CartModal = () => {
  const paymentModalRef = useRef();

  const handleBuyNow = () => {
    if (paymentModalRef.current) {
      paymentModalRef.current.open();
    }
  };

  return (
    <>
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
            src=""
            alt="Ribbon Keychain"
          />
          <div className="product-details">
            <h2 className="product-name">Ribbon Keychain</h2>
            <p className="seller-name">Seller: Sissy Shey</p>
            <p className="quantity">Quantity:</p>
            {/* Dropdown can be added here if needed */}
            <button className="buy-now-btn" onClick={handleBuyNow}>
              BUY NOW
            </button>
          </div>
        </div>
      </div>

      <PaymentConfirmationModal ref={paymentModalRef} />
    </>
  );
};

export default CartModal;
