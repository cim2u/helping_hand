import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import '../style/PaymentConfirmation.css';

const PaymentConfirmationModal = forwardRef((props, ref) => {
  const { selectedProduct } = props;
  const [visible, setVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState('');

  const unitPrice = selectedProduct?.price || 0;
  const deliveryFee = selectedProduct ? 50 : 0; // If there is a product, set delivery fee to 50, otherwise 0
  const subtotal = unitPrice * quantity;
  const total = subtotal + deliveryFee;

  useImperativeHandle(ref, () => ({
    openModal: () => setVisible(true),
    closeModal: () => setVisible(false),
  }));

  useEffect(() => {
    // Close modal when clicking outside of it
    const handleClickOutside = (event) => {
      if (event.target.classList.contains('payment-overlay')) {
        setVisible(false);
      }
    };

    if (visible) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [visible]);

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };

  const handlePlaceOrder = () => {
    if (!address.trim()) {
      alert("Please enter your delivery address.");
      return;
    }

    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    if (paymentMethod === 'Gcash') {
      alert(`Order placed using ${paymentMethod}. You will be redirected to GCash.`);
      window.location.href = "https://www.gcash.com";
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
        <button className="payment-close-button" onClick={() => setVisible(false)}>×</button>
        <div className="payment1"></div>
        <div className="payment2"></div>
        {/* Address Section */}
        <div className="payment-address-section">
          <div className="payment-address-label">Delivery Address</div>
          <div className="payment-input-field">
            <input
              type="text"
              className="payment-input-value"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        {/* Purchase Details */}
        <div className="payment-purchase-details">
          <div className="payment-purchase-details-title">Purchase Details</div>
          <div className="payment-product-card">
            {selectedProduct?.image ? (
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="payment-product-image"
              />
            ) : (
              <div className="payment-product-image-placeholder">No Image</div>
            )}

            <div className="payment-product-info">
              <div className="payment-product-title">{selectedProduct?.name || "Unknown Product"}</div>
              <div className="payment-product-seller">by {selectedProduct?.seller || "Unknown Seller"}</div>
              <div className="payment-product-quantity">
                Quantity:
                <button className="payment-qty-btn" onClick={decreaseQty}>−</button>
                <span className="payment-qty-value">{quantity}</span>
                <button className="payment-qty-btn" onClick={increaseQty}>+</button>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="payment-summary-text">
          <p>Price ₱{unitPrice}</p>
          <p>Shipping Fee: ₱{deliveryFee}</p>
          <p><strong>Total Payment: ₱{total}</strong></p>
        </div>

        {/* Payment Method */}
        <div className="payment-methods">
          <div className="payment-methods-title">Payment Method</div>

          <div className="payment-checkbox-row">
            <input
              type="radio"
              id="gcash"
              name="payment"
              value="Gcash"
              checked={paymentMethod === 'Gcash'}
              onChange={() => handlePaymentChange('Gcash')}
              className="payment-checkbox"
            />
            <label htmlFor="gcash" className="payment-checkbox-label">Gcash</label>
          </div>

          <div className="payment-checkbox-row">
            <input
              type="radio"
              id="cod"
              name="payment"
              value="Cash on Delivery"
              checked={paymentMethod === 'Cash on Delivery'}
              onChange={() => handlePaymentChange('Cash on Delivery')}
              className="payment-checkbox"
            />
            <label htmlFor="cod" className="payment-checkbox-label">Cash on Delivery</label>
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
