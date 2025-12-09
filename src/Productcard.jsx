import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "./Store";
import "./ProductCard.css";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const [liked, setLiked] = useState(false);
  const [rating, setRating] = useState(product.rating || 0);

  // Popup states
  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState("");

  const handleAddToCart = () => {
    dispatch(addToCart(product));

    // Show popup only one time per click
    setMessageText(`🛒 ${product.name} added to cart!`);
    setShowMessage(true);

    // Auto hide after 1.5 sec
    setTimeout(() => {
      setShowMessage(false);
    }, 1500);
  };

  return (
    <>
      {/* ✅ ONE POPUP ONLY (GLOBAL ONCE) */}
      {showMessage && (
        <div className="popup-message-top">
          {messageText}
        </div>
      )}

      <div className="bb-card">

        {/* ♥ Like Button */}
        <div className="bb-label">
          <span
            className="bb-heart"
            onClick={() => setLiked(!liked)}
            style={{ color: liked ? "red" : "white" }}
          >
            ♥
          </span>
        </div>

        {/* Product Image */}
        <img src={product.img} alt={product.name} className="bb-img" />

        {/* Price Row */}
        <div className="bb-price-row">
          <span className="bb-price">₹{product.price}</span>
          {product.mrp && <span className="bb-mrp">₹{product.mrp}</span>}
        </div>

        {product.offer && <p className="bb-offer">{product.offer} OFF</p>}

        {/* Name + Pack */}
        <h3 className="bb-title">{product.name}</h3>
        {product.pack && <p className="bb-pack">{product.pack}</p>}

        {/* Star Rating */}
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((s) => (
            <span
              key={s}
              onClick={() => setRating(s)}
              style={{ color: s <= rating ? "gold" : "gray" }}
            >
              ★
            </span>
          ))}
        </div>

        {/* Add to Cart Button */}
        <button className="cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>

      </div>
    </>
  );
}

export default ProductCard;
