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

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);

    const savedMessages = JSON.parse(localStorage.getItem("supportMessages")) || [];
    setMessages(savedMessages);
  }, []);

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

  const handleSendClick = () => {
    if (message.trim() === '') {
      alert('Please enter your issue before sending.');
      return;
    }

    const newMessage = {
      id: Date.now(),
      user: currentUser,
      text: message,
      timestamp: new Date().toLocaleString(),
      reply: null
    };

    const updatedMessages = [...messages, newMessage];
    localStorage.setItem("supportMessages", JSON.stringify(updatedMessages));
    setMessages(updatedMessages);
    setMessage('');
    setShowNotification(true);

    setTimeout(() => setShowNotification(false), 3000);
  };

  const userMessages = messages.filter(msg => msg.user === currentUser || msg.user === "system");

  return (
    <div className="account-info-wrapper">
      <div className="containerSupport">
        <div className="headerSupport"></div>
        <div className="headerImageSupport"></div>

        <div className="logoContainerSupport">
          <img src="https://i.imgur.com/GT5CDSQ.png" alt="logo" className="logoSupport" />
          <div className="logo-container">
            <img src={logo} alt="HelpingHand Logo" className="logo" />
          </div>
        </div>

        <div className="nav-container">
          <nav className="nav-links-h">
            <a href="#" onClick={(e) => handleNavigation("about", e)}>About</a>
            <a href="#" onClick={(e) => handleNavigation("support", e)}>Support</a>
            <a href="#" onClick={(e) => {
              e.preventDefault();
              handleLogout();
            }}>Home</a>
          </nav>
        </div>

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
                    <div><strong>You:</strong> {msg.text}</div>
                    <div className="timestampSupport">{msg.timestamp}</div>
                    {msg.reply && (
                      <div className="adminReplySupport">
                        <strong>Admin:</strong> {msg.reply}
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
