import React, { useRef, useState } from 'react';
import PaymentConfirmationModal from './PaymentConfirmationModal';
import '../style/CartModal.css';
import { useNavigate } from "react-router-dom";
import logoImage from '../assets/Logo.png'; // Ensure this path is correct

const CartModal = () => {
  const navigate = useNavigate(); 
  const paymentModalRef = useRef();
  const [cartItems, setCartItems] = useState([
    {
      id: 1, // Unique ID for the product
      name: 'Ribbon Keychain',
      seller: 'Sissy Shey',
      imageUrl: '', // Add actual image URL here
      quantity: 1,
      price: 10.0, // Example price
    },
  ]);

  // Handle adding a product to the cart (increment quantity)
  const increment = (productId) => {
    setCartItems(prevItems => prevItems.map(item =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  // Handle removing a product from the cart (decrement quantity)
  const decrement = (productId) => {
    setCartItems(prevItems => prevItems.map(item =>
      item.id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  };

  // Handle "Buy Now" button click (pass the product info to the payment modal)
  const handleBuyNow = (productId) => {
    const product = cartItems.find(item => item.id === productId);
    
    // Pass product details to PaymentConfirmationModal
    if (paymentModalRef.current) {
      paymentModalRef.current.open(product); // Open payment modal and pass product details
    }
  };

  const handleBackHome = () => {
    navigate("/");
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
            <div className="header-cart">
             
            </div>

            <div className="back-button-container"onClick={handleBackHome}>
              <button className="home-btn-cart">BACK TO HOME</button>
            </div>

            {/* Loop through cartItems */}
            {cartItems.map((item) => (
              <div className="product-card-cart" key={item.id}>
                <div className="product-image-border">
                  <img
                    className="product-img-cart"
                    src={item.imageUrl} // Add actual image URL
                    alt={item.name}
                  />
                </div>

                <div className="product-details-cart">
                  <h2 className="product-name-cart">{item.name}</h2>
                  <p className="seller-name-cart">Seller: {item.seller}</p>

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
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentConfirmationModal ref={paymentModalRef} />
    </>
  );
};

export default CartModal;
