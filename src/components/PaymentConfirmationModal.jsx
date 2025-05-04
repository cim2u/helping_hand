import React, { forwardRef, useImperativeHandle, useState } from 'react';
import '../style/PaymentConfirmation.css';

const PaymentConfirmationModal = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [quantity, setQuantity] = useState(1);

  const unitPrice = 250;
  const deliveryFee = 50;
  const subtotal = unitPrice * quantity;
  const total = subtotal + deliveryFee;

  useImperativeHandle(ref, () => ({
    open: () => setVisible(true),
    close: () => setVisible(false),
  }));

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };

  const handlePlaceOrder = () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    if (paymentMethod === 'Gcash') {
      // Redirect to GCash (replace with the actual GCash payment page URL)
      alert(`Order placed using ${paymentMethod}. You will be redirected to GCash.`);
      window.location.href = "https://www.gcash.com"; // Example URL for GCash, replace as needed
    } else {
      alert(`Order placed using ${paymentMethod}`);
    }

    setVisible(false);
  };

  const increaseQty = () => setQuantity(prev => prev + 1);
  const decreaseQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  if (!visible) return null;

  return (
    <div className="payment-overlay">
      <div className="payment-container">
        {/* Close Button */}
        <button className="payment-close-button" onClick={() => setVisible(false)}>×</button>

        {/* Address Section */}
        <div className="payment-address-section">
          <div className="payment-address-label">Delivery Address</div>
          <div className="payment-input-field">
            <input
              type="text"
              className="payment-input-value"
              placeholder="Enter your address"
            />
          </div>
        </div>

        {/* Purchase Details */}
        <div className="payment-purchase-details">
          <div className="payment-purchase-details-title">Purchase Details</div>
          <div className="payment-product-card">
            <div className="payment-product-image" />
            <div className="payment-product-info">
              <div className="payment-product-title">Ribbon Keychain</div>
              <div className="payment-product-seller">by Sissy Shey</div>
              <div className="payment-product-quantity">
                Quantity: 
                <button className="payment-qty-btn" onClick={decreaseQty}>−</button>
                <span className="payment-qty-value">{quantity}</span>
                <button className="payment-qty-btn" onClick={increaseQty}>+</button>
              </div>
            </div>
          </div>
        </div>

        {/* Order Option Dropdown */}
        <div className="payment-select-field">
          <div className="payment-select-box">
            <span className="payment-select-value">Delivery</span>
            <div className="payment-chevron-down"></div>
          </div>
        </div>

        {/* Summary */}
        <div className="payment-summary-text">
          <p>Subtotal: ₱{subtotal}</p>
          <p>Delivery Fee: ₱{deliveryFee}</p>
          <p><strong>Total: ₱{total}</strong></p>
        </div>

        {/* Payment Method */}
        <div className="payment-methods">
          <div className="payment-methods-title">Payment Method</div>
          <div className="checkbox-row">
            <input
              type="radio"
              name="payment"
              value="Gcash"
              checked={paymentMethod === 'Gcash'}
              onChange={() => handlePaymentChange('Gcash')}
              className="payment-checkbox"
            />
            <label className="payment-checkbox-label">Gcash</label>
          </div>
          <div className="payment-checkbox-row">
            <input
              type="radio"
              name="payment"
              value="Cash on Delivery"
              checked={paymentMethod === 'Cash on Delivery'}
              onChange={() => handlePaymentChange('Cash on Delivery')}
              className="payment-checkbox"
            />
            <label className="payment-checkbox-label">Cash on Delivery</label>
          </div>
        </div>

        {/* Place Order Button */}
        <div className="payment-order-button" onClick={handlePlaceOrder}>
          <span className="payment-order-button-text">Place Order</span>
        </div>
      </div>
    </div>
  );
});

export default PaymentConfirmationModal;
