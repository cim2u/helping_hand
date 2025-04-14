import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../style/MyShop.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faCartShopping, faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import logoImage from "../assets/Logo.png";

const MyShop = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  const [activeTab, setActiveTab] = useState("products");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(localStorage.getItem("profileImage") || "");
  const shopName = localStorage.getItem("shopName") || "Sissy Shey";
  const sellerName = localStorage.getItem("sellerName") || "@SheyAndrews";

  useEffect(() => {
    const alertShown = localStorage.getItem("authAlertShown");
    if (state?.role === "student" && alertShown !== "true") {
      alert("Your authentication has already been sent. Please wait for verification.");
      localStorage.setItem("authAlertShown", "true");
    }

    const subscription = localStorage.getItem("isSubscribed") === "true";
    setIsSubscribed(subscription);
  }, [state]);

  const handleSubscribeClick = () => {
    localStorage.setItem("isSubscribed", "true");
    setIsSubscribed(true);
    alert("You have successfully subscribed!");
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    const target = document.querySelector(`#${tab}`);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  const isBuyer = state?.role === "buyer";

  const handleMenuClick = (route) => {
    navigate(route);
    setIsSidebarOpen(false);
  };

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        localStorage.setItem("profileImage", reader.result);
      };
      reader.readAsDataURL(file);
      closeModal();
    }
  };

  return (
    <div className="shop-container">
      {/* Header */}
      <header className="shop-header">
        <img src={logoImage} alt="Helping Hand Banner" className="logoLarge" />
        <div className="icon-container">
          {!isBuyer && (
            <FontAwesomeIcon
              icon={faBars}
              className="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            />
          )}
          <FontAwesomeIcon icon={faUser} className="icon" />
          <FontAwesomeIcon icon={faCartShopping} className="icon" />
        </div>
      </header>

      {/* Background Cover Layer */}
      <div className="background-cover"></div>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="sidebar">
          <div className="sidebar-header">
            <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={() => setIsSidebarOpen(false)} />
          </div>
          <ul className="sidebar-menu">
            <li onClick={() => handleMenuClick("/")}>HOME</li>
            <li onClick={() => handleMenuClick("/about")}>ABOUT</li>
            <li onClick={() => handleMenuClick("/support")}>SUPPORT</li>
            <li onClick={() => handleMenuClick("/settings")}>SETTINGS</li>
            <li onClick={() => handleMenuClick("/")}>LOGOUT</li>
          </ul>
        </div>
      )}

      {/* Profile Banner */}
      <div className="profile-banner">
        <div className="profile-info">
          <div className="profile-pic-wrapper" onClick={openModal}>
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="profile-pic" />
            ) : (
              <div className="default-profile-icon animated">
                <FontAwesomeIcon icon={faUser} size="3x" />
              </div>
            )}
          </div>
          <div>
            <h2 className="shop-owner-name" style={{ textDecoration: "underline", color: "black", fontSize: "1.5rem" }}>
              {shopName || "SHOP NAME"}
            </h2>
            <p className="shop-owner-handle" style={{ color: "gray" }}>
              {sellerName}
            </p>
            {isSubscribed ? (
              <p className="subscribed-message" style={{ color: "green" }}>You are subscribed</p>
            ) : (
              <button className="subscribe-button" onClick={handleSubscribeClick} style={{ padding: "10px", backgroundColor: "#4CAF50", color: "white", borderRadius: "5px" }}>
                Subscribe
              </button>
            )}
          </div>
        </div>

        {/* Add button if products are posted */}
        <FontAwesomeIcon icon={faPlus} className="add-button" onClick={openModal} />
      </div>

      {/* Image Upload Modal */}
      {isModalOpen && (
        <div className="upload-modal">
          <div className="modal-content">
            <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={closeModal} />
            <h3>Upload Profile Image</h3>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>
        </div>
      )}

      {/* Shop Tabs */}
      <div className="shop-tabs">
        <a
          href="#products"
          className={`tab ${activeTab === "products" ? "active" : ""}`}
          onClick={() => handleTabClick("products")}
        >
          Products
        </a>
        <a
          href="#services"
          className={`tab ${activeTab === "services" ? "active" : ""}`}
          onClick={() => handleTabClick("services")}
        >
          Services
        </a>
      </div>

     {/* Popular Products Section */}
{activeTab === "products" && (
  <div className="popular-section">
    <h2 className="popular-section-title">Popular Products</h2>
    <div className="product-grid">
      {/* Product 1 */}
      <div className="product-item">
        <img 
          src="https://s3-alpha-sig.figma.com/img/4fa2/b3f8/f870a7275fbe1366a676f28195402bd6?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=UColHrM4-CRvdCCPTBH63CswPqYJ5RNZRge7rMeyjBCFjiw0-uoCZDjfaR6CRbfvRHEHWfeSp9~h2fwNO1v3OR1fGsycyUaeQRXbTeo-6-osU60z3b6lE2yduAcQkjxqkA0f2YHszHb3tHT3GWv6lOcxHMaft5ZzdWYsL2yGOTnzI5qIz0SaZzAO~Aj1-UM-x-xTgvpIkuX-nH9BhP1RYA4wOSF0abbAhFYVO2eexMKiOyx5Ot6xkHmoAOr32bCE-7uv7TmowZTeDVn4cmeh0V96J56qzBWpzusW1q7y77rOgr~IC5Cr-xHsgDaWMqaOnTIei7AtF10jqPidtX~7XQ"
          alt="Ribbon Keychain"
          className="product-image"
        />
        <div className="product-name">Ribbon Keychain</div>
      </div>

      {/* Product 2 */}
      <div className="product-item">
        <img 
          src="https://s3-alpha-sig.figma.com/img/3ab1/c59c/1a1f07801f5115381349e63f4c14f55e?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pr-704071yEAxPduuCFTRlcbTNdWiKQAJlhxvfBlDFt7mVCP1c0tFz-RDdawkbwnOYbukQvEDsDsGCeoEVZFtPTLzKfNwchR66kSt8q-tKahBDE0G6FFhOZEJKA~gbK8wsFxqrW7n6AEJZdQp1AA8pUAf4idHKewSimAQEYxU4elBjqi3SF8HgFFGNkLKjZi8CZ5cfJRUlODbMuFxOW05wb0aST~CQNyKDNLMt1KrwgEofsTa9CUyEFGRpN2ucpw-Eqyq5OQEiD7qeDEIpblrVkUHaj3aAk4yOxdl33n0zPzPry1t7l2N-VIfpDdEK-vFfnfczrx-2hhrmnHmGz1rMOecE9A=="
          alt="Mini Flower Vase"
          className="product-image"
        />
        <div className="product-name">Mini Flower Vase</div>
      </div>
    </div>
  </div>
)}

         

      {/* Services Section */}
      {activeTab === "services" && (
        <section className="product-section" id="services">
          <h3>Services</h3>
          <p style={{ marginTop: "1rem", fontStyle: "italic", color: "#888" }}>No services posted yet.</p>
        </section>
      )}
    </div>
  );
};

export default MyShop;
