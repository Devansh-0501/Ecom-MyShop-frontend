import { useParams,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api"; 
import "../styles/productDetail.css"; 
import Navbar from "./Navbar";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/${id}`);
        setProduct(res.data.product); 
      } catch (err) {
        console.error("Error loading product:", err.response.data.message)
        alert(err.response.data.message)
        navigate("/login");
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div className="loading">Loading...</div>;

  return (
    <>
    <Navbar/>
    <div className="product-detail-container">
      
        <img src={product.image} alt={product.name} />
      
      <div className="product-detail-info">
        <h1>{product.name}</h1>
        <p>{product.desc} Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas sunt modi quibusdam dolor incidunt quo nemo iusto aliquam repudiandae facilis recusandae hic nisi nostrum eos dolores, officiis harum accusantium maiores sequi! Aliquam quod ullam quae voluptatibus assumenda reiciendis, illum facilis esse quisquam cupiditate illo delectus id quaerat ipsa repellat est optio. Ullam magni mollitia quaerat. Dolor, consequatur nostrum blanditiis vero illum itaque atque aliquid quae eaque laboriosam! Consequatur dolor inventore quidem assumenda eveniet officia nostrum est? Eius, tempore alias. Ipsum nisi eligendi possimus expedita, soluta mollitia temporibus impedit?</p>
        <h2>₹{product.price}</h2>
        <h2>₹{product.category}</h2>
        <div className="product-detail-buttons">
          <button>Add to Cart</button>
          <button className="buy">Buy Now</button>
        </div>
      </div>
    </div></>
  );
};

export default ProductDetail;
