import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../style/TermsAndPolicy.css";

const TermsAndPolicy = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Retrieve role from location state
  const role = location.state?.role;

  // Debugging log for role
  useEffect(() => {
    console.log("Role passed from previous page: ", role);
  }, [role]);

  // Handle agreement based on role
  const handleAgree = () => {
    // Set isRegistered to true in localStorage
    localStorage.setItem('isRegistered', 'true');
    
    // Redirect to the ContinueAs page after agreeing, regardless of role
    navigate("/continue-as");  
  };

  return (
    <div className="terms-container">
      <div className="overlay"></div>
      <div className="terms-card">
        <h2>Terms of Service & Privacy Policy</h2>
        <p className="last-updated">Last Updated: 2025-04-05</p>

        <h3>Terms and Services</h3>
        <ol>
          <li><strong>Acceptance of Terms</strong><br />
            By using HelpingHand, you agree to follow these terms. If you do not agree, please do not use the platform.
          </li>
          <li><strong>User Accounts</strong>
            <ul>
              <li>You must provide accurate information when signing up.</li>
              <li>Sellers must be a student.</li>
              <li>Keep your account secure—HelpingHand is not responsible for unauthorized access.</li>
            </ul>
          </li>
          <li><strong>Buying & Selling</strong>
            <ul>
              <li>Buyers must pay for items as agreed.</li>
              <li>Sellers must deliver as promised and ensure item quality.</li>
              <li>Refunds and disputes are handled between buyers and sellers.</li>
            </ul>
          </li>
          <li><strong>Prohibited Activities</strong>
            <ul>
              <li>No scams, fake listings, or misleading information.</li>
              <li>No illegal, harmful, or offensive content.</li>
              <li>Violating these rules may result in account suspension.</li>
            </ul>
          </li>
          <li><strong>Subscription & Payments</strong>
            <ul>
              <li>Paid plans are billed based on the chosen cycle.</li>
              <li>HelpingHand does not store payment details—transactions go through secure third-party providers.</li>
            </ul>
          </li>
          <li><strong>Liability & Disclaimer</strong>
            <ul>
              <li>HelpingHand is a platform connecting buyers and sellers—it is not responsible for transactions, damages, or losses.</li>
              <li>Use the platform at your own risk.</li>
            </ul>
          </li>
          <li><strong>Changes to Terms</strong><br />
            HelpingHand may update these terms, and continued use means you accept the changes.
          </li>
        </ol>

        <h3>Privacy and Policy</h3>
        <ol>
          <li><strong>Information We Collect</strong>
            <ul>
              <li>Personal Data: Name, email, contact details (for account creation).</li>
              <li>Transaction Data: Purchase history, payment method.</li>
              <li>Usage Data: How you interact with the platform (to improve user experience).</li>
            </ul>
          </li>
          <li><strong>How We Use Your Information</strong>
            <ul>
              <li>To provide and improve services.</li>
              <li>To send important updates and notifications.</li>
            </ul>
          </li>
          <li><strong>Data Protection</strong>
            <ul>
              <li>Your data is securely stored and not shared with third parties except for legal reasons.</li>
              <li>Payment processing is handled by secure third-party providers (e.g., GCash, PayPal).</li>
            </ul>
          </li>
          <li><strong>Your Rights</strong>
            <ul>
              <li>You can update or delete your account at any time.</li>
              <li>We respect your right for data concerns.</li>
            </ul>
          </li>
          <li><strong>Changes to This Policy</strong><br />
            HelpingHand may update this policy, and continued use means you agree to the changes.
          </li>
        </ol>

        <p>By clicking agree, you confirm your acceptance of our terms and policies.</p>

        <button className="agree-button" onClick={handleAgree}>
          I Agree
        </button>
      </div>
    </div>
  );
};

export default TermsAndPolicy;
