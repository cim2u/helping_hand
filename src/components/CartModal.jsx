import React, { useRef } from 'react';
import PaymentConfirmationModal from './PaymentConfirmationModal';
import '../style/CartModal.css';
import { useNavigate } from "react-router-dom";
import logoImage from '../assets/Logo.png';
import { useCart } from '../CartContext';

const CartModal = () => {
  const navigate = useNavigate();
  const paymentModalRef = useRef();
  const { cartItems, increment, decrement } = useCart();

  const handleBuyNow = (productId) => {
    const product = cartItems.find(item => item.id === productId);
    if (paymentModalRef.current) {
      paymentModalRef.current.openModal(product);
    }
  };

  const handleBackHome = () => {
    navigate("/home");
  };

  return (
    <>
      <div className="shop-container">
        <div className="home-wrapper">
          <header className="header-cover">
            <div className="logoContainer">
              <img src={logoImage} alt="HelpingHand Logo" className="logoLarge" />
            </div>
          </header>

          <div className="cart">
            <div className="back-button-container" onClick={handleBackHome}>
              <button className="home-btn-cart">BACK TO HOME</button>
            </div>

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
              <button
                className="qty-btn-cart"
                onClick={() => increment(item.id)}
              >
                +
              </button>
            </div>
          </div>

          <button
            className="buy-now-btn-cart"
            onClick={() => handleBuyNow(item.id)}
          >
            BUY NOW
          </button>
        </div>
      </div>
    ))}
  </div>
)}

          </div>
        </div>
      </div>

      {/* Payment Confirmation Modal */}
      <PaymentConfirmationModal ref={paymentModalRef} />
    </>
  );
};

export default CartModal;
