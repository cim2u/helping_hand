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
  const [scrolledRight, setScrolledRight] = useState(false);
  const [scrolledRightProduct2, setScrolledRightProduct2] = useState(false);

  const productListRef = useRef(null);
  const productList2Ref = useRef(null);  // For Product2
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

  const product2 = [
    { id: 1, name: "Product 2A", image: "path/to/product2-a.jpg" },
    { id: 2, name: "Product 2B", image: "path/to/product2-b.jpg" },
    { id: 3, name: "Product 2C", image: "path/to/product2-c.jpg" },
    { id: 4, name: "Product 2D", image: "path/to/product2-d.jpg" },
    { id: 5, name: "Product 2E", image: "path/to/product2-e.jpg" },
    { id: 6, name: "Product 2F", image: "path/to/product2-f.jpg" },
    { id: 7, name: "Product 2G", image: "path/to/product2-g.jpg" },
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
              src={profileImage || "https://path/to/default-profile.jpg"}
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
            style={{ fontSize: "18px" }} 
            onClick={() => setIsModalOpen(true)} 
          />
        </div>
      </div>

      {/* Popular Products Section */}
      <div className="popular-products">
        <span className="popular-label">POPULAR</span>
        <span className="product-label">PRODUCT</span>

        <div className="relative">
          <FontAwesomeIcon
            icon={faArrowRight}
            className={`scroll-arrow ${scrolledRight ? "rotate-180" : ""}`}
            onClick={() => {
              const scrollEl = productListRef.current;
              if (scrollEl) {
                if (scrolledRight) {
                  scrollEl.scrollTo({ left: 0, behavior: "smooth" });
                } else {
                  const seventhItem = scrollEl.children[6];
                  if (seventhItem) {
                    const leftPos = seventhItem.offsetLeft - scrollEl.offsetLeft;
                    scrollEl.scrollTo({ left: leftPos, behavior: "smooth" });
                  }
                }
                setScrolledRight(!scrolledRight);
              }
            }}
          />

          <div
            ref={productListRef}
            className="product-list no-scrollbar"
            style={{
              overflowX: "auto",
              scrollBehavior: "smooth",
              display: "flex",
              gap: "16px",
              paddingRight: "40px",
            }}
          >
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
      </div>

      {/* Product2 Section (Updated) */}
      <div className="product2-section">
        <span className="popular-label">PRODUCT 2</span>
        <span className="product-label">PRODUCT</span>

        <div className="relative">
          <FontAwesomeIcon
            icon={faArrowRight}
            className={`scroll-arrow ${scrolledRightProduct2 ? "rotate-180" : ""}`}
            onClick={() => {
              const scrollEl = productList2Ref.current;
              if (scrollEl) {
                if (scrolledRightProduct2) {
                  scrollEl.scrollTo({ left: 0, behavior: "smooth" });
                } else {
                  const seventhItem = scrollEl.children[6];
                  if (seventhItem) {
                    const leftPos = seventhItem.offsetLeft - scrollEl.offsetLeft;
                    scrollEl.scrollTo({ left: leftPos, behavior: "smooth" });
                  }
                }
                setScrolledRightProduct2(!scrolledRightProduct2);
              }
            }}
          />

          <div
            ref={productList2Ref}
            className="product2-list no-scrollbar"
            style={{
              overflowX: "auto",
              scrollBehavior: "smooth",
              display: "flex",
              gap: "16px",
              paddingRight: "40px",
            }}
          >
            {product2.map((product) => (
              <div key={product.id} className="product2-item">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product2-image"
                />
                <div className="product2-details">
                  <h4>{product.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="upload-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="upload-modal">
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={() => setIsModalOpen(false)} />
              <h3>Upload Profile Image</h3>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
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
