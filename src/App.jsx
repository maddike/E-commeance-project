import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Navbar from "./Navbar";                 // Navbar.jsx
import Home from "./Home";                     // Home.jsx
import Veg from "./Veg";                       // Veg.jsx
import NonVeg from "./NonVeg";                 // NonVeg.jsx
import Milkshakes from "./Milkshakes";         // Milkshakes.jsx
import Cart from "./Cart";                     // Cart.jsx
import About from "./About";                   // About.jsx
import ContactUs from "./ContactUs";           // ContactUs.jsx (exact filename)
import PaymentPage from "./Components/PaymentPage"; // PaymentPage.jsx (exact filename, PascalCase)
import Login from "./Login";                   // Login.jsx
import Register from "./Register";             // Register.jsx
import Orders from "./Orders";                 // Orders.jsx

import { addToCart } from "./Store";          // Store.js

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const isLoggedIn = localStorage.getItem("auth") === "true";

  // Hide navbar on login/register pages
  const hideNav = ["/", "/register"].includes(location.pathname);

  // ProtectedRoute wrapper
  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/" />;
  };

  return (
    <>
      {!hideNav && <Navbar />}

      <Routes>
        {/* AUTH ROUTES */}
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/home" /> : <Login />}
        />
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/home" /> : <Register />}
        />

        {/* PROTECTED ROUTES */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/veg"
          element={
            <ProtectedRoute>
              <Veg addToCart={handleAddToCart} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/nonveg"
          element={
            <ProtectedRoute>
              <NonVeg addToCart={handleAddToCart} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/milkshakes"
          element={
            <ProtectedRoute>
              <Milkshakes addToCart={handleAddToCart} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contactus"
          element={
            <ProtectedRoute>
              <ContactUs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
