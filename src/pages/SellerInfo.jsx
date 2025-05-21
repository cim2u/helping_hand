import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/SellerInfo.css';
import "../style/ContinueAs.css";
import logoImage from "../assets/Logo.png";
import PaymentConfirmationModal from '../components/PaymentConfirmationModal.jsx';

const SellerInfo = () => {
  const [formData, setFormData] = useState({
    storeName: '',
    storeAddress: '',
    gmail: '',
    phone: ''
  });

  const [gcashQR, setGcashQR] = useState(null);
  const [gcashQRPreview, setGcashQRPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (gcashQRPreview) {
        URL.revokeObjectURL(gcashQRPreview);
      }
    };
  }, [gcashQRPreview]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGcashQRChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      if (gcashQRPreview) {
        URL.revokeObjectURL(gcashQRPreview);
      }

      setGcashQR(file);
      const previewURL = URL.createObjectURL(file);
      setGcashQRPreview(previewURL);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!gcashQR) {
      alert("Please upload your GCash QR Code");
      return;
    }

    setIsSubmitting(true);

    // Save form data and QR preview to localStorage
    localStorage.setItem('shopName', formData.storeName);
    localStorage.setItem('storeAddress', formData.storeAddress);
    localStorage.setItem('gmail', formData.gmail);
    localStorage.setItem('phone', formData.phone);
    localStorage.setItem('gcashQR', gcashQRPreview);

    console.log('Form Submitted:', formData);

    // Show modal and stop loading
    setShowPaymentModal(true);
    setIsSubmitting(false);
  };

  const closeModalAndNavigate = () => {
    setShowPaymentModal(false);
    navigate('/store'); // Direct to "/store" after modal
  };

  return (
    <div className="d">
      <div className="seller-info-container">
        <div className="sellerinfo-form-card">
          <img src={logoImage} alt="Helping Hand Logo" className="sellerinfo-logo-image" />
          <h1 className="sellerinfo-form-title">Seller Information</h1>
          <form onSubmit={handleSubmit} className="seller-info-form">
            <div>
              <label htmlFor="storeName" className="storelabel">Store Name</label>
              <input
                type="text"
                id="storeName"
                name="storeName"
                value={formData.storeName}
                onChange={handleChange}
                required
                className="store-name-input"
              />
            </div>

            <div>
              <label htmlFor="storeAddress" className="storelabel">Store Address</label>
              <input
                type="text"
                id="storeAddress"
                name="storeAddress"
                value={formData.storeAddress}
                onChange={handleChange}
                required
                className="store-address-input"
              />
            </div>

            <div>
              <label htmlFor="gmail" className="storelabel">Email Account</label>
              <input
                type="email"
                id="gmail"
                name="gmail"
                value={formData.gmail}
                onChange={handleChange}
                required
                className="gmail-input"
              />
            </div>

            <div>
              <label htmlFor="phone" className="storelabel">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="phone-input"
              />
            </div>

            <div className="gcash-upload-section">
              <label htmlFor="gcashQR" className="storelabel">GCash QR Code</label>
              <input
                type="file"
                id="gcashQR"
                accept="image/*"
                onChange={handleGcashQRChange}
                required
                className="gcash-upload-input"
              />
              {gcashQR && (
                <p className="filename-display">Selected: {gcashQR.name}</p>
              )}
            </div>

            <button
              type="submit"
              className="storeinfo-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner"></div> Submitting...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Payment Confirmation Modal */}
      {showPaymentModal && (
        <PaymentConfirmationModal
          gcashQR={gcashQRPreview}
          onClose={closeModalAndNavigate}
        />
      )}
    </div>
  );
};

export default SellerInfo;
