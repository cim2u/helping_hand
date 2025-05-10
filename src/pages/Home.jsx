import React, { useState, useEffect, useRef } from 'react';
import '../style/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faStore,faCartShopping, faUser, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import logoImage from "../assets/Logo.png"; 
import { Outlet } from 'react-router-dom';  
import Profile from '../components/ProfileModal'; // Adjust path as needed
import Cart from '../components/CartModal';  // Adjust the path if necessary
import { Link } from 'react-router-dom';
import LoginForm from "../pages/LogIn.jsx"
import PaymentConfirmationModal from '../components/PaymentConfirmationModal';






import { faCartPlus, faBagShopping } from '@fortawesome/free-solid-svg-icons';


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
  const [isLoggedIn, setIsLoggedIn] = useState(false); // default is false, change based on user login status
  const [isCartVisible, setIsCartVisible] = useState(false);
 
  const [cartItems, setCartItems] = useState([
    {
      id: 1, // Unique ID for the product
      name: 'Ribbon Keychain',
      seller: 'Sissy Shey',
      image: '', // Replace with your image
      quantity: 1,
      price: 10.0, // Example price
    },
  ]);
    const paymentModalRef = useRef();
  
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'default');

    useEffect(() => {
      setTheme(localStorage.getItem('theme') || 'default');
    }, []);
    
     // Handle adding a product to the cart (increment quantity)
  const increment = (productId) => {
    setCartItems(prevItems => prevItems.map(item =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };


  useEffect(() => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    // User is logged out — optionally adjust state or UI
    setIsLoggedIn(false); // if you're tracking it
  } else {
    setIsLoggedIn(true);
  }
}, []);

  
  // Handle removing a product from the cart (decrement quantity)
  const decrement = (productId) => {
    setCartItems(prevItems => prevItems.map(item =>
      item.id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  };

  // Handle "Buy Now" button click (pass the product info to the payment modal)

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


 
 


  
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarRef = useRef(null);
  const profileRef = useRef(null);

  // Function to handle login success
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsModalVisible(false); // Close the modal after login
    navigate("/home"); // Optional: Redirect user to home page after successful login
  };
  useEffect(() => {
    const registeredStatus = localStorage.getItem('isRegistered') === 'true';
    const subscribedStatus = localStorage.getItem('isSubscribed') === 'true';
    const loggedInStatus = localStorage.getItem('loggedIn') === 'true';
    let role = localStorage.getItem('userRole');

    if (location.pathname === '/store') {
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

    const handleBuyNow = (productId) => {
      const product = products.find(item => item.id === productId);
      setSelectedProduct(product); // Set selected product
      setIsModalVisible(false); // Close the product modal when "Buy Now" is clicked
      if (paymentModalRef.current) {
        paymentModalRef.current.open(product); // Pass product to PaymentConfirmationModal
      }
    };
  
    const closeModal = () => {
      setIsModalVisible(false); // Close product modal
    };
  

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
  localStorage.clear();         // Clear auth and role flags
  setIsLoggedIn(false);         // Update global auth state
  setIsSubscribed(false);       // Optional: reset subscription
              // Optional: reset admin
  alert("You have logged out.");
  navigate("/about");           // Go back to About or Login
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
          
          
    {loggedIn && (
  <>
    <FontAwesomeIcon icon={faUser} className="icon" onClick={toggleProfile} />
    <Link to="/cart">
      <FontAwesomeIcon icon={faCartShopping} className="icon" />
    </Link>
    {userRole === "buyer" ? (
      <></> // Nothing for buyers here if cart icon is already above
    ) : (
      <Link to="/store">
        <FontAwesomeIcon icon={faStore} className="icon" />
      </Link>
    )}
  </>
)}




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
      
      <li onClick={() => navigate('/settings')}>SETTINGS</li>
    </>
  )}
</ul>


        </aside>
      )}

