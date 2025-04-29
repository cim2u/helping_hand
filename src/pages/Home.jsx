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

        <div className="products-grid">
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
    <div className="no-products">.</div>
  )}


  {/* Row 1 */}
  <div className="product-item" onClick={() => handleProductClick({
    name: "Ribbon Keychain",
    image: "https://s3-alpha-sig.figma.com/img/4fa2/b3f8/f870a7275fbe1366a676f28195402bd6?...",
    description: "A cute ribbon keychain, perfect for gifting.",
    price: 15.00
  })}>
    <img src="https://s3-alpha-sig.figma.com/img/4fa2/b3f8/f870a7275fbe1366a676f28195402bd6?..." alt="Ribbon Keychain" className="product-image" />
    <div className="product-name">Ribbon Keychain</div>
  </div>

  <div className="product-item" onClick={() => handleProductClick({
    name: "Mini Flower Vase",
    image: "https://s3-alpha-sig.figma.com/img/3ab1/c59c/1a1f07801f5115381349e63f4c14f55e?...",
    description: "A beautiful mini flower vase that adds charm to any space.",
    price: 25.00
  })}>
    <img src="https://s3-alpha-sig.figma.com/img/3ab1/c59c/1a1f07801f5115381349e63f4c14f55e?..." alt="Mini Flower Vase" className="product-image" />
    <div className="product-name">Mini Flower Vase</div>
  </div>

  <div className="product-item" onClick={() => handleProductClick({
    name: "Beaded Bracelet",
    image: "https://via.placeholder.com/150",
    description: "Handmade bracelet with colorful beads.",
    price: 10.00
  })}>
    <img src="https://via.placeholder.com/150" alt="Beaded Bracelet" className="product-image" />
    <div className="product-name">Beaded Bracelet</div>
  </div>

  <div className="product-item" onClick={() => handleProductClick({
    name: "Crafted Notebook",
    image: "https://via.placeholder.com/150",
    description: "Handcrafted notebook made from recycled materials.",
    price: 18.00
  })}>
    <img src="https://via.placeholder.com/150" alt="Crafted Notebook" className="product-image" />
    <div className="product-name">Crafted Notebook</div>
  </div>

  <div className="product-item" onClick={() => handleProductClick({
    name: "Wooden Coasters",
    image: "https://via.placeholder.com/150",
    description: "Set of 4 wooden coasters with a rustic feel.",
    price: 12.00
  })}>
    <img src="https://via.placeholder.com/150" alt="Wooden Coasters" className="product-image" />
    <div className="product-name">Wooden Coasters</div>
  </div>

  <div className="product-item" onClick={() => handleProductClick({
    name: "Mini Canvas Art",
    image: "https://via.placeholder.com/150",
    description: "Tiny artwork perfect for small spaces and gifts.",
    price: 22.00
  })}>
    <img src="https://via.placeholder.com/150" alt="Mini Canvas Art" className="product-image" />
    <div className="product-name">Mini Canvas Art</div>
  </div>

  {/* Row 2 */}
  <div className="product-item" onClick={() => handleProductClick({
    name: "Leather Wallet",
    image: "https://via.placeholder.com/150",
    description: "Stylish and durable leather wallet.",
    price: 30.00
  })}>
    <img src="https://via.placeholder.com/150" alt="Leather Wallet" className="product-image" />
    <div className="product-name">Leather Wallet</div>
  </div>

  <div className="product-item" onClick={() => handleProductClick({
    name: "Eco Tote Bag",
    image: "https://via.placeholder.com/150",
    description: "Reusable eco-friendly tote bag.",
    price: 20.00
  })}>
    <img src="https://via.placeholder.com/150" alt="Eco Tote Bag" className="product-image" />
    <div className="product-name">Eco Tote Bag</div>
  </div>

  <div className="product-item" onClick={() => handleProductClick({
    name: "Scented Candle",
    image: "https://via.placeholder.com/150",
    description: "Relaxing scented candle for home.",
    price: 16.00
  })}>
    <img src="https://via.placeholder.com/150" alt="Scented Candle" className="product-image" />
    <div className="product-name">Scented Candle</div>
  </div>

  <div className="product-item" onClick={() => handleProductClick({
    name: "Handmade Soap",
    image: "https://via.placeholder.com/150",
    description: "Organic handmade soap bars.",
    price: 8.00
  })}>
    <img src="https://via.placeholder.com/150" alt="Handmade Soap" className="product-image" />
    <div className="product-name">Handmade Soap</div>
  </div>

  <div className="product-item" onClick={() => handleProductClick({
    name: "Ceramic Mug",
    image: "https://via.placeholder.com/150",
    description: "Cute ceramic mugs for coffee lovers.",
    price: 14.00
  })}>
    <img src="https://via.placeholder.com/150" alt="Ceramic Mug" className="product-image" />
    <div className="product-name">Ceramic Mug</div>
  </div>

  <div className="product-item" onClick={() => handleProductClick({
    name: "Art Print",
    image: "https://via.placeholder.com/150",
    description: "High-quality wall art print.",
    price: 28.00
  })}>
    <img src="https://via.placeholder.com/150" alt="Art Print" className="product-image" />
    <div className="product-name">Art Print</div>
  </div>

  {/* Row 3 */}
  <div className="product-item" onClick={() => handleProductClick({
    name: "Planner 2025",
    image: "https://via.placeholder.com/150",
    description: "Minimalist 2025 planner.",
    price: 20.00
  })}>
    <img src="https://via.placeholder.com/150" alt="Planner 2025" className="product-image" />
    <div className="product-name">Planner 2025</div>
  </div>

  <div className="product-item" onClick={() => handleProductClick({
    name: "Knitted Scarf",
    image: "https://via.placeholder.com/150",
    description: "Warm and cozy knitted scarf.",
    price: 35.00
  })}>
    <img src="https://via.placeholder.com/150" alt="Knitted Scarf" className="product-image" />
    <div className="product-name">Knitted Scarf</div>
  </div>

  <div className="product-item" onClick={() => handleProductClick({
    name: "Pocket Mirror",
    image: "https://via.placeholder.com/150",
    description: "Small pocket mirror for everyday use.",
    price: 5.00
  })}>
    <img src="https://via.placeholder.com/150" alt="Pocket Mirror" className="product-image" />
    <div className="product-name">Pocket Mirror</div>
  </div>

  <div className="product-item" onClick={() => handleProductClick({
    name: "Handcrafted Ring",
    image: "https://via.placeholder.com/150",
    description: "Elegant handcrafted ring.",
    price: 45.00
  })}>
    <img src="https://via.placeholder.com/150" alt="Handcrafted Ring" className="product-image" />
    <div className="product-name">Handcrafted Ring</div>
  </div>

  <div className="product-item" onClick={() => handleProductClick({
    name: "Succulent Plant",
    image: "https://via.placeholder.com/150",
    description: "Low-maintenance succulent plant.",
    price: 18.00
  })}>
    <img src="https://via.placeholder.com/150" alt="Succulent Plant" className="product-image" />
    <div className="product-name">Succulent Plant</div>
  </div>

  <div className="product-item" onClick={() => handleProductClick({
    name: "Fridge Magnets",
    image: "https://via.placeholder.com/150",
    description: "Cute fridge magnets set.",
    price: 6.00
  })}>
    <img src="https://via.placeholder.com/150" alt="Fridge Magnets" className="product-image" />
    <div className="product-name">Fridge Magnets</div>
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
              </div >
              <div className="profileBanner"/>
              <div className="profileBanner_1"/>
              <div className="profileRec"/>
              <div className="profileSellerLabel">Seller</div>
              <div className="profileAddressLabel">Sto. Nino, Lapasan, CDO</div>
              <div className="profileOrdersTitle">Orders & Purchases</div>
              <div className="profileInfoTitle">Personal Information</div>
              <div className="profileLinkOr">Order</div>
              <div className="profileLinkCar">Cart</div>
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
