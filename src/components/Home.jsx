import  { useEffect, useState } from "react";

import ProductCard from "./ProductCard";
import "../styles/home.css"
import api from "../services/api";

const Home = () => {
  const [products, setProducts] = useState([]);

  const handleLogout = async ()=>{
    try {
      console.log("logout button clicked")
      const loggedOutUser = await api.get("/user/logout")
      console.log(loggedOutUser.data)
    } catch (error) {
     
      console.log(error,error.message)
    }
  }

  const fetchProducts = async () => {
    try {
      const response = await api.get("/");
      console.log("Fetched:", response.data.product);
      setProducts(response.data.product);
    } catch (error) {
      console.error("Error fetching products:", error);
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
