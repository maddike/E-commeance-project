import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Navbar from "./Navbar";
import Home from "./Home";
import Veg from "./Veg";
import Milkshakes from "./Milkshakes";
import Cart from "./Cart";
import About from "./About";
import { addToCart } from "./Store";
import NonVeg from "./Nonveg";   // ✅ FIXED — correct import
import ContactUs from "./Contactus";
import PaymentPage from "./Components/Paymentpage";
import Login from "./Login";
import Register from "./Register";
import Orders from "./orders";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const isLoggedIn = localStorage.getItem("auth") === "true";

  // Hide navbar on login/register
  const hideNav = ["/", "/register"].includes(location.pathname);

  return (
    <>
      {!hideNav && <Navbar />}

      <Routes>
        {/* AUTH */}
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
          element={isLoggedIn ? <Home /> : <Navigate to="/" />}
        />

        <Route
          path="/veg"
          element={
            isLoggedIn ? (
              <Veg addToCart={handleAddToCart} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/nonveg"
          element={
            isLoggedIn ? (
              <NonVeg addToCart={handleAddToCart} />   // ✅ FIXED — matches import
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/milkshakes"
          element={
            isLoggedIn ? (
              <Milkshakes addToCart={handleAddToCart} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/contactus"
          element={isLoggedIn ? <ContactUs /> : <Navigate to="/" />}
        />

        <Route
          path="/cart"
          element={isLoggedIn ? <Cart /> : <Navigate to="/" />}
        />

        <Route
          path="/about"
          element={isLoggedIn ? <About /> : <Navigate to="/" />}
        />

        <Route
          path="/orders"
          element={isLoggedIn ? <Orders /> : <Navigate to="/" />}
        />

        <Route
          path="/payment"
          element={isLoggedIn ? <PaymentPage /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}

export default App;
