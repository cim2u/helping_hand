import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Support.css';
import logo from "../assets/Logo.png";

const Support = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState("guestUser"); // Replace with actual username if you have login system
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch messages from backend API on mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/api/support-messages?user=' + currentUser);
      if (!response.ok) throw new Error('Failed to fetch messages');
      const data = await response.json();
      setMessages(data);
    } catch (err) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const handleNavigation = (page, e) => {
    if (e) e.preventDefault();
    if (page === "home" && !isLoggedIn) {
      handleLogout();
    } else {
      navigate(`/${page}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/home");
  };

  const handleSendClick = async () => {
    if (message.trim() === '') {
      alert('Please enter your issue before sending.');
      return;
    }

    const newMessage = {
      user: currentUser,
      text: message,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch('http://localhost:8000/api/support-messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMessage),
      });
      if (!response.ok) throw new Error('Failed to send message');
      const savedMessage = await response.json();

      // Update local state with new message from backend
      setMessages(prev => [...prev, savedMessage]);
      setMessage('');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } catch (err) {
      alert(err.message || 'Error sending message');
    }
  };

  // Filter messages to only current user or system replies
  const userMessages = messages.filter(msg => msg.user === currentUser || msg.user === "system");

  return (
    <div className="account-info-wrapper">
      <div className="containerSupport">
        {/* ...header, logo, navigation... same as your code */}

        <div className="headingSupport">
          Need a hand? How can we help you?
        </div>

        <div className="formContainerSupport">
          <div className="inputContainerSupport">
            <textarea
              placeholder="Please discuss your issue..."
              className="inputFieldSupport"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button className="sendButtonSupport" onClick={handleSendClick}>Send</button>
          <button className="viewMessagesButtonSupport" onClick={() => setShowModal(true)}>
            View Messages
          </button>
        </div>

        {loading && <div>Loading messages...</div>}
        {error && <div className="errorMessageSupport">{error}</div>}

        {showNotification && (
          <div className="notificationSupport">Your message has been sent.</div>
        )}

        <div className="emailTextSupport">
          Email HelpingHand at <span className="underlineEmail">helpinghandofficial@gmail.com</span>
        </div>

        {showModal && (
          <div className="modalOverlaySupport">
            <div className="modalContentSupport">
              <span className="closeModalSupport" onClick={() => setShowModal(false)}>&times;</span>
              <h3>Message History</h3>
              {userMessages.length === 0 ? (
                <p>No messages yet.</p>
              ) : (
                userMessages.map(msg => (
                  <div key={msg.id} className="modalMessageItemSupport">
                    <div><strong>{msg.user === currentUser ? "You:" : "Admin:"}</strong> {msg.text}</div>
                    <div className="timestampSupport">{new Date(msg.timestamp).toLocaleString()}</div>
                    {msg.reply && (
                      <div className="adminReplySupport">
                        <strong>Admin Reply:</strong> {msg.reply}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Support;
 