<section className={`white-section ${theme}-theme`}>


        <div className="banner">
          {isRegistered && <h1 className="banner-text">WELCOME TO HELPING HAND!</h1>}
        </div>

    <div className="products-conatiner-home">
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
    image: "https://i.imgur.com/YP2DSeS.png",
    seller: "Sissy Shyey.",
    price: 15.00
  })}>
    <img src="https://i.imgur.com/YP2DSeS.png" alt="Ribbon Keychain" className="product-image" />
    <div className="product-name">Ribbon Keychain</div>
  </div>

  <div className="product-item" onClick={() => handleProductClick({
    name: "Handmade Flower Bouquet",
    image: "https://i.imgur.com/NVsvQPC.png",
    description: "A beautiful mini flower vase that adds charm to any space.",
    price: 25.00
  })}>
    <img src="https://i.imgur.com/NVsvQPC.png" alt="Handmade Flower Bouquet" className="product-image" />
    <div className="product-name">Handmade Flower Bouquet</div>
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

  <div className="product-item" onClick={() => handleProductClick({
    name: "Mini Petals",
    image: "https://i.imgur.com/BrjdqNZ.png",
    description: "Tiny artwork perfect for small spaces and gifts.",
    price: 22.00
  })}>
    <img src="https://i.imgur.com/BrjdqNZ.png" alt="Mini Petals" className="product-image" />
    <div className="product-name">Mini Petals</div>
  </div>

  {/* Row 2 */}
  <div className="product-item" onClick={() => handleProductClick({
    name: "Keychain",
    image: "https://i.imgur.com/gIXWMdd.jpeg",
    description: "Stylish and durable leather wallet.",
    price: 30.00
  })}>
    <img src="https://i.imgur.com/gIXWMdd.jpeg" alt="Keychain" className="product-image" />
    <div className="product-name">Keychain</div>
  </div>

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
    name: "Pants",
    image: "https://i.imgur.com/uImIE0Y.jpeg",
    description: "Relaxing scented candle for home.",
    price: 16.00
  })}>
    <img src="https://i.imgur.com/uImIE0Y.jpeg" alt="Pants" className="product-image" />
    <div className="product-name">Pants</div>
  </div>

  <div className="product-item" onClick={() => handleProductClick({
    name: "Crochet",
    image: "https://i.imgur.com/661gPWE.jpeg",
    description: "Organic handmade soap bars.",
    price: 8.00
  })}>
    <img src="https://i.imgur.com/661gPWE.jpeg" alt="Crochet" className="product-image" />
    <div className="product-name">Knitted Keychain</div>
  </div>

  <div className="product-item" onClick={() => handleProductClick({
    name: "Crochet",
    image: "https://i.imgur.com/vCRDjPq.jpeg",
    description: "Cute ceramic mugs for coffee lovers.",
    price: 14.00
  })}>
    <img src="https://i.imgur.com/vCRDjPq.jpeg" alt="Crochet" className="product-image" />
    <div className="product-name">Knitted Keychain</div>
  </div>

  <div className="product-item" onClick={() => handleProductClick({
    name: "Stickers",
    image: "https://i.imgur.com/1yi1ssN.jpeg",
    seller: "Sissy Shey.",
    price: 28.00
  })}>
    <img src="https://i.imgur.com/1yi1ssN.jpeg" alt="Stickers" className="product-image" />
    <div className="product-name">Stickers</div>
  </div>

  {/* Row 3 */}
  <div className="product-item" onClick={() => handleProductClick({
    name: "School Materials",
    image: "https://i.imgur.com/tC6O2qZ.jpeg",
    description: "Minimalist 2025 planner.",
    price: 20.00
  })}>
    <img src="https://i.imgur.com/tC6O2qZ.jpeg" alt="School Materials" className="product-image" />
    <div className="product-name">School Materials</div>
  </div>

  <div className="product-item" onClick={() => handleProductClick({
    name: "School Materials",
    image: "https://i.imgur.com/GrvU80B.jpeg",
    description: "Warm and cozy knitted scarf.",
    price: 35.00
  })}>
    <img src="https://i.imgur.com/GrvU80B.jpeg" alt="School Materials" className="product-image" />
    <div className="product-name">School Materials</div>
  </div>

  <div className="product-item" onClick={() => handleProductClick({
    name: "Pocket Mirror",
    image: "https://i.imgur.com/btWOA37.jpeg",
    description: "Small pocket mirror for everyday use.",
    price: 5.00
  })}>
    <img src="https://i.imgur.com/btWOA37.jpeg" alt="Pocket Mirror" className="product-image" />
    <div className="product-name">Knitted Keychain</div>
  </div>

  <div className="product-item" onClick={() => handleProductClick({
    name: "Handcrafted Ring",
    image: "https://i.imgur.com/iHduEMf.jpeg",
    description: "Elegant handcrafted ring.",
    price: 45.00
  })}>
    <img src="https://i.imgur.com/iHduEMf.jpeg" alt="Handcrafted Ring" className="product-image" />
    <div className="product-name">Handcrafted Beads Keychain</div>
  </div>

  <div
  className="product-item"
  onClick={() =>
    handleProductClick({
      name: "Succulent Plant",
      image: "https://i.imgur.com/5y2lqgD.png",
      description: "Low-maintenance succulent plant.",
      price: 18.00,
      unitPrice: 18.00
    })
  }
>
  <img
    src="https://i.imgur.com/5y2lqgD.png"
    alt="Succulent Plant"
    className="product-image"
  />
  <div className="product-name">Handmade Flower Bouquet</div>
</div>


  <div className="product-item" onClick={() => handleProductClick({
    name: "Fridge Magnets",
    image: "https://i.imgur.com/K9DMTgI.png",
    description: "Cute fridge magnets set.",
    price: 6.00
  })}>
    <img src="https://i.imgur.com/K9DMTgI.png" alt="Fridge Magnets" className="product-image" />
    <div className="product-name">Handmade Flower Bouquet</div>
  </div>
</div>
</div>
</section>


{isModalVisible && selectedProduct && (
  <div className="product-modal" onClick={closeModal}>
    {isRegistered ? (
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-rec"></div>

        {/* Product Image */}
        {selectedProduct.image ? (
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="modal-product-image"
          />
        ) : (
          <p>Image not available</p>
        )}

        {/* Product Details */}
        <p className="seller-display">{selectedProduct.seller || "Unknown Seller"}</p>
        <p className="price-display">₱{selectedProduct.price}</p>

        <div className="modal-actions">
          <button className="add-to-cart-button-home" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button
            className="buy-now-btn-home"
            onClick={() => handleBuyNow(selectedProduct)} // Pass full product object
          >
            BUY NOW
          </button>
        </div>
      </div>
    ) : (
      // Unregistered user - show sign-up modal
      <div className="unregisteredModalHome" onClick={(e) => e.stopPropagation()}>
        <div className="unregisteredModalInnerHome">
          <div className="unregisteredMessageHome">
            Please create an account before proceeding
          </div>
          <div
            className="unregisteredSignupFrameHome"
            onClick={() => navigate('/signup')}
          >
            <span className="unregisteredSignupTextHome">Sign Up</span>
          </div>
          <div className="unregisteredLoginPromptHome">
            Already have an account?{' '}
            <span
              onClick={() => navigate('/login')}
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
            >
              Log In
            </span>
          </div>
        </div>
      </div>
    )}
  </div>
)}

{/* Payment Confirmation Modal (receives selected product) */}
<PaymentConfirmationModal
  ref={paymentModalRef}
  selectedProduct={selectedProduct}
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


        <Outlet /> {/* Render nested routes here */}
      </div>
    );
};

export default Home;