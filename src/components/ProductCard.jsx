
import { useNavigate } from "react-router-dom";
import "../styles/productCard.css";


const ProductCard = ({ id,image, name, description, price }) => {
  const navigate = useNavigate();


  const handleClick = ()=>{
    navigate(`/product/${id}`)
     
  }
  return (
    <div className="product-card">
      <img src={image} alt={name} />
      <div className="product-info">
        <h2>{name}</h2>
        <span>₹{price}</span>
      </div>
      <div className="product-footer">
        <p>{description}</p>
        <div className="product-footer-buttons">
          <button >Add to Cart</button>
          <button onClick={handleClick}>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
