import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Navbar from "./Navbar";
import Home from "./Home";
import Veg from "./Veg";
import NonVeg from "./NonVeg";
import Milkshakes from "./Milkshakes";
import Cart from "./Cart";
import About from "./About";
import ContactUs from "./ContactUs"; // Filename must match exactly
import PaymentPage from "./Components/Paymentpage"; // Correct PascalCase
import Login from "./Login";
import Register from "./Register";
import Orders from "./Orders"; // Ensure filename matches

import { addToCart } from "./Store";

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
          path="/Veg"
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
