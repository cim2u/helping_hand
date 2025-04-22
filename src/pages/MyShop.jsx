import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../style/MyShop.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faCartShopping, faTimes, faPlus, faArrowRight } from "@fortawesome/free-solid-svg-icons";
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

  // Store state to localStorage if available
  useEffect(() => {
    if (state) {
      state.storeName && localStorage.setItem("shopName", state.storeName);
      state.username && localStorage.setItem("sellerUsername", state.username);
      state.firstName && localStorage.setItem("firstName", state.firstName);
      state.lastName && localStorage.setItem("lastName", state.lastName);
    }

    const alertShown = localStorage.getItem("authAlertShown");
    if (state?.role === "student" && alertShown !== "true") {
      alert("Your authentication has already been sent. Please wait for verification.");
      localStorage.setItem("authAlertShown", "true");
    }

    const subscription = localStorage.getItem("isSubscribed") === "true";
    setIsSubscribed(subscription);
  }, [state]);

  // Pull seller info from localStorage or state
  const shopName = localStorage.getItem("shopName") || state?.storeName || "SHOP NAME";
  const sellerUsername = localStorage.getItem("sellerUsername") || state?.username || "@username";
  const firstName = localStorage.getItem("firstName") || state?.firstName || "FirstName";
  const lastName = localStorage.getItem("lastName") || state?.lastName || "LastName";

  const handleSubscribeClick = () => {
    localStorage.setItem("isSubscribed", "true");
    setIsSubscribed(true);
    alert("You have successfully subscribed!");
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    document.querySelector(`#${tab}`)?.scrollIntoView({ behavior: "smooth" });
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
            <FontAwesomeIcon icon={faBars} className="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
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
              <img
                src="https://s3-alpha-sig.figma.com/img/1291/8283/db5584e1491b3ce3d07e5a6f324db4bd?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=HVRy5RDLTa-M77wznKozpmRxGMMXtIXkRpwiobui~F3TNVaF6JRxKABszJQglZXGqC7URh-mzj3Ub1QG20dxJC4t9zwp~WscTBbq9r35-nRdwTkIkW0fOgZ9wg2eckW7t6TsEZwwy8FV0W0R5Gqho-XL4y-B999cRtPVI7VQsnk4~Adnl~lWAeAkTn98fYPbBqyb78H0Mc-hnzVfBvJhKVMEVCbD~0ezEsVHNI-YrTf6Zdt-E0nxV6ejvn0yqOE553hxkZ2ZDmnVxsHuiq0yott0aOH1pP-H4ygdOYsYvJiUg0EB9GGjNhyPtW~cTjNp3l7pQUhqRnsI6vgfUQghJQ__"
                alt="Default Profile"
                className="profile-pic"
              />
            )}
          </div>

          <div>
            <h2 className="shop-owner-name" style={{ textDecoration: "underline", color: "black", fontSize: "1.5rem" }}>
              {shopName}
            </h2>
            <p className="shop-owner-handle">{sellerUsername}</p>
            <p className="shop-owner-full-name">{`${firstName} ${lastName}`}</p>

            {isSubscribed ? (
              <p className="h1-subscribe-button">You are subscribed</p>
            ) : (
              <button className="h1-subscribe-button" onClick={handleSubscribeClick}>
                Subscribe
              </button>
            )}
          </div>

          <FontAwesomeIcon
            icon={faArrowRight}
            className="always-visible-arrow"
            onClick={(e) => e.preventDefault()}
          />
        </div>

        <FontAwesomeIcon icon={faPlus} className="add-button" style={{ fontSize: "24px" }} onClick={openModal} />
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
    </div>
  );
};

export default MyShop;
