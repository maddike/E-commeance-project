import React, { useState } from "react";
import "./ContactUs.css";

 function ContactUs() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Placeholder: handle login logic here
    alert(`Email: ${email}\nPassword: ${password}`);
  };

  return (
    <div className="contact-login-container">
      {/* Contact Section */}
      <h1 className="grid-title">Contact Us</h1>
      <div className="contact-grid">
        {/* Email */}
        <div className="contact-card">
          <h3>📧 Email</h3>
          <p>support@example.com</p>
          <small>We reply within 24 hours</small>
        </div>

        {/* Phone */}
        <div className="contact-card">
          <h3>📞 Phone</h3>
          <p>+91 98765 43210</p>
          <small>Mon – Sat, 10am – 6pm</small>
        </div>

        {/* Address */}
        <div className="contact-card">
          <h3>📍 Address</h3>
          <p>Hyderabad, Telangana, India</p>
          <small>Visit us anytime</small>
        </div>
      </div>

      {/* Login Section */}
      <h1 className="login-title">Login</h1>
      <div className="login-card">
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
export default ContactUs;