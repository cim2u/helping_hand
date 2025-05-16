import React, { useEffect, useState, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "../style/MyShop.css";
import "../style/Home.css"
import PaymentConfirmationModal from '../components/PaymentConfirmationModal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUser,
  faCartShopping,
  faTimes,
  faCirclePlus,
  faArrowRight,
  faBagShopping,
  faCartPlus,faCircleUser, faCamera
} from "@fortawesome/free-solid-svg-icons";
import logoImage from "../assets/Logo.png";
import Profile from '../components/ProfileModal';
import { Link } from 'react-router-dom';
import PostProduct from '../components/PostProduct.jsx'; // Import the PostProduct component



const MyShop = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Or false depending on logic
    const [isRegistered, setIsRegistered] = useState(false);
 const paymentModalRef = useRef();
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'default');
  
      useEffect(() => {
        setTheme(localStorage.getItem('theme') || 'default');
      }, []);

  const toggleProfileVisibility = () => {
    console.log("Profile visibility toggled:", !isProfileVisible);
    setIsProfileVisible(!isProfileVisible);
  };


  const fileInputRef = useRef(null);


const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
  }
};

  const handleProfileClick = () => {
  if (fileInputRef.current) {
    fileInputRef.current.click();
  }
};

    const [isRatingVisible, setIsRatingVisible] = useState(false); // State to control rating visibility
  const [ratingValue, setRatingValue] = useState(0); // Track selected rating

  const handleStarClick = (rating) => {
    setRatingValue(rating);
  };

  const handleSubmitRating = () => {
    // Implement your logic to submit the rating
    console.log(`Submitted rating: ${ratingValue}`);
    setIsRatingVisible(false); // Close rating section after submission
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


const handleLogoutClick = () => {
  localStorage.clear();         // Clear auth and role flags
  setIsLoggedIn(false);         // Update global auth state
  setIsSubscribed(false);       // Optional: reset subscription
              // Optional: reset admin
  alert("You have logged out.");
  navigate("/about");           // Go back to About or Login
};

useEffect(() => {
  if (isModalVisible) {
    document.body.style.overflow = 'hidden'; // Lock scroll
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
  } else {
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
  }

  // Cleanup on unmount or when modal closes
  return () => {
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
  };
}, [isModalVisible]);


  const productListRef = useRef(null);
  const productList2Ref = useRef(null);  // For Product2
  const productsRef = useRef(null);
  const servicesRef = useRef(null);
  const sidebarRef = useRef(null); // Reference for sidebar
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };


  const handleBuyNow = (product) => {
    setSelectedProduct(product);
    paymentModalRef.current?.openModal(); // Triggers the modal
  };
  

