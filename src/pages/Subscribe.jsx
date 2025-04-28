import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import '../style/Subscribe.css';

const Subscribe = () => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  const handleSubscribeClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Close the modal if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    // Add event listener for click outside
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="subscribe-container-subscribe">
      {/* Main content */}
      <div className="top-bar-subscribe" />
      <div className="top-bar-logo-subscribe" />
      
      {/* Navigation Links */}
      <div className="nav-about-subscribe">
        <Link to="/about" style={{ color: '#FFF', textDecoration: 'underline' }}>About</Link>
      </div>
      <div className="nav-home-subscribe">
        <Link to="/" style={{ color: '#FFF', textDecoration: 'underline' }}>Home</Link>
      </div>
      <div className="nav-support-subscribe">
        <Link to="/support" style={{ color: '#FFF', textDecoration: 'underline' }}>Support</Link>
      </div>

      {/* Subscription Details */}
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

      {/* Modal */}
      {showModal && (
        <div className="modal-subscribe">
          <div className="modal-container-subscribe" ref={modalRef}>
            <div className="modal-content-subscribe">
              <h2 className="modal-title-subscribe">Are you sure?</h2>
              <button className="modal-button-subscribe" onClick={handleCloseModal}>
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscribe;
