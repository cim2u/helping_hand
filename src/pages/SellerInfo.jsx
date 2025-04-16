import React, { useState } from 'react';
import '../style/SellerInfo.css';

const SellerInfo = () => {
  const [formData, setFormData] = useState({
    storeName: '',
    storeAddress: '',
    gmail: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // Add redirect or processing logic here
  };

  return (
    <div className="d">
      <div className="seller-info-container">
        <div className="form-card">
          <h1 className="logo-text">Helping <span>Hand</span></h1>
          <h2 className="form-title">Seller Information</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="storeName"
              placeholder="Store Name"
              value={formData.storeName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="storeAddress"
              placeholder="Store Address"
              value={formData.storeAddress}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="gmail"
              placeholder="Gmail Account"
              value={formData.gmail}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerInfo;
