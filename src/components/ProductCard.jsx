import { useNavigate } from "react-router-dom";
import "../styles/productCard.css";
import api from "../services/api";

const ProductCard = ({ id, image, name, price }) => {
  const navigate = useNavigate();

  const handleClickBuyNow = () => {
    try {
      navigate(`/product/${id}`);
    } catch (error) {
      console.log(error.response?.data?.message)
     
    }
  };

  const handleAddtoCart = async () => {
    try {
      const res = await api.post("/user/cart", { productId: id });
      console.log(res.data);
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
      navigate("/login")
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
        <button onClick={handleAddtoCart}>Add to Cart</button>
        <button onClick={handleClickBuyNow}>Buy Now</button>
      </div>
    </div>
  );
};

export default ProductCard;
