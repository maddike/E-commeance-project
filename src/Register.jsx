import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (password.trim() !== confirmPassword.trim()) {
      alert("Passwords do not match");
      return;
    }

    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (savedUsers.some((user) => user.email.toLowerCase() === email.trim().toLowerCase())) {
      alert("User already exists");
      return;
    }

    savedUsers.push({ email: email.trim(), password: password.trim() });
    localStorage.setItem("users", JSON.stringify(savedUsers));

    alert("Registration successful! Please login.");
    navigate("/");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">Create Account</h1>

        <form className="login-form" onSubmit={handleRegister}>
          <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

          <button type="submit" className="login-btn">Register</button>

          <p className="switch-text">
            Already have an account? <Link to="/">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
