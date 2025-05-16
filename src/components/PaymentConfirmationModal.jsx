  import React, { forwardRef, useImperativeHandle, useState, useEffect, useRef } from 'react';
  import '../style/PaymentConfirmation.css';
  import '../style/Subscribe.css';

  const PaymentConfirmationModal = forwardRef((props, ref) => {
    const { selectedProduct, userUploadedQR } = props; // QR image passed from parent

    const [visible, setVisible] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [address, setAddress] = useState('');
    const [showGcashModal, setShowGcashModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const confirmModalRef = useRef(null);
    const gcashModalRef = useRef(null);

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
      closeModal: () => setVisible(false),
    }));

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (event.target.classList.contains('payment-overlay')) {
          setVisible(false);
          setShowGcashModal(false);
          setShowConfirmModal(false);
        }
      };

      if (visible) {
        document.addEventListener('click', handleClickOutside);
      }

      const today = new Date().toISOString().split('T')[0];
      setPaymentData((prev) => ({ ...prev, date: today }));

      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, [visible]);

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
        setShowGcashModal(true);
      } else {
        alert(`Order placed using ${paymentMethod}`);
        setVisible(false);
      }
    };

    const handleAlreadyPaid = () => {
      setShowGcashModal(false);
      setShowConfirmModal(true);
    };

    const handleSubmitPayment = () => {
      console.log('Payment submitted:', paymentData);
      alert('GCash payment submitted successfully!');
      setVisible(false);
      setShowConfirmModal(false);
    };

    const handleCloseConfirmModal = () => {
      setShowConfirmModal(false);
    };

    const handleCloseGcashModal = () => {
      setShowGcashModal(false);
    };

    const increaseQty = () => setQuantity((prev) => prev + 1);
    const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    if (!visible) return null;

    return (
      <div className="payment-overlay">
        <div className="payment-container">
          <button className="payment-close-button" onClick={() => setVisible(false)}>
            ×
          </button>

          {/* Address Input */}
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
            <p>Price ₱{unitPrice}</p>
            <p>Delivery Fee: ₱{deliveryFee}</p>
            <p>
              <strong>Total Payment: ₱{total}</strong>
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

          {/* Place Order */}
          <div className="payment-order-button" onClick={handlePlaceOrder}>
            <span className="payment-order-button-text">Place Order</span>
          </div>

            {/* GCash Modal */}
            {showGcashModal && (
              <div className="modal-gcash">
                <div className="modal-gcash-container" ref={gcashModalRef}>
                  <h2>GCash Payment</h2>
                  <p>Scan the QR code below to pay.</p>

                  {userUploadedQR ? (
                    <img src={userUploadedQR} alt="User uploaded GCash QR" className="gcash-qr" />
                  ) : (
                    <img
                      src="/default-gcash-qr.png" // Replace with your default GCash QR image path
                      alt="Default GCash QR"
                      className="gcash-qr"
                    />
                  )}

                  <button onClick={handleAlreadyPaid} className="already-paid-button-gcash">
                    Already Paid
                  </button>
                  <button onClick={handleCloseGcashModal} className="close-button-gcash">
                    Close
                  </button>
                </div>
              </div>
            )}

          {/* Confirm Modal */}
          {showConfirmModal && (
            <div className="modal-confrim-subscribe">
              <div className="modal-confirm-container-subscribe" ref={confirmModalRef}>
                <h2 className="modal-confrim-title-subscribe">Confirm Your Payment</h2>

                <input
                  type="email"
                  placeholder="Email"
                  value={paymentData.email}
                  onChange={(e) => setPaymentData({ ...paymentData, email: e.target.value })}
                  className="modal-input-subscribe"
                />
                <input
                  type="text"
                  placeholder="Username"
                  value={paymentData.username}
                  onChange={(e) => setPaymentData({ ...paymentData, username: e.target.value })}
                  className="modal-input-subscribe"
                />
                <input type="date" value={paymentData.date} readOnly className="modal-input-subscribe" />
                <input
                  type="text"
                  placeholder="GCash Reference Number"
                  value={paymentData.reference}
                  onChange={(e) => setPaymentData({ ...paymentData, reference: e.target.value })}
                  className="modal-input-subscribe"
                />

                <button className="modal-confrim-button-subscribe" onClick={handleSubmitPayment}>
                  Submit
                </button>
                <button className="close-button-gcash" onClick={handleCloseConfirmModal}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  });

  export default PaymentConfirmationModal;
