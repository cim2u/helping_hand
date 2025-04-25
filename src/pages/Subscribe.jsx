import React, { useState } from 'react';
import '../style/Subscribe.css';

const Subscribe = () => {
  const [showModal, setShowModal] = useState(false);

  const handleSubscribeClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="subscribe-container-subscribe">
      {/* Main content */}
      <div className="top-bar-subscribe" />
      <div className="top-bar-logo-subscribe" />
      <div className="nav-about-subscribe">About</div>
      <div className="nav-support-subscribe">Support</div>
      <div className="nav-home-subscribe">Home</div>
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
          <div className="modal-container-subscribe">
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
