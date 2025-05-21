import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CartProvider } from './CartContext'; // adjust path as needed
import { BrowserRouter } from 'react-router-dom';
import { OrderProvider } from './OrderContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <OrderProvider>
          <App />
        </OrderProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
