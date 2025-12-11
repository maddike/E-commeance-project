import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Navbar.css";

function Navbar() {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h2>Aroma Spices 🌶️</h2>

      <div className="nav-links">
        <Link to="/home">🏠 Home</Link>
        <Link to="/veg">🥗 Veg</Link>
        <Link to="/nonveg">🍗 Non-Veg</Link>
        <Link to="/milkshakes">🥤 Milkshakes</Link>
        <Link to="/about">ℹ️ About</Link>
        <Link to="/cart">🛒 Cart ({cart.length})</Link>
        <Link to="/orders">📝 Orders</Link>

        {/* Updated Logout Icon */}
        <button onClick={handleLogout} className="logout-btn">⎋ Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
