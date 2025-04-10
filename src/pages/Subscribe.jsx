import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Subscribe = () => {
  const [isSubscribed, setIsSubscribed] = useState(false); // Track subscription status
  const navigate = useNavigate();

  // Handle subscription action
  const handleSubscribe = () => {
    setIsSubscribed(true); // Set subscription status to true
    navigate('/'); // Redirect back to home after subscription
  };

  return (
    <div className="subscribe-wrapper">
      <h2>Subscribe to Access Premium Features</h2>
      <p>If you are not yet subscribed, click the button below to subscribe!</p>

      {/* Only show this button if the user hasn't subscribed yet */}
      {!isSubscribed && (
        <button className="subscribe-button" onClick={handleSubscribe}>
          Subscribe Now
        </button>
      )}

      {/* If already subscribed, show a message */}
      {isSubscribed && <p>Thank you for subscribing!</p>}
    </div>
  );
};

export default Subscribe;