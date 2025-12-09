import React, { useEffect, useState } from "react";
import "./Orders.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  return (
    <div className="orders-wrapper">
      <h1 className="orders-heading">📦 Your Orders</h1>

      {orders.length === 0 ? (
        <p className="empty-text">No orders found.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order, index) => (
            <div key={index} className="order-box">
              <div className="order-top">
                <span className="order-id">Order #{order.id}</span>
                <span className="order-date">🗓 {order.date}</span>
              </div>

              <div className="order-items">
                {order.items.map((item, i) => (
                  <div key={i} className="order-item">
                    <img src={item.img} alt={item.name} className="item-img" />
                    <span>{item.name}</span>
                    <span className="qty">x{item.qty}</span>
                    <span className="price">₹{item.price}</span>
                  </div>
                ))}
              </div>

              <div className="order-bottom">
                <span className="total">Total: ₹{order.total}</span>
                <span className="status delivered">Delivered ✔</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
