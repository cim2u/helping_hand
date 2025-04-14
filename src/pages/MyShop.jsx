import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../style/MyShop.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faCartShopping, faTimes, faPlus,faArrowRight} from "@fortawesome/free-solid-svg-icons";
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

  // Initialize subscription status and authentication alert
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
              {shopName || "SHOP NAME"}
            </h2>
            <p className="shop-owner-handle" >
              {sellerName}
            </p>

            {isSubscribed ? (
              <p className="h1-subscribe-button" >
                You are subscribed
              </p>
            ) : (
              <button
                className="h1-subscribe-button"
                onClick={handleSubscribeClick}
                
              >
                Subscribe
              </button>
            )}
        
  </div>
     {/* Always visible arrow icon */}
     <FontAwesomeIcon 
      icon={faArrowRight} 
      className="always-visible-arrow" 
      onClick={(e) => { 
        e.preventDefault();  // Prevents the default behavior like scrolling
        // Add any other desired functionality here
      }} 
    />
  </div>

  {/* Add Product Button */}
  <FontAwesomeIcon 
    icon={faPlus} 
    className="add-button" 
    style={{ fontSize: "24px" }}
    onClick={openModal} 
  />
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
      <div className="popular-section-title-container">
  <h2 className="popular-section-title">POPULAR</h2>
</div>
<div className="product-section-title-container">
      <h2 className="product-section-title">PRODUCT</h2>
    </div>


    <div className="white">
    <div className="product-section">
    </div>

    <div className="popular-product-section">

    </div>



   {/* PRODUCT SECTION - shows only when "products" is active */}
{activeTab === "products" && (
  <>
  
    
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
          src="https://s3-alpha-sig.figma.com/img/3ab1/c59c/1a1f07801f5115381349e63f4c14f55e?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=HqnOSKBPbWe-~OuAn7WZQGAehGp~l4~D4hpohOnMQknH5MGA1XbjR7GEaOW8xGUO-zNGaZn8QrzF4Fi0I4wAzrH1A5oGV~57e9FrtpixDhhDsIUsjwSGVRQeQPjpETKnBzbLOD9VxKaERq-LWyFnTBWYHBnYQXRcnbmdsrqWk4yWPy6KGptmkyWQnCZTN8GX4SwZiXHpiQ5~9AWAHdKpcOmfhSVlK2FQ3nhM38EKM72fU4L-2UrUuoVGlnEvO8mJnNykJqhy9tak4P~shxu0Jhw8FX~yYs75grTZXu57vyKxyqTgJfYImdJilk9i0Lp9q3gg5X-E2Ww3r1RYbaZygA__https://..."
          alt="Flower Bouquet"
          className="product-image"
        />
        <div className="product-name">Mini Flower Vase</div>
      </div>
    </div>
  </>
)}
  {/* Popular Products Section */}

 

  <div className="popular-product-grid">
    {/* Product 1 */}
    <div className="popular-product-item">
      <img
        src="https://s3-alpha-sig.figma.com/img/4fa2/b3f8/f870a7275fbe1366a676f28195402bd6?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=UColHrM4-CRvdCCPTBH63CswPqYJ5RNZRge7rMeyjBCFjiw0-uoCZDjfaR6CRbfvRHEHWfeSp9~h2fwNO1v3OR1fGsycyUaeQRXbTeo-6-osU60z3b6lE2yduAcQkjxqkA0f2YHszHb3tHT3GWv6lOcxHMaft5ZzdWYsL2yGOTnzI5qIz0SaZzAO~Aj1-UM-x-xTgvpIkuX-nH9BhP1RYA4wOSF0abbAhFYVO2eexMKiOyx5Ot6xkHmoAOr32bCE-7uv7TmowZTeDVn4cmeh0V96J56qzBWpzusW1q7y77rOgr~IC5Cr-xHsgDaWMqaOnTIei7AtF10jqPidtX~7XQ"
        alt="Ribbon Keychain"
        className="popular-product-image"
      />
      <div className="popular-product-name">Ribbon Keychain</div>
    </div>

    {/* Product 2 */}
    <div className="popular-product-item">
      <img
        src="https://s3-alpha-sig.figma.com/img/3ab1/c59c/1a1f07801f5115381349e63f4c14f55e?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=HqnOSKBPbWe-~OuAn7WZQGAehGp~l4~D4hpohOnMQknH5MGA1XbjR7GEaOW8xGUO-zNGaZn8QrzF4Fi0I4wAzrH1A5oGV~57e9FrtpixDhhDsIUsjwSGVRQeQPjpETKnBzbLOD9VxKaERq-LWyFnTBWYHBnYQXRcnbmdsrqWk4yWPy6KGptmkyWQnCZTN8GX4SwZiXHpiQ5~9AWAHdKpcOmfhSVlK2FQ3nhM38EKM72fU4L-2UrUuoVGlnEvO8mJnNykJqhy9tak4P~shxu0Jhw8FX~yYs75grTZXu57vyKxyqTgJfYImdJilk9i0Lp9q3gg5X-E2Ww3r1RYbaZygA__"
        alt="Flower Boquet"
        className="popular-product-image"
      />
      <div className="popular-product-name">Mini Flower Vase</div>
    </div>
  </div>
</div>



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
