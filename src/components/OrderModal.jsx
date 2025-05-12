// src/components/OrderModal.jsx
import React from "react";
import "../style/OrderModal.css";

const orders = [
  {
    id: 1,
    img: "484966389_666914819395756_5237641564430598218_n.jpg",
    details: "Flower Seller: Sissy Shey\nQuantity: 1\nTotal: ₱50",
    top: 141,
  },
  {
    id: 2,
    img: "485083742_673045595101672_5844131352349017864_n.jpg",
    details: "Flower Seller: Sissy Shey\nQuantity: 1\nTotal: ₱50",
    top: 291,
  },
  {
    id: 3,
    img: "485084084_1112165540681126_7599136515896194202_n.jpg",
    details: "Flower Seller: Sissy Shey\nQuantity: 1\nTotal: ₱50",
    top: 438,
  },
  {
    id: 4,
    img: "484630322_1397836297874649_6871599780403657843_n.jpg",
    details: "Ribbon Keychain Seller: Sissy Shey\nQuantity: 1\nTotal: ₱50",
    top: 592,
  },
  {
    id: 5,
    img: "485088241_1824236381700946_8940563112907359901_n.jpg",
    details: "Flower Seller: Sissy Shey\nQuantity: 1\nTotal: ₱50",
    top: 746,
  },
];

const OrderModal = ({ onClose }) => {
  return (
    <div className="orderModalOverlay">
      <div className="orderContainer">
        <div className="orderCard"></div>
        <div className="orderHeader">Orders</div>
        <div className="orderTopBar"></div>
        <div className="bagIcon" />
        <button className="orderCloseBtn" onClick={onClose}>×</button>

        {orders.map((order) => (
          <div key={order.id}>
            <div
              className="orderImage"
              style={{ top: `${order.top}px`, backgroundImage: `url(${order.img})` }}
            />
            <div className="orderText" style={{ top: `${order.top + 23}px` }}>
              {order.details}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderModal;
