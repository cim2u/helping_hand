import React from 'react';
import '../style/SubscriptionModal.css'; // Make sure you style it accordingly.

const SubscriptionModal = ({ isVisible, onClose }) => {
  if (!isVisible) return null; // Don't render modal if it's not visible

  return (
    <div className="subscription-modal-overlay">
      <div className="subscription-modal">
        <div className="modal-header">
          <h2>Subscribe to Continue</h2>
          <button className="close-modal" onClick={onClose}>X</button>
        </div>
        <div className="modal-body">
          <p>To view more products, please subscribe.</p>
          <button className="subscribe-button" onClick={onClose}>Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
