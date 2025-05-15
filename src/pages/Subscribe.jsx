import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Subscribe.css';
import logo from "../assets/Logo.png";

const Subscribe = () => {
  const [showModal, setShowModal] = useState(false);
  const [showGcashModal, setShowGcashModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const navigate = useNavigate();

  const [paymentData, setPaymentData] = useState({
    email: '',
    username: '',
    date: new Date().toISOString().split('T')[0],
    reference: '',
    screenshot: null
  });

  const modalRef = useRef(null);
  const gcashModalRef = useRef(null);
  const confirmModalRef = useRef(null);

  const handleSubscribeClick = () => setShowModal(true);
  const handleProceedToPayment = () => {
    setShowModal(false);
    setShowGcashModal(true);
  };
  const handleAlreadyPaid = () => setShowConfirmModal(true);
  const handleCloseGcashModal = () => setShowGcashModal(false);
  const handleCloseConfirmModal = () => setShowConfirmModal(false);

  // Close modals when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) setShowModal(false);
      if (gcashModalRef.current && !gcashModalRef.current.contains(event.target)) setShowGcashModal(false);
      if (confirmModalRef.current && !confirmModalRef.current.contains(event.target)) setShowConfirmModal(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmitPayment = () => {
    const { email, username, date, reference, screenshot } = paymentData;

    if (!email || !username || !reference || !screenshot) {
      alert("You need to fill out all required fields to proceed.");
      return;
    }

    // Simulated upload to admin dashboard (replace this with backend call)
    console.log("Payment submitted to admin:", paymentData);

    alert("Thank you! Your payment will be verified by admin.");
    localStorage.setItem('isSubscribed', 'true'); // Store subscription status

    // Reset form and close modals
    setShowConfirmModal(false);
    setShowGcashModal(false);
    setPaymentData({
      email: '',
      username: '',
      date: new Date().toISOString().split('T')[0],
      reference: '',
      screenshot: null
    });

    navigate('/home'); // Redirect to Home after submission
  };

  return (
    <div className="subscribe-container-subscribe">
      {/* Header */}
      <div className="headerSupport" />
      <div className="headerImageSupport" />
      <div className="logoContainerSupport">
        <img src="https://i.imgur.com/GT5CDSQ.png" alt="logo" className="logoSupport" />
        <div className="logo-container">
          <img src={logo} alt="HelpingHand Logo" className="logo" />
        </div>
      </div>

      {/* Navigation */}
      <div className="nav-container">
        <nav className="nav-links-h">
          <Link to="/about">About</Link>
          <Link to="/support">Support</Link>
          <Link to="/home">Home</Link>
        </nav>
      </div>

      {/* Subscription Card */}
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

      {/* Subscribe Button */}
      <button className="subscribe-button-subscribe" onClick={handleSubscribeClick}>
        Subscribe
      </button>
      <div className="gcash-note-subscribe">Pay through GCash</div>
      <div className="heading-subscribe">Subscribe to HELPINGHand!</div>
      <div className="thank-you-message-subscribe">
        Stay tuned for more updates! THANK YOU for supporting HelpingHand.
      </div>

      {/* First Modal */}
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
            <img src="http://i.imgur.com/CFxWTCz.png" alt="GCash QR" className="gcash-qr" />
            <br />
            <button onClick={handleAlreadyPaid} className="already-paid-button-gcash">Already Paid</button>
            <button onClick={handleCloseGcashModal} className="close-button-gcash">Close</button>
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
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPaymentData({ ...paymentData, screenshot: e.target.files[0] })}
              className="modal-input-subscribe"
            />

            <button
              className="modal-confrim-button-subscribe"
              onClick={handleSubmitPayment}
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
