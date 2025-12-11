// Cart.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  applyCoupon,
} from "./Store";
import SendOrderEmail from "./SendorderEmail";
import "./Cart.css";
import { useNavigate } from "react-router-dom"

function Cart() {
  const cart = useSelector((state) => state.cart);
  const couponState = useSelector((state) => state.coupon);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [couponInput, setCouponInput] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [showQuickButtons, setShowQuickButtons] = useState(false);

  // Unified function to apply coupon
  const applyCouponCode = (code) => {
    if (!code) return;
    dispatch(applyCoupon(code.trim().toUpperCase()));
    setCouponInput(code.trim().toUpperCase());
    setShowQuickButtons(true); // Show quick buttons after applying
  };

  // Billing calculations
  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const discountAmount = couponState.applied
    ? (totalAmount * couponState.discountPercentage) / 100
    : 0;
  const priceAfterDiscount = totalAmount - discountAmount;
  const gst = priceAfterDiscount * 0.18;
  const netAmount = Number((priceAfterDiscount + gst).toFixed(2));

  return (
    <div className="cart-page">
      <h1 className="cart-title">Your Cart</h1>

      {cart.length === 0 && <h3 className="empty">Cart is Empty</h3>}

      {cart.length > 0 && (
        <div className="cart-container">
          {/* Cart Items */}
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-card">
                <img src={item.img} alt={item.name} className="cart-img" />
                <div className="cart-info">
                  <h3>{item.name}</h3>
                  <p>₹ {item.price}</p>
                  <div className="qty-box">
                    <button onClick={() => dispatch(decreaseQuantity(item))}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => dispatch(addToCart(item))}>+</button>
                  </div>
                  <button
                    onClick={() => dispatch(removeFromCart(item))}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Billing Summary */}
          <div className="billing-summary">
            <h2>Billing Summary</h2>

            {/* Coupon Section */}
            <div className="coupon-box">
              <input
                type="text"
                placeholder="Enter Coupon Code"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                className="coupon-input"
              />
              <button
                onClick={() => applyCouponCode(couponInput)}
                className="apply-btn"
              >
                APPLY
              </button>

              {/* Quick Discount Buttons */}
              <div className="discount-buttons" style={{ marginTop: "10px" }}>
                <button
                  className="green-btn"
                  onClick={() => applyCouponCode("DISCOUNT10")}
                >
                  10% OFF
                </button>
                <button
                  className="green-btn"
                  onClick={() => applyCouponCode("DISCOUNT20")}
                >
                  20% OFF
                </button>
                <button
                  className="green-btn"
                  onClick={() => applyCouponCode("DISCOUNT30")}
                >
                  30% OFF
                </button>
              </div>

              {couponState.message && (
                <p
                  style={{
                    color: couponState.applied ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {couponState.message}
                </p>
              )}
            </div>

            {/* Billing Details */}
            <div className="billing-details">
              <p>Total: ₹{totalAmount.toFixed(2)}</p>
              {couponState.applied && (
                <p>
                  Discount ({couponState.discountPercentage}%): -₹
                  {discountAmount.toFixed(2)}
                </p>
              )}
              <p>After Discount: ₹{priceAfterDiscount.toFixed(2)}</p>
              <p>GST (18%): ₹{gst.toFixed(2)}</p>
              <h3>Net Amount: ₹{netAmount}</h3>
            </div>

            {/* Email Section */}
            <div className="email-section">
              <input
                type="email"
                placeholder="Enter your email"
                className="email-input"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
            </div>

            {/* Send Email */}
            <SendOrderEmail
              cart={cart}
              netAmount={netAmount}
              tax={gst}
              totalAmount={totalAmount}
              discount={discountAmount}
              customer={{ name: "", email: customerEmail || "" }}
            />

            {/* Navigate to Payment */}
            <button
              onClick={() => navigate("/payment")}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                background: "green",
                color: "white",
                borderRadius: "8px",
                border: "none",
              }}
            >
              Proceed to Payment
            </button>

            {/* Clear Cart */}
            <button
              onClick={() => dispatch(clearCart())}
              className="clear-btn"
              style={{ marginTop: 20 }}
            >
              CLEAR CART
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
