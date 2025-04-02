import React from 'react';
import logo from '../assets/Logo.png';
import styles from '../style/Logo.module.css'; // Import CSS module

const Logo = ({ size = "default" }) => {
  // Apply different class names based on size prop
  const logoClass = size === "large" ? styles.logoLarge : styles.logo;

  return <img src={logo} alt="Logo" className={logoClass} />;
};

export default Logo;

