import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../style/SellerInfo.css';
import logoImage from "../assets/Logo.png";

const SellerInfo = () => {
  const [formData, setFormData] = useState({
    storeName: '',
    storeAddress: '',
    gmail: '',
    phone: ''
  });

  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    navigate('/myshop'); // Redirect after form submission
  };

  return (
    <div className="d">
      <div className="seller-info-container">
        <div className="sellerinfo-form-card">
          <img src={logoImage} alt="Helping Hand Logo" className="sellerinfo-logo-image" />
          <h1 className="sellerinfo-form-title">Seller Information</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="storeName">Store Name</label>
              <input
                type="text"
                id="storeName"
                name="storeName"
                placeholder="Enter your store name"
                value={formData.storeName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="storeAddress">Store Address</label>
              <input
                type="text"
                id="storeAddress"
                name="storeAddress"
                placeholder="Enter your store address"
                value={formData.storeAddress}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="gmail">Gmail Account</label>
              <input
                type="email"
                id="gmail"
                name="gmail"
                placeholder="Enter your Gmail account"
                value={formData.gmail}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerInfo;
