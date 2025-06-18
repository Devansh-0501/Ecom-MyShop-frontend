import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { useEffect, useState } from "react";
import api from "../services/api";

const Navbar = ({ search }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Check if user is authenticated (on first mount)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/user/isLogin"); 
        console.log(res.data)
        setIsLoggedIn(true);
      } catch {
        console.log(error.response.data.message)
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await api.get("/user/logout");
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  };

  // Debounce search input
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (search) search(searchTerm);
    }, 300); // delay in ms
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">MyShop</Link>
      </div>

      <div className="navbar-search">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="search-input"
        />
        <button className="search-button">Search</button>
      </div>

      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        {!isLoggedIn ? (
          <li><Link to="/login">Login</Link></li>
        ) : (
          <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
