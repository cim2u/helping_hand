import React, { useState } from 'react';
import '../style/PostProduct.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

const PostProduct = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('product');
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleSubmit = () => {
    if (!productName || !price || !category || !imagePreview) {
      setError('Please fill out all fields and upload an image.');
      return;
    }
    setError('');
    console.log('Product Name:', productName);
    console.log('Price:', price);
    console.log('Category:', category);
    console.log('Image:', imagePreview); // Just the preview URL for now

    // Reset form fields after submission
    setProductName('');
    setPrice('');
    setCategory('product');
    setImagePreview(null);
  };

  return (
    <div className="postProductContainer">
      <div className="postProductCard">
        <div className="postHeader">POST A NEW PRODUCT</div>
        <div className="productForm">
          {/* Image Upload */}
          <div className="imageUploadSectionPost">
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="previewImagePost" />
            ) : (
              <div className="uploadPlaceholderPost">Post your image</div>
            )}

            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />

            <label htmlFor="imageUpload" className="circlePlusPost">
              <FontAwesomeIcon icon={faCirclePlus} size="2x" color="#843b62" />
            </label>
          </div>

          {/* Product Name */}
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

          {/* Price */}
          <div className="textFieldPost">
            <div className="inputContentPost">
              <label className="inputTextPost">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
                className="inputBoxPost"
              />
            </div>
          </div>

          {/* Category Radio */}
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

          {/* Error Message */}
          {error && <div className="errorText">{error}</div>}

          {/* Submit */}
          <button className="submitButton" onClick={handleSubmit}>
            <span className="labelText">Post</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostProduct;
