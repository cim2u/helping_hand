import React, { useState, useEffect, useRef } from 'react';
import '../style/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCartShopping, faUser, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import logoImage from "../assets/Logo.png";

const Home = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const [selectedProduct, setSelectedProduct] = useState(null); // Selected product for the modal

  const navigate = useNavigate();
  const location = useLocation();
  const sidebarRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const registeredStatus = localStorage.getItem('isRegistered') === 'true';
    const subscribedStatus = localStorage.getItem('isSubscribed') === 'true';
    const loggedInStatus = localStorage.getItem('loggedIn') === 'true';
    let role = localStorage.getItem('userRole');

    if (location.pathname === '/myshop') {
      if (role !== 'student') {
        alert('You must be a student to access this page!');
        navigate('/home');
        return;
      }
      if (!loggedInStatus) {
        alert('Please log in first!');
        navigate('/login');
        return;
      }
    }

    setIsRegistered(registeredStatus);
    setIsSubscribed(subscribedStatus);
    setLoggedIn(loggedInStatus);
    setUserRole(role);

    if (loggedInStatus) {
      navigate('/home');
    }

    fetchProducts();
  }, [navigate, location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    // Disable body scroll when modal is visible
    if (isModalVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto'; // Reset scroll when component unmounts
    };
  }, [isModalVisible]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://your-api.com/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setProducts([]); // Empty products array if fetching fails
    }
  };

  const handleLoginClick = () => navigate('/login');
  const handleSignUpClick = () => navigate('/signup');
  const handleSubscribeClick = () => {
    if (!isSubscribed) navigate('/subscribe');
  };
  const handleLogoutClick = () => {
    localStorage.clear();
    setIsRegistered(false);
    setIsSubscribed(false);
    setLoggedIn(false);
    alert("You have logged out.");
    navigate('/about');
  };
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleProfile = () => setIsProfileVisible(!isProfileVisible);

  // Function to handle product click
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true); // Show modal
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedProduct(null);
  };

  return (
    <div className="home-wrapper">
      <header className="header-cover">
        <div className="logoContainer">
          <img src={logoImage} alt="HelpingHand Logo" className="logoLarge" />
        </div>

        <div className="icon-container">
          <FontAwesomeIcon icon={faBars} className="icon" onClick={toggleSidebar} />
          <FontAwesomeIcon icon={faUser} className="icon" onClick={toggleProfile} />
          <FontAwesomeIcon icon={faCartShopping} className="icon" />
        </div>

        <div className="buttons-container">
          {!isRegistered && (
            <>
              <button className="login-button" onClick={handleLoginClick}>LOGIN</button>
              <button className="signup-button" onClick={handleSignUpClick}>SIGN UP</button>
            </>
          )}

          {isRegistered && !isSubscribed && (
            <button className="h-subscribe-button" onClick={handleSubscribeClick}>SUBSCRIBE</button>
          )}
        </div>
      </header>

      {isSidebarOpen && (
        <aside className="sidebar" ref={sidebarRef}>
          <div className="sidebar-header">
            <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={toggleSidebar} />
          </div>
          <ul className="sidebar-menu">
            <li onClick={() => navigate('/about')}>ABOUT</li>
            <li onClick={() => navigate('/home')}>HOME</li>
            <li onClick={() => navigate('/support')}>SUPPORT</li>
            {isRegistered && (
              <>
                <li onClick={() => navigate('/shop')}>SHOPS</li>
                {userRole === 'student' && <li onClick={() => navigate('/myshop')}>MYSHOP</li>}
                <li onClick={() => navigate('/settings')}>SETTINGS</li>
              </>
            )}
          </ul>
        </aside>
      )}

      <section className="white-section">
        <div className="banner">
          {isRegistered && <h1 className="banner-text">WELCOME TO HELPING HAND!</h1>}
        </div>

        <div className="product-grid">
  {/* Display dynamically fetched products or fallback if empty */}
  {products.length > 0 ? (
    products.map((product) => (
      <div
        key={product.id} // Assuming each product has a unique id
        className="product-item"
        onClick={() => handleProductClick(product)}
      >
        <img
          src={product.image || "fallback-image-url"} // Fallback in case image is broken
          alt={product.name}
          className="product-image"
        />
        <div className="product-name">{product.name}</div>
      </div>
    ))
  ) : (
    <div className="no-products">No products available at the moment.</div>
  )}

  {/* Manually added product 1: Ribbon Keychain */}
  <div className="product-item" onClick={() => handleProductClick({
    name: "Ribbon Keychain",
    image: "https://s3-alpha-sig.figma.com/img/4fa2/b3f8/f870a7275fbe1366a676f28195402bd6?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=UColHrM4-CRvdCCPTBH63CswPqYJ5RNZRge7rMeyjBCFjiw0-uoCZDjfaR6CRbfvRHEHWfeSp9~h2fwNO1v3OR1fGsycyUaeQRXbTeo-6-osU60z3b6lE2yduAcQkjxqkA0f2YHszHb3tHT3GWv6lOcxHMaft5ZzdWYsL2yGOTnzI5qIz0SaZzAO~Aj1-UM-x-xTgvpIkuX-nH9BhP1RYA4wOSF0abbAhFYVO2eexMKiOyx5Ot6xkHmoAOr32bCE-7uv7TmowZTeDVn4cmeh0V96J56qzBWpzusW1q7y77rOgr~IC5Cr-xHsgDaWMqaOnTIei7AtF10jqPidtX~7XQ",
    description: "A cute ribbon keychain, perfect for gifting.",
    price: 15.00
  })}>
    <img
      src="https://s3-alpha-sig.figma.com/img/4fa2/b3f8/f870a7275fbe1366a676f28195402bd6?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=UColHrM4-CRvdCCPTBH63CswPqYJ5RNZRge7rMeyjBCFjiw0-uoCZDjfaR6CRbfvRHEHWfeSp9~h2fwNO1v3OR1fGsycyUaeQRXbTeo-6-osU60z3b6lE2yduAcQkjxqkA0f2YHszHb3tHT3GWv6lOcxHMaft5ZzdWYsL2yGOTnzI5qIz0SaZzAO~Aj1-UM-x-xTgvpIkuX-nH9BhP1RYA4wOSF0abbAhFYVO2eexMKiOyx5Ot6xkHmoAOr32bCE-7uv7TmowZTeDVn4cmeh0V96J56qzBWpzusW1q7y77rOgr~IC5Cr-xHsgDaWMqaOnTIei7AtF10jqPidtX~7XQ"
      alt="Ribbon Keychain"
      className="product-image"
    />
    <div className="product-name">Ribbon Keychain</div>
  </div>

  {/* Manually added product 2: Mini Flower Vase */}
  <div className="product-item" onClick={() => handleProductClick({
    name: "Mini Flower Vase",
    image: "https://s3-alpha-sig.figma.com/img/3ab1/c59c/1a1f07801f5115381349e63f4c14f55e?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=HqnOSKBPbWe-~OuAn7WZQGAehGp~l4~D4hpohOnMQknH5MGA1XbjR7GEaOW8xGUO-zNGaZn8QrzF4Fi0I4wAzrH1A5oGV~57e9FrtpixDhhDsIUsjwSGVRQeQPjpETKnBzbLOD9VxKaERq-LWyFnTBWYHBnYQXRcnbmdsrqWk4yWPy6KGptmkyWQnCZTN8GX4SwZiXHpiQ5~9AWAHdKpcOmfhSVlK2FQ3nhM38EKM72fU4L-2UrUuoVGlnEvO8mJnNykJqhy9tak4P~shxu0Jhw8FX~yYs75grTZXu57vyKxyqTgJfYImdJilk9i0Lp9q3gg5X-E2Ww3r1RYbaZygA__",
    description: "A beautiful mini flower vase that adds charm to any space.",
    price: 25.00
  })}>
    <img
      src="https://s3-alpha-sig.figma.com/img/3ab1/c59c/1a1f07801f5115381349e63f4c14f55e?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=HqnOSKBPbWe-~OuAn7WZQGAehGp~l4~D4hpohOnMQknH5MGA1XbjR7GEaOW8xGUO-zNGaZn8QrzF4Fi0I4wAzrH1A5oGV~57e9FrtpixDhhDsIUsjwSGVRQeQPjpETKnBzbLOD9VxKaERq-LWyFnTBWYHBnYQXRcnbmdsrqWk4yWPy6KGptmkyWQnCZTN8GX4SwZiXHpiQ5~9AWAHdKpcOmfhSVlK2FQ3nhM38EKM72fU4L-2UrUuoVGlnEvO8mJnNykJqhy9tak4P~shxu0Jhw8FX~yYs75grTZXu57vyKxyqTgJfYImdJilk9i0Lp9q3gg5X-E2Ww3r1RYbaZygA__"
      alt="Mini Flower Vase"
      className="product-image"
    />
    <div className="product-name">Mini Flower Vase</div>
  </div>
</div>

      </section>
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


      {loggedIn && isProfileVisible && (
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
              <div className="profileAddressLabel">Sto. Nino, Lapasan, CDO</div>
              <div className="profileOrdersTitle">Orders & Purchases</div>
              <div className="profileInfoTitle">Personal Information</div>
              <div className="profileLink">Order</div>
              <div className="profileLink">Cart</div>
              <div className="profileEmail">Name: Sissy Shey</div>
              <div className="profileEmail">Email: shelayamba@gmail.com</div>
              <div className="profilePhone">Phone Number: 63+ 9771234545</div>
              <div className="profileAddress">Address: Sto. Nino, Lapasan, CDO</div>
              <div className="profileLogout" onClick={handleLogoutClick}>Log out</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
