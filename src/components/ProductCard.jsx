import React from "react";
import "../styles/productCard.css";

const ProductCard = ({ image, name, description, price }) => {
  return (
    <div className="product-card">
      <img className="product-image" src={image} alt={name} />
      <div className="product-info">
        <h2 className="product-name">{name}</h2>
        <p className="product-description">{description}</p>
        <div className="product-footer">
          <span className="product-price">{price}</span>
          <button className="buy-button">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
