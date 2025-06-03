import React, { useState, useEffect, useRef } from 'react';
import '../style/PostProduct.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const PostProduct = ({ onPost, currentUser }) => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('product');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  const modalRef = useRef();

  const handleSubmit = () => {
    if (!productName || !price || !category || !imageUrl) {
      setError('Please fill out all fields and provide an image URL.');
      return;
    }

    const newProduct = {
      id: Date.now(),
      productName,
      price: parseFloat(price),
      category,
      imageUrl,
      seller: currentUser?.username || 'Anonymous',
    };

    const existing = JSON.parse(localStorage.getItem('products') || '[]');
    const updated = [newProduct, ...existing];
    localStorage.setItem('products', JSON.stringify(updated));

    if (onPost) onPost(updated);

    // Reset form
    setProductName('');
    setPrice('');
    setCategory('product');
    setImageUrl('');
    setError('');
  };

  const handleClose = () => setIsVisible(false);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="postProductContainer">
      <div className="postProductCard" ref={modalRef}>
        <button className="closeButton" onClick={handleClose}>
          <FontAwesomeIcon icon={faTimes} size="lg" color="#843b62" />
        </button>

        <div className="postHeader">POST A NEW PRODUCT</div>
        <div className="productForm">

          <div className="textFieldPost">
            <div className="inputContentPost">
              <label className="inputTextPost">Image URL</label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Enter image URL"
                className="inputBoxPost"
              />
            </div>
          </div>

          <div className="textFieldPost">
            <div className="inputContentPost">
              <label className="inputTextPost">Product Name</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter product name"
                className="inputBoxPost"
              />
            </div>
          </div>

          <div className="textFieldPost">
            <div className="inputContentPost">
              <label className="inputTextPost">Price</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
                className="inputBoxPost"
              />
            </div>
          </div>

          <div className="categorySelectionPost">
            <label className="inputTextPost">Select Category</label>
            <div className="radioButtonsPost">
              <label>
                <input
                  type="radio"
                  name="category"
                  value="product"
                  checked={category === 'product'}
                  onChange={(e) => setCategory(e.target.value)}
                />
                Product
              </label>
              <label>
                <input
                  type="radio"
                  name="category"
                  value="service"
                  checked={category === 'service'}
                  onChange={(e) => setCategory(e.target.value)}
                />
                Service
              </label>
            </div>
          </div>

          {error && <div className="errorText">{error}</div>}

          <button className="submitButton" onClick={handleSubmit}>
            <span className="labelText">Post</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostProduct;
