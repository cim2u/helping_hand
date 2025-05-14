import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/Subscribe.css';
import logo from "../assets/Logo.png";

const Subscribe = () => {
  const [showModal, setShowModal] = useState(false);
  const [showGcashModal, setShowGcashModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [paymentData, setPaymentData] = useState({
    email: '',
    username: '',
    date: '',
    reference: '',
    screenshot: null
  });

  const modalRef = useRef(null);
  const gcashModalRef = useRef(null);
  const confirmModalRef = useRef(null);

  const handleSubscribeClick = () => {
    setShowModal(true);
  };

  const handleProceedToPayment = () => {
    setShowModal(false);
    setShowGcashModal(true);
  };

  const handleAlreadyPaid = () => {
    setShowConfirmModal(true);
  };

  const handleCloseGcashModal = () => {
    setShowGcashModal(false);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
  };

  // Close modals when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
      if (gcashModalRef.current && !gcashModalRef.current.contains(event.target)) {
        setShowGcashModal(false);
      }
      if (confirmModalRef.current && !confirmModalRef.current.contains(event.target)) {
        setShowConfirmModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="subscribe-container-subscribe">
      {/* Navigation */}
     
      <div className="headerSupport"></div>
        <div className="headerImageSupport"></div>

        <div className="logoContainerSupport">
          <img
            src="https://i.imgur.com/GT5CDSQ.png"

            alt="logo"
            className="logoSupport"
          />
          <div className="logo-container">
            <img src={logo} alt="HelpingHand Logo" className="logo" />
          </div>
        </div>
      <div className="nav-container">
        <nav className="nav-links-h">
          <Link to="/about">About</Link>
          <Link to="/support">Support</Link>
          <Link to="/">Home</Link>
        </nav>
      </div>

      {/* Subscription Info */}
      <div className="card-container-subscribe" />
      <div className="premium-badge-subscribe" />
      <div className="premium-text-subscribe">Premium</div>
      <div className="price-subscribe">₱100</div>
      <div className="per-month-subscribe">per month</div>
      <div className="features-subscribe">
        Customizable Themes<br />
        Prioritized Support<br />
        Loyalty Points<br />
        Display Badges
      </div>
      <div className="divider-top-subscribe" />
      <div className="divider-bottom-subscribe" />

      <button className="subscribe-button-subscribe" onClick={handleSubscribeClick}>
        Subscribe
      </button>
      <div className="gcash-note-subscribe">Pay through GCash</div>
      <div className="heading-subscribe">Subscribe to HELPINGHand!</div>
      <div className="thank-you-message-subscribe">
        Stay tuned for more updates! THANK YOU for supporting HelpingHand.
      </div>

      {/* First Modal: Proceed to Payment */}
      {showModal && (
        <div className="modal-subscribe">
          <div className="modal-container-subscribe" ref={modalRef}>
            <div className="modal-content-subscribe">
              <h2 className="modal-title-subscribe">Are you sure?</h2>
              <button className="modal-button-subscribe" onClick={handleProceedToPayment}>
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GCash Modal */}
      {showGcashModal && (
        <div className="modal-gcash">
          <div className="modal-gcash-container" ref={gcashModalRef}>
            <h2>GCash Payment</h2>
            <p>Scan the QR code below or enter your GCash details to proceed.</p>
            <img
              src="http://i.imgur.com/CFxWTCz.png"
              alt="GCash QR"
              className="gcash-qr"
            />
            <br />
            <button onClick={handleAlreadyPaid} className="already-paid-button-gcash">
              Already Paid
            </button>
            <button onClick={handleCloseGcashModal} className="close-button-gcash">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
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
            <input
              type="date"
              value={paymentData.date}
              onChange={(e) => setPaymentData({ ...paymentData, date: e.target.value })}
              className="modal-input-subscribe"
            />
            <input
              type="text"
              placeholder="GCash Reference Number"
              value={paymentData.reference}
              onChange={(e) => setPaymentData({ ...paymentData, reference: e.target.value })}
              className="modal-input-subscribe"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPaymentData({ ...paymentData, screenshot: e.target.files[0] })}
              className="modal-input-subscribe"
            />

            <button
              className="modal-confrim-button-subscribe"
              onClick={() => {
                console.log("Submitted Payment:", paymentData);
                alert("Thank you! Your payment will be verified by admin.");
                setShowConfirmModal(false);
                setShowGcashModal(false);
              }}
            >
              Submit
            </button>
            <button className="close-button-gcash" onClick={handleCloseConfirmModal}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscribe;
