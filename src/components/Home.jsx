import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import "../styles/home.css"
import api from "../services/api";

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const handleLogout = async ()=>{
    try {
      console.log("logout button clicked")
      const loggedOutUser = await api.get("/user/logout")
      console.log(loggedOutUser.data)
    } catch (error) {
     
      console.log(error.response?.data?.message)
      navigate("/login");
    }
  }

  const fetchProducts = async () => {
    try {
      const response = await api.get("/");
      console.log("Fetched:", response.data.product);
      setProducts(response.data.product);
    } catch (error) {
      console.error("Error fetching products:", error.response.data.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
    <div className="home-product-display">
      {products.map((item) => (
        <ProductCard
          key={item._id}
          id={item._id}
          image={item.image}
          name={item.name}
          description={item.desc}
          price={item.price}
        />
      ))}
    </div>
    <button onClick={handleLogout}>logout</button>
    </>
  );
};

export default Home;
