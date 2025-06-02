import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import "../styles/home.css"

const Home = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api" ,{
          withCredentials: true,
        });
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
    <div className="product-display">
      {products.map((item) => (
        <ProductCard
          key={item._id}
          image={item.image}
          name={item.name}
          description={item.desc}
          price={item.price}
        />
      ))}
    </div>
  );
};

export default Home;