// Add to Cart Handler
  // Add to Cart Handler
  const handleAddToCart = () => {
    // Logic to add the product to the cart
    console.log('Product added to cart:', selectedProduct);

    // Navigate to the /cart page after adding to cart
    navigate('/cart');
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

 
  const modalRef = useRef(null);

  // Close modal if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

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
    navigate('/subscribe');
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
   <div className="logoContainer">
          <img src={logoImage} alt="HelpingHand Logo" className="logoLarge" />
        </div>

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

{/* profile icon */}
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
             <li key={index} onClick={() => handleMenuClick(item.route)} style={{ cursor: 'pointer' }}>
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}


      {/* Profile Banner */}
      <div className="profile-banner">
        <div className="profile-info">
          <div className="profile-pic-wrapper">
            <img
              src={profileImage || "https://i.imgur.com/ZVPfn6h.png"}
              alt="Profile"
              className="profile-pic"
            />
          </div>
          <div>
            <h2 className="shop-owner-name">{shopName}</h2>
            <p className="shop-owner-handle">{sellerUsername}</p>
            {!isSubscribed && (
        <button className="h1-subscribe-button" onClick={handleSubscribeClick}>
        SUBSCRIBE
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
     <div>
      {/* Add button visible only for student or seller roles */}
      {(userRole === 'student' || userRole === 'seller') && (
        <FontAwesomeIcon
          icon={faCirclePlus}
          className="home-add-button"
          onClick={() => setIsModalOpen(true)}
        />
      )}

      {/* Post Product Modal */}
      {isModalOpen && (
        <div className="post-modal-overlay">
          <div className="post-modal-content" ref={modalRef}>
            <PostProduct />
            <button
              onClick={() => setIsModalOpen(false)}
              className="post-close-button"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
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

  


     
  {/* Popular Products Section */}
<div className="popular-products">
  <span className="popular-label">POPULAR</span>

  <div className="relative">
   

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
    <>
  <div className="product1-grid">
    {/* Product 1 */}
    <div className="product-item" onClick={() => handleProductClick({
    name: "Ribbon Keychain",
    image: "https://i.imgur.com/YP2DSeS.png",
    seller: "Sissy Shyey.",
    price: 15.00
  })}>
    <img src="https://i.imgur.com/YP2DSeS.png" alt="Ribbon Keychain" className="product-image" />
    <div className="product-name">Ribbon Keychain</div>
  </div>
    {/* Product 2 */}
  <div className="product-item" onClick={() => handleProductClick({
    name: "Ukay-Ukay",
    image: "https://i.imgur.com/v1VcOJ8.jpeg",
    description: "Reusable eco-friendly tote bag.",
    price: 20.00
  })}>
    <img src="https://i.imgur.com/v1VcOJ8.jpeg" alt="Ukay-Ukay" className="product-image" />
    <div className="product-name">Ukay-Ukay</div>
  </div>
    <div className="product-item" onClick={() => handleProductClick({
    name: "Handmade Flower Bouquet",
    image: "https://i.imgur.com/mLTxJQf.png",
    description: "Handcrafted notebook made from recycled materials.",
    price: 18.00
  })}>
    <img src="https://i.imgur.com/mLTxJQf.png" alt="handmade Flower Bouquet" className="product-image" />
    <div className="product-name">Handmade Flower Bouquet</div>
  </div>

  <div className="product-item" onClick={() => handleProductClick({
    name: "Handmade Flower Bouquet",
    image: "https://i.imgur.com/Tc4gW95.png",
    description: "Set of 4 wooden coasters with a rustic feel.",
    price: 12.00
  })}>
    <img src="https://i.imgur.com/Tc4gW95.png" alt="Handmade Flower Bouquet" className="product-image" />
    <div className="product-name">Handmade Flower Bouquet</div>
  </div>
  </div>
</>

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
 <div
  className="service-item"
  onClick={() =>
    handleProductClick({
      name: "Homework",
      image: "",
      description: "Homework assistance for various subjects.",
      price: 0,
    })
  }
>
  <div className="service-image-gradient">Homework</div>
  <div className="service-name">Homework</div>
</div>


      {/* Add more services as needed */}
    </div>
  </>
)}




    {/* PRODUCT SECTION - shows only when "products" is active */}
    {activeTab === "products" && (
      <div className="product2-grid">
        {/* Product 1 */}
        <div className="product-item" onClick={() => handleProductClick({
    name: "Ribbon Keychain",
    image: "https://i.imgur.com/YP2DSeS.png",
    seller: "Sissy Shyey.",
    price: 15.00
  })}>
    <img src="https://i.imgur.com/YP2DSeS.png" alt="Ribbon Keychain" className="product-image" />
    <div className="product-name">Ribon Keychain</div>
  </div>

   
 <div className="product-item" onClick={() => handleProductClick({
    name: "Handmade Flower Bouquet",
    image: "https://i.imgur.com/63rt8SJ.png",
    description: "Handmade bracelet with colorful beads.",
    price: 10.00
  })}>
    <img src="https://i.imgur.com/63rt8SJ.png" alt="Handmade Flower Bouquet" className="product-image" />
    <div className="product-name">Handmade Flower Bouquet</div>
  </div>
      </div>
    )}
 


    <div
      ref={productList2Ref}
      className="product2-list no-scrollbar"
    >

     
         
  {isModalVisible && selectedProduct && (
  <div className="product-modal" onClick={closeModal}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <div className="modal-rec"></div>

      {/* Product Image */}
     {selectedProduct.image ? (
          <div className="modal-rec-product">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="modal-product-image"
            />
          </div>
      ) : (
        <p>Image not available</p>
      )}

      {/* Product Details */}
      <p className="seller-display">{selectedProduct.seller || "Unknown Seller"}</p>
      <p className="price-display">₱{selectedProduct.price}</p>

      {/* Product Rating */}
      <div className="rating-display">
        <p>Rating:</p>
        {/* Display the average rating */}
        <span className="rating">{selectedProduct.rating || "No ratings yet"}</span>
        {/* You can also implement a rating system (stars, etc.) here */}
      </div>

   
      <div className="modal-actions">
        <button className="add-to-cart-button-home" onClick={handleAddToCart}>
          Add to Cart
        </button>
        <button
          className="buy-now-btn-home"
          onClick={() => handleBuyNow(selectedProduct)}
        >
          BUY NOW
        </button>
      </div>
    </div>
  </div>
)}

{/* Payment Confirmation Modal */}
<PaymentConfirmationModal
  ref={paymentModalRef}
  selectedProduct={selectedProduct}
/>


      { isProfileVisible && (
         <div className="profileWrapper" ref={profileRef}>
              <div className="profileCard">
                <div className="profileBackground">
        
                  <div className="profilePicture" onClick={handleProfileClick} title="Click to change profile picture">
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="profileImage" />
          ) : (
            <>
              <FontAwesomeIcon icon={faCircleUser} className="defaultProfileIcon" />
              <span className="uploadText">Upload Profile</span>
            </>
          )}
          <div className="cameraOverlay">
            <FontAwesomeIcon icon="fa-solid fa-camera" className="cameraIcon" />
          </div>
        </div>
        
        
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
        
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