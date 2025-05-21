import React, { forwardRef, useImperativeHandle, useState, useEffect, useRef } from 'react';
import '../style/PaymentConfirmation.css';
import '../style/Subscribe.css';

const PaymentConfirmationModal = forwardRef((props, ref) => {
  const {
    selectedProduct,
    userUploadedQR,
    userEmail,
    userName,
    onOrderSubmit, // Callback to send order data
    onClose        // Callback for clean modal close
  } = props;

  const [visible, setVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState('');
  const [showGcashModal, setShowGcashModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const confirmModalRef = useRef(null);
  const gcashModalRef = useRef(null);

  const [paymentData, setPaymentData] = useState({
    email: '',
    username: '',
    date: '',
    reference: '',
  });

  // Calculate pricing
  const unitPrice = selectedProduct?.price || 0;
  const deliveryFee = selectedProduct ? 50 : 0;
  const subtotal = unitPrice * quantity;
  const total = subtotal + deliveryFee;

  // Expose open/close modal methods to parent via ref
  useImperativeHandle(ref, () => ({
    openModal: () => setVisible(true),
    closeModal: () => handleCloseModal(),
  }));

  // Setup initial paymentData and handle outside clicks to close
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

  // Reset all modal states and notify parent
  const handleCloseModal = () => {
    setVisible(false);
    setShowGcashModal(false);
    setShowConfirmModal(false);
    setPaymentMethod('');
    setQuantity(1);
    setAddress('');
    if (onClose) onClose();
  };

  // User selects payment method
  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };

  // User clicks place order button
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
      setShowGcashModal(true);
    } else {
      submitOrder();
    }
  };

  // User confirms they've already paid via Gcash
  const handleAlreadyPaid = () => {
    setShowGcashModal(false);
    setShowConfirmModal(true);
  };

  // Submit order: build order data, simulate API call, notify parent
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
      paymentReference: paymentMethod === 'Gcash' ? paymentData.reference : 'N/A',
      customer: {
        email: paymentData.email,
        name: paymentData.username,
      },
      date: new Date().toISOString(),
      status: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Processing',
    };

    // For debugging, you can uncomment:
    // console.log('Submitting order:', orderData);

    // Simulate API call delay
    setTimeout(() => {
      if (onOrderSubmit) {
        onOrderSubmit(orderData);
      }
      setIsSubmitting(false);
      alert('Order placed successfully!');
      handleCloseModal();
    }, 1000);
  };

  // Handle confirm payment button in confirmation modal
  const handleSubmitPayment = () => {
    if (paymentMethod === 'Gcash' && !paymentData.reference.trim()) {
      alert('Please enter your GCash reference number.');
      return;
    }
    submitOrder();
  };

  // Close confirm payment modal
  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
  };

  // Close Gcash modal
  const handleCloseGcashModal = () => {
    setShowGcashModal(false);
  };

  // Increase quantity (minimum 1)
  const increaseQty = () => setQuantity((prev) => prev + 1);
  // Decrease quantity (minimum 1)
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (!visible) return null;

  return (
    <div className="payment-overlay">
      <div className="payment-container">
        <button className="payment-close-button" onClick={handleCloseModal}>
          ×
        </button>

        {/* Delivery Address Input */}
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

        {/* Product Details */}
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
                <button className="payment-qty-btn" onClick={decreaseQty}>
                  −
                </button>
                <span className="payment-qty-value">{quantity}</span>
                <button className="payment-qty-btn" onClick={increaseQty}>
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="payment-summary-text">
          <p>Price: ₱{unitPrice.toFixed(2)}</p>
          <p>Delivery Fee: ₱{deliveryFee.toFixed(2)}</p>
          <p>Quantity: {quantity}</p>
          <p>
            <strong>Total Payment: ₱{total.toFixed(2)}</strong>
          </p>
        </div>

        {/* Payment Method Selection */}
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
            <label htmlFor="gcash" className="payment-checkbox-label">
              Gcash
            </label>
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
            <label htmlFor="cod" className="payment-checkbox-label">
              Cash on Delivery
            </label>
          </div>
        </div>

        {/* Place Order Button */}
        <button
          className="payment-order-button"
          onClick={handlePlaceOrder}
          disabled={isSubmitting}
        >
          <span className="payment-order-button-text">
            {isSubmitting ? 'Processing...' : 'Place Order'}
          </span>
        </button>

        {/* GCash Modal */}
        {showGcashModal && (
          <div className="modal-gcash">
            <div className="modal-gcash-container" ref={gcashModalRef}>
              <h2>GCash Payment</h2>
              <p>Total Amount: ₱{total.toFixed(2)}</p>
              <p>Scan the QR code below to pay.</p>

              {userUploadedQR ? (
                <img src={userUploadedQR} alt="User uploaded GCash QR" className="gcash-qr" />
              ) : (
                <img
                  src="/default-gcash-qr.png"
                  alt="Default GCash QR"
                  className="gcash-qr"
                />
              )}

              <div className="gcash-modal-buttons">
                <button
                  onClick={handleAlreadyPaid}
                  className="already-paid-button-gcash"
                >
                  I Already Paid
                </button>
                <button
                  onClick={handleCloseGcashModal}
                  className="close-button-gcash"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Confirm Payment Modal */}
        {showConfirmModal && (
          <div className="modal-confrim-subscribe">
            <div className="modal-confirm-container-subscribe" ref={confirmModalRef}>
              <h2 className="modal-confrim-title-subscribe">Confirm Your Payment</h2>
              <p className="payment-confirm-amount">Amount Paid: ₱{total.toFixed(2)}</p>

              <div className="payment-confirm-fields">
                <input
                  type="email"
                  placeholder="Email"
                  value={paymentData.email}
                  onChange={(e) => setPaymentData({ ...paymentData, email: e.target.value })}
                  className="modal-input-subscribe"
                  required
                />
                <input
                  type="text"
                  placeholder="Username"
                  value={paymentData.username}
                  onChange={(e) => setPaymentData({ ...paymentData, username: e.target.value })}
                  className="modal-input-subscribe"
                  required
                />
                <input
                  type="date"
                  value={paymentData.date}
                  readOnly
                  className="modal-input-subscribe"
                />
                <input
                  type="text"
                  placeholder="GCash Reference Number"
                  value={paymentData.reference}
                  onChange={(e) => setPaymentData({ ...paymentData, reference: e.target.value })}
                  className="modal-input-subscribe"
                  required
                />
              </div>

              <div className="payment-confirm-buttons">
                <button
                  className="confirm-payment-button"
                  onClick={handleSubmitPayment}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Confirm Payment'}
                </button>
                <button
                  className="cancel-payment-button"
                  onClick={handleCloseConfirmModal}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default PaymentConfirmationModal;
