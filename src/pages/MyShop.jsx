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
  faBagShopping,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";
import logoImage from "../assets/Logo.png";
import Profile from '../components/ProfileModal';
import { Link } from 'react-router-dom';



const MyShop = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Or false depending on logic
 
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'default');
  
      useEffect(() => {
        setTheme(localStorage.getItem('theme') || 'default');
      }, []);

  const toggleProfileVisibility = () => {
    console.log("Profile visibility toggled:", !isProfileVisible);
    setIsProfileVisible(!isProfileVisible);
  };
  
  const [activeTab, setActiveTab] = useState("products");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(localStorage.getItem("profileImage") || "");
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [scrolledRight, setScrolledRight] = useState(false);
  const [scrolledRightProduct2, setScrolledRightProduct2] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
const [selectedProduct, setSelectedProduct] = useState(null);
const [userRole, setUserRole] = useState("student"); // Can be "student", "seller", or "buyer"
const [loggedIn, setLoggedIn] = useState(false); // or set it to true based on your logic
const [showProfile, setShowProfile] = useState(false);




  const productListRef = useRef(null);
  const productList2Ref = useRef(null);  // For Product2
  const productsRef = useRef(null);
  const servicesRef = useRef(null);
  const sidebarRef = useRef(null); // Reference for sidebar
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };


  
  
  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedProduct(null);
  };
  
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const profileRef = useRef(null);
  
  const toggleProfile = () => {
    setIsProfileVisible(!isProfileVisible);
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileVisible(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileVisible(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleLogoutClick = () => {
    // Example logout logic
    console.log('Logging out...');
    
  };
  

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

  useEffect(() => {
    // Close sidebar if clicked outside of it
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  
  return (
    <section className={`shop-container ${theme}-theme`}>
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

    {/* Profile icon */}
    <FontAwesomeIcon
      icon={faUser}
      className="icon"
      onClick={toggleProfileVisibility}
    />

<FontAwesomeIcon 
  
  onClick={() => setIsProfileVisible(!isProfileVisible)} 
/>

<Profile 
  loggedIn={loggedIn}
  isVisible={isProfileVisible}
  onClose={() => setIsProfileVisible(false)}
  handleLogoutClick={handleLogoutClick}
/>

    {/* Cart icon that navigates to /cart */}
    <Link to="/cart">
      <FontAwesomeIcon icon={faCartShopping} className="icon" />
    </Link>
  </div>
</header>


      {/* Background */}
      <div className="background-cover"></div>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="sidebar" ref={sidebarRef}>
          <div className="sidebar-header">
            <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={() => setIsSidebarOpen(false)} />
          </div>
          <ul className="sidebar-menu">
            {[
              { label: "ABOUT", route: "/about" },
              { label: "HOME", route: "/home" },
              { label: "SHOPS", route: "/shop" },
              { label: "SUPPORT", route: "/support" },
              { label: "SETTINGS", route: "/settings" }, // You can change this or handle it specially
            ].map((item, index) => (
              <li key={index} onClick={() => handleMenuClick(item.route)}>
                {item.label}
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

{/* Tabs */}
{!isModalOpen && (
  <div className="shop-tabs">
    <a
      ref={productsRef}
      href="#products"
      className={`tab ${activeTab === "products" ? "active" : ""}`}
      onClick={(e) => {
        e.preventDefault();
        setActiveTab("products");
        document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      PRODUCTS
    </a>
    <a
      ref={servicesRef}
      href="#services"
      className={`tab ${activeTab === "services" ? "active" : ""}`}
      onClick={(e) => {
        e.preventDefault();
        setActiveTab("services");
        document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      SERVICES
    </a>
  </div>
)}

      
          </div>
          
               
<div>
  {/* Only show button if the user is a student or seller */}
  {(userRole === "student" || userRole === "seller") && (
    <FontAwesomeIcon
      icon={faPlus}
      className="add-button"
      style={{ fontSize: "18px" }}
      onClick={() => setIsModalOpen(true)}
    />
  )}

  {/* Only show subscribe button if the user is a buyer */}
  {userRole === "buyer" && (
    <button className="subscribe-button">
      Subscribe
    </button>
  )}

      </div>

        </div>
      </div>


      {/* Rest of your components remain the same... */}

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

     
  {/* Popular Products Section */}
<div className="popular-products">
  <span className="popular-label">POPULAR</span>

  <div className="relative">
    <FontAwesomeIcon
      icon={faArrowRight}
      className={`scroll-arrow ${scrolledRight ? "rotate-180" : ""}`}
      onClick={() => {
        const scrollEl = productListRef.current;
        if (scrollEl) {
          if (scrolledRight) {
            // Scroll back to the start
            scrollEl.scrollTo({ left: 0, behavior: "smooth" });
          } else {
            // Scroll to the seventh product (if exists)
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
        gap: "0px",
        paddingRight: "40px",
      }}
    >
      {/* PRODUCT SECTION - shows only when "products" is active */}
      {activeTab === "products" && (
        <>
          <div className="product1-grid">
            {/* Product 1 */}
            <div className="product-item">
              <img
                src="https://i.imgur.com/YP2DSeS.png"
                alt="Ribbon Keychain"
                className="product-image"
              />
              <div className="product-name">Ribbon Keychain</div>
            </div>
            {/* Product 2 */}
            <div className="product-item">
              <img
                src="https://s3-alpha-sig.figma.com/img/3ab1/c59c/1a1f07801f5115381349e63f4c14f55e?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=HqnOSKBPbWe-~OuAn7WZQGAehGp~l4~D4hpohOnMQknH5MGA1XbjR7GEaOW8xGUO-zNGaZn8QrzF4Fi0I4wAzrH1A5oGV~57e9FrtpixDhhDsIUsjwSGVRQeQPjpETKnBzbLOD9VxKaERq-LWyFnTBWYHBnYQXRcnbmdsrqWk4yWPy6KGptmkyWQnCZTN8GX4SwZiXHpiQ5~9AWAHdKpcOmfhSVlK2FQ3nhM38EKM72fU4L-2UrUuoVGlnEvO8mJnNykJqhy9tak4P~shxu0Jhw8FX~yYs75grTZXu57vyKxyqTgJfYImdJilk9i0Lp9q3gg5X-E2Ww3r1RYbaZygA__"
                alt="Flower Bouquet"
                className="product-image"
              />
              <div className="product-name">Mini Flower Vase</div>
            </div>
          </div>
        </>
      )}
    </div>
  </div>
</div>


{/* PRODUCT2 SECTION */}
<div className="product2-section">
  {/* Label for Product Section */}
  {activeTab === "products" && (
    <span className="product2-sub-label">PRODUCT</span>
  )}

  <div className="product2-wrapper relative">
    {/* Arrow for scrolling */}
    <FontAwesomeIcon
      icon={faArrowRight}
      className={`product2-arrow ${scrolledRightProduct2 ? "rotate-180 left-arrow" : "right-arrow"}`}
      onClick={() => {
        const scrollEl = productList2Ref.current;
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
      }}
    />


   {/* Horizontally scrolling container */}
   <div
      ref={productList2Ref}
      className="product2-list no-scrollbar"
      style={{
        overflowX: "auto",
        scrollBehavior: "smooth",
        display: "flex",
        gap: "0px",
        paddingRight: "40px",
      }}
    ></div>
 {/* SERVICE SECTION - shows only when "services" is active */}
{activeTab === "services" && (
  <>
    <span className="service-label">SERVICES</span>
    <div className="service-grid">
      {/* Service 1 */}
      <div className="service-item">
        <img
          src="https://via.placeholder.com/300x300?text=Gift+Wrap"
          alt="Gift Wrapping"
          className="service-image"
        />
        <div className="service-name">Gift Wrapping</div>
      </div>

      {/* Service 2 */}
      <div className="service-item">
        <img
          src="https://via.placeholder.com/300x300?text=Custom+Card"
          alt="Customized Card"
          className="service-image"
        />
        <div className="service-name">Customized Cards</div>
      </div>
    </div>
  </>
)}


    {/* PRODUCT SECTION - shows only when "products" is active */}
    {activeTab === "products" && (
      <div className="product2-grid">
        {/* Product 1 */}
        <div className="product-item">
          <img
            src="https://i.imgur.com/YP2DSeS.png"
            alt="Ribbon Keychain"
            className="product-image"
          />
          <div className="product-name">Ribbon Keychain</div>
        </div>

        {/* Product 2 */}
        <div className="product-item">
          <img
            src="https://i.imgur.com/NVsvQPC.png"
            alt="Flower Bouquet"
            className="product-image"
          />
          <div className="product-name">Mini Flower Vase</div>
        </div>
      </div>
    )}
 


    <div
      ref={productList2Ref}
      className="product2-list no-scrollbar"
    >

     
         
      {isModalVisible && selectedProduct && (
        <div className="product-modal">
          <div className="modal-content">
            <button className="close-modal" onClick={closeModal}>X</button>
            <h2>{selectedProduct.name}</h2>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="modal-product-image"
            />
            <p>{selectedProduct.description}</p>
            <p>Price: ${selectedProduct.price}</p>
            {/* Add more product details if needed */}
          </div>
        </div>
      )}  


      { isProfileVisible && (
        <div className="profileWrapper" ref={profileRef}>
             <div className="profileCard">
               <div className="profileBackground">
                 <div className="profilePicture" />
                 <div className="profileLabel">Profile</div>
                 <div className="profileCircle">
                   <div className="statusPrimary">
                     <div className="checkPrimary" />
                   </div>
                 </div>
                 <div className="profileBanner" />
                 <div className="profileBanner_1" />
                 <div className="profileRec" />
       
                 <div className="profileLinkOr" onClick={() => navigate('/order')}>
                   <FontAwesomeIcon icon={faBagShopping} className="iconStyleProfile" /> Order
                 </div>
       
                 <div className="profileLinkCar" onClick={() => navigate('/cart')}>
                   <FontAwesomeIcon icon={faCartPlus} className="iconStyleProfile" /> Cart
                 </div>
       
                 <div className="profileSellerLabel">Seller</div>
                 <div className="profileAddressLabel">Sto. Nino, Lapasan, CDO</div>
                 <div className="profileOrdersTitle">Orders & Purchases</div>
                 <div className="profileInfoTitle">Personal Information</div>
       
                 <div className="profileEmail">Name: Sissy Shey</div>
                 <div className="profileEmail">Email: shelayamba@gmail.com</div>
                 <div className="profilePhone">Phone Number: 63+ 9771234545</div>
                 <div className="profileAddress">Address: Sto. Nino, Lapasan, CDO</div>
       
                 <div className="profileLogout1" onClick={handleLogoutClick}>Log out</div>
               </div>
             </div>
           </div>
      )}
    </div>
         
  
    </div>
  </div> 
   </section>

    
  );

  
};

export default MyShop;