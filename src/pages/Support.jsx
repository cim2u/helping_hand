import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Support.css';
import logo from "../assets/Logo.png";

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
        <img src="https://s3-alpha-sig.figma.com/img/cddc/c69c/3f6f0a76202e9185950e2cc3030ddcf5?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=OSgpki4sDiZvJQaaVriuXYw824d-73NRdbbIvtE7QOxa0DEBTnaqr25l809G82VUYfdLi-qzcguGWZw113ZWHPkmCe39wejgx0mHBOZZ5OxXtrimYSAh37as31XlmaTMnXnIYhj-pVIVdnekxH1jYUYbF3lFRFLaOwi~-Op~ZqzpErl-9P6MmxTrDbm6bGuIKtH1xlZ3WPAepIf~Yb~2CYTyJgfjVg9T0mD7BSSVsLvnALAsBk0SPuH0Q~8rjRZmu-AMXGWT0hBvmxajESjf4suTA8ZvQwZGKVe~FZul1XSUnIqjrcerKK7FCVluiENEMOxr0cxaH-XUqwAbUyZCsw__" alt="logo" className="logoSupport" />
        <div className="logo-container">
            <img src={logo} alt="HelpingHand Logo" className="logo" />
          </div>
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
  Email HelpingHand at <span className="underlineEmail">HelpingHandSupport@gmail.com</span>
</div>

    </div>
  );
};

export default Support;
