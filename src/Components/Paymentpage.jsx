import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Paymentpage() {
  const cartItems = useSelector((state) => state.cart);
  const amount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const navigate = useNavigate();

  /* ============================================
        SAVE ORDER FUNCTION (IMPORTANT)
     ============================================ */
  const saveOrder = () => {
    const order = {
      id: Date.now(),
      items: cartItems,
      amount: amount,
      paymentMethod: paymentMethod,
      date: new Date().toLocaleString(),
    };

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    navigate("/order-success"); // redirect after saving
  };

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) =>
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });

  /* ============================================
           CARD PAYMENT VALIDATION
     ============================================ */
  const handleCardPayment = () => {
    const { name, number, expiry, cvv } = cardDetails;

    if (!name || !number || !expiry || !cvv)
      return alert("Fill all card details");

    if (number.length !== 16 || isNaN(number))
      return alert("Card number must be 16 digits");

    if (!/^\d{2}\/\d{2}$/.test(expiry))
      return alert("Expiry must be MM/YY");

    if (cvv.length !== 3 || isNaN(cvv))
      return alert("CVV must be 3 digits");

    alert(`Payment of ₹${amount} Successful!`);
    saveOrder(); // save after success
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2>Select Payment Method</h2>

      {/* PAYMENT BUTTONS */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setPaymentMethod("card")}
          style={{
            marginRight: "10px",
            padding: "10px",
            background: paymentMethod === "card" ? "#4caf50" : "#ccc",
            color: paymentMethod === "card" ? "#fff" : "#000",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Card
        </button>

        <button
          onClick={() => setPaymentMethod("qr")}
          style={{
            padding: "10px",
            background: paymentMethod === "qr" ? "#4caf50" : "#ccc",
            color: paymentMethod === "qr" ? "#fff" : "#000",
            border: "none",
            borderRadius: "4px",
          }}
        >
          QR
        </button>
      </div>

      {/* ======================
           CARD PAYMENT UI
      ======================= */}
      {paymentMethod === "card" && (
        <div>
          <input
            type="text"
            name="name"
            placeholder="Cardholder Name"
            value={cardDetails.name}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          />

          <input
            type="text"
            name="number"
            placeholder="Card Number"
            value={cardDetails.number}
            onChange={handleChange}
            maxLength={16}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          />

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <input
              type="text"
              name="expiry"
              placeholder="MM/YY"
              value={cardDetails.expiry}
              onChange={handleChange}
              style={{
                width: "48%",
                padding: "8px",
                marginBottom: "10px",
              }}
            />

            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={cardDetails.cvv}
              onChange={handleChange}
              maxLength={3}
              style={{
                width: "48%",
                padding: "8px",
                marginBottom: "10px",
              }}
            />
          </div>

          <button
            onClick={handleCardPayment}
            style={{
              width: "100%",
              padding: "10px",
              background: "#4caf50",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Confirm Card Payment
          </button>
        </div>
      )}

      {/* ======================
            QR PAYMENT UI
      ======================= */}
      {paymentMethod === "qr" && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <h3>Scan to Pay ₹{amount}</h3>

          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
              `upi://pay?pa=939266926&pn=karthik&am=${amount}&cu=INR`
            )}`}
            alt="UPI QR"
          />

          <button
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              background: "green",
              color: "white",
              border: "none",
              borderRadius: "6px",
            }}
            onClick={() => {
              alert("Payment Successful!");
              saveOrder();
            }}
          >
            I Have Paid
          </button>
        </div>
      )}
    </div>
  );
}

export default Paymentpage;