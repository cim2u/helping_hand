import React, { forwardRef, useImperativeHandle, useState, useEffect, useRef } from 'react';
import '../style/PaymentConfirmation.css';
import '../style/Subscribe.css';

const PaymentConfirmationModal = forwardRef((props, ref) => {
  const {
    selectedProduct,
    userEmail,
    userName,
    onOrderSubmit,
    onClose,
  } = props;

  const [visible, setVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const confirmModalRef = useRef(null);

  const [paymentData, setPaymentData] = useState({
    email: '',
    username: '',
    date: '',
    reference: '',
  });

  const unitPrice = selectedProduct?.price || 0;
  const deliveryFee = selectedProduct ? 50 : 0;
  const subtotal = unitPrice * quantity;
  const total = subtotal + deliveryFee;

  useImperativeHandle(ref, () => ({
    openModal: () => setVisible(true),
    closeModal: () => handleCloseModal(),
  }));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains('payment-overlay')) {
        handleCloseModal();
      }
    };

    if (visible) {
      document.addEventListener('click', handleClickOutside);
      const today = new Date().toISOString().split('T')[0];
      setPaymentData({
        email: userEmail || '',
        username: userName || '',
        date: today,
        reference: '',
      });
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [visible, userEmail, userName]);

  const handleCloseModal = () => {
    setVisible(false);
    setShowConfirmModal(false);
    setPaymentMethod('');
    setQuantity(1);
    setAddress('');
    if (onClose) onClose();
  };

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };

  const handlePlaceOrder = () => {
    if (!address.trim()) {
      alert('Please enter your delivery address.');
      return;
    }

    if (!paymentMethod) {
      alert('Please select a payment method.');
      return;
    }

    if (paymentMethod === 'Gcash') {
      initiateGcashPayment();
    } else {
      submitOrder();
    }
  };

  const initiateGcashPayment = async () => {
    setIsSubmitting(true);

    const orderPayload = {
      product: selectedProduct,
      quantity,
      unitPrice,
      deliveryFee,
      total,
      address,
      customer: {
        email: userEmail,
        name: userName,
      },
    };

    try {
      const response = await fetch('http://localhost:8000/api/initiate-gcash-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      const data = await response.json();

      if (data.redirect_url) {
        window.location.href = data.redirect_url;
      } else {
        alert('Failed to start GCash payment. Please try again.');
      }
    } catch (error) {
      console.error('GCash payment error:', error);
      alert('Error initiating GCash payment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitOrder = () => {
    setIsSubmitting(true);

    const orderData = {
      id: Date.now().toString(),
      product: {
        ...selectedProduct,
        image: selectedProduct?.image || '/default-product.png',
      },
      quantity,
      unitPrice,
      deliveryFee,
      total,
      address,
      paymentMethod,
      paymentReference: 'N/A',
      customer: {
        email: paymentData.email,
        name: paymentData.username,
      },
      date: new Date().toISOString(),
      status: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Processing',
    };

    setTimeout(() => {
      if (onOrderSubmit) {
        onOrderSubmit(orderData);
      }
      setIsSubmitting(false);
      alert('Order placed successfully!');
      handleCloseModal();
    }, 1000);
  };

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (!visible) return null;

  return (
    <div className="payment-overlay">
      <div className="payment-container">
        <button className="payment-close-button" onClick={handleCloseModal}>×</button>

        {/* Address */}
        <div className="payment-address-section">
          <div className="payment-address-label">Delivery Address</div>
          <div className="payment-input-field">
            <input
              type="text"
              className="payment-input-value"
              placeholder="Enter your complete address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Product */}
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
              <div className="payment-product-title">{selectedProduct?.name || 'Unknown Product'}</div>
              <div className="payment-product-seller">by {selectedProduct?.seller || 'Unknown Seller'}</div>
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
          <p>Price: ₱{unitPrice.toFixed(2)}</p>
          <p>Delivery Fee: ₱{deliveryFee.toFixed(2)}</p>
          <p>Quantity: {quantity}</p>
          <p><strong>Total Payment: ₱{total.toFixed(2)}</strong></p>
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

        {/* Place Order */}
        <button
          className="payment-order-button"
          onClick={handlePlaceOrder}
          disabled={isSubmitting}
        >
          <span className="payment-order-button-text">
            {isSubmitting ? 'Processing...' : 'Place Order'}
          </span>
        </button>
      </div>
    </div>
  );
});

export default PaymentConfirmationModal;
