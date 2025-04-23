import React, { useEffect, useState, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../style/MyShop.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUser,
  faCartShopping,
  faTimes,
  faPlus,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
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
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const productsRef = useRef(null);
  const servicesRef = useRef(null);

  const shopName = localStorage.getItem("shopName") || state?.storeName || "SHOP NAME";
  const sellerUsername = localStorage.getItem("sellerUsername") || state?.username || "Shey Andrews";
  const isBuyer = state?.role === "buyer";

  useEffect(() => {
    if (state) {
      if (state.storeName) localStorage.setItem("shopName", state.storeName);
      if (state.username) localStorage.setItem("sellerUsername", state.username);
    }

    if (state?.role === "student" && localStorage.getItem("authAlertShown") !== "true") {
      alert("Your authentication has already been sent. Please wait for verification.");
      localStorage.setItem("authAlertShown", "true");
    }

    setIsSubscribed(localStorage.getItem("isSubscribed") === "true");
  }, [state]);

  const handleSubscribeClick = () => {
    localStorage.setItem("isSubscribed", "true");
    setIsSubscribed(true);
    alert("You have successfully subscribed!");
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    document.getElementById(tab)?.scrollIntoView({ behavior: "smooth" });
  };

  // Move underline on tab change
  useEffect(() => {
    const activeRef = activeTab === "products" ? productsRef : servicesRef;
    if (activeRef.current) {
      const rect = activeRef.current.getBoundingClientRect();
      const containerRect = activeRef.current.parentNode.getBoundingClientRect();
      setIndicatorStyle({
        left: rect.left - containerRect.left,
        width: rect.width,
      });
    }
  }, [activeTab]);

  const handleMenuClick = useCallback((route) => {
    navigate(route);
    setIsSidebarOpen(false);
  }, [navigate]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        localStorage.setItem("profileImage", reader.result);
      };
      reader.readAsDataURL(file);
      setIsModalOpen(false);
    }
  };

  // Popular products data
  const popularProducts = [
    {
      id: 1,
      name: "Popular Product 1",
      image: "path/to/popular-product1.jpg",
    },
    {
      id: 2,
      name: "Popular Product 2",
      image: "path/to/popular-product2.jpg",
    },
    {
      id: 3,
      name: "Popular Product 3",
      image: "path/to/popular-product3.jpg",
    },
    {
      id: 4,
      name: "Popular Product 4",
      image: "path/to/popular-product4.jpg",
    },
    {
      id: 5,
      name: "Popular Product 5",
      image: "path/to/popular-product5.jpg",
    },
    {
      id: 6,
      name: "Popular Product 6",
      image: "path/to/popular-product6.jpg",
    },
  ];

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

      {/* Background */}
      <div className="background-cover"></div>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="sidebar">
          <div className="sidebar-header">
            <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={() => setIsSidebarOpen(false)} />
          </div>
          <ul className="sidebar-menu">
            {["/", "/about", "/support", "/settings", "/"].map((route, i) => (
              <li key={i} onClick={() => handleMenuClick(route)}>
                {["HOME", "ABOUT", "SUPPORT", "SETTINGS", "LOGOUT"][i]}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Profile Banner */}
      <div className="profile-banner">
        <div className="profile-info">
          <div className="profile-pic-wrapper" onClick={() => setIsModalOpen(true)}>
            <img
              src={profileImage || "https://s3-alpha-sig.figma.com/img/1291/8283/db5584e1491b3ce3d07e5a6f324db4bd?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=HVRy5RDLTa-M77wznKozpmRxGMMXtIXkRpwiobui~F3TNVaF6JRxKABszJQglZXGqC7URh-mzj3Ub1QG20dxJC4t9zwp~WscTBbq9r35-nRdwTkIkW0fOgZ9wg2eckW7t6TsEZwwy8FV0W0R5Gqho-XL4y-B999cRtPVI7VQsnk4~Adnl~lWAeAkTn98fYPbBqyb78H0Mc-hnzVfBvJhKVMEVCbD~0ezEsVHNI-YrTf6Zdt-E0nxV6ejvn0yqOE553hxkZ2ZDmnVxsHuiq0yott0aOH1pP-H4ygdOYsYvJiUg0EB9GGjNhyPtW~cTjNp3l7pQUhqRnsI6vgfUQghJQ__"}
              alt="Profile"
              className="profile-pic"
            />
          </div>
          <div>
            <h2 className="shop-owner-name">{shopName}</h2>
            <p className="shop-owner-handle">{sellerUsername}</p>
            {isSubscribed ? (
              <p className="h1-subscribe-button">You are subscribed</p>
            ) : (
              <button className="h1-subscribe-button" onClick={handleSubscribeClick}>
                Subscribe
              </button>
            )}
          </div>
          <FontAwesomeIcon icon={faArrowRight} className="always-visible-arrow" />
          <FontAwesomeIcon 
            icon={faPlus} 
            className="add-button" 
            style={{ fontSize: "18px" }} // Smaller plus icon size
            onClick={() => setIsModalOpen(true)} 
          />
        </div>
      </div>

      {/* Popular Products Section */}
      <div className="popular-products">
        <h3>Popular Products</h3>
        <div className="product-list">
          {popularProducts.map((product) => (
            <div key={product.id} className="product-item">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <div className="product-details">
                <h4>{product.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Modal with Overlay */}
      {isModalOpen && (
        <div className="upload-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="upload-modal">
            <div className="modal-content">
              <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={() => setIsModalOpen(false)} />
              <h3>Upload Profile Image</h3>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>
          </div>
        </div>
      )}

      {/* Tabs (hidden when modal is open) */}
      {!isModalOpen && (
        <div className="shop-tabs">
          <a
            ref={productsRef}
            href="#products"
            className={`tab ${activeTab === "products" ? "active" : ""}`}
            onClick={() => handleTabClick("products")}
          >
            Products
          </a>
          <a
            ref={servicesRef}
            href="#services"
            className={`tab ${activeTab === "services" ? "active" : ""}`}
            onClick={() => handleTabClick("services")}
          >
            Services
          </a>

          <div className="tab-indicator" style={indicatorStyle}></div>
        </div>
      )}
    </div>
  );
};

export default MyShop;
