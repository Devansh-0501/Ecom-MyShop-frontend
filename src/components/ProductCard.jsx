
import { useNavigate } from "react-router-dom";
import "../styles/productCard.css";
import api from "../services/api";


const ProductCard = ({ id,image, name, description, price }) => {
  const navigate = useNavigate();


  const handleClick = ()=>{
    navigate(`/product/${id}`)
     
  }


 const handleAddtoCart = async () => {
  try {
    const res = await api.post("/user/cart", { productId: id });
    console.log(res.data);
  } catch (error) {
    console.log(error.response?.data?.message || error.message);
  }
};

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
          <button onClick={handleAddtoCart}>Add to Cart</button>
          <button onClick={handleClick}>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
