import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Support.css';

const Support = () => {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    if (route === 'home') {
      navigate('/');
    } else {
      navigate(`/${route}`);
    }
  };

  return (
    <div className="containerSupport">
      <div className="headerSupport"></div>
      <div className="headerImageSupport"></div>

      <div className="logoContainerSupport">
        <img src="Untitled design.png" alt="logo" className="logoSupport" />
        <h1 className="helpingSupport">Helping</h1>
        <p className="handSupport">Hand</p>
      </div>

      <div className="nav-links">
        <span onClick={() => handleNavigation('about')}>About</span>
        <span onClick={() => handleNavigation('support')}>Support</span>
        <span onClick={() => handleNavigation('home')}>Home</span>
      </div>

      <div className="headingSupport">
        Need a hand? How can we help you?
      </div>

      <div className="formContainerSupport">
        <div className="inputContainerSupport">
          <input
            type="text"
            placeholder="Type your message here..."
            className="inputFieldSupport"
          />
        </div>
      </div>

      <div className="emailTextSupport">
        Email HelpingHand at HelpingHandSupport@gmail.com
      </div>
    </div>
  );
};

export default Support;
