import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/SellerInfo.css';
import logoImage from "../assets/Logo.png";

const SellerInfo = () => {
  const [formData, setFormData] = useState({
    storeName: '',
    storeAddress: '',
    gmail: '',
    phone: ''
  });

  const navigate = useNavigate();

  // Handle changes in form fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Save data to localStorage
    localStorage.setItem('shopName', formData.storeName);
    localStorage.setItem('storeAddress', formData.storeAddress);
    localStorage.setItem('gmail', formData.gmail);
    localStorage.setItem('phone', formData.phone);

    console.log('Form Submitted:', formData);

    // Navigate to /myshop with form data
    navigate('/myshop', { state: { formData } });
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
              <label htmlFor="gmail" className="storelabel">Gmail Account</label>
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

            <button type="submit" className="storeinfo-submit-btn">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerInfo;
