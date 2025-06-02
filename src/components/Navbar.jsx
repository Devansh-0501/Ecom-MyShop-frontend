import React from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">MyShop</div>

      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search products..."
          className="search-input"
        />
        <button className="search-button">Search</button>
      </div>

      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/products">Products</a></li>
        <li><a href="/cart">Cart</a></li>
        <li><a href="/login">Login</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
