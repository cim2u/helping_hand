import React from 'react';
import logo from '../assets/Logo.png';
import styles from '../style/Logo.module.css'; // Import CSS module

const Logo = ({ size = "default" }) => {

  // Choose the logo class based on the size prop
  let logoClass;
  if (size === "large") {
    logoClass = styles.logoLarge;
  } else if (size === "L-login") {
    logoClass = styles.logoLarge;
  } else {
    logoClass = styles.logo; // Default size
  }

  return <img src={logo} alt="Logo" className={logoClass} />;
};

export default Logo;


