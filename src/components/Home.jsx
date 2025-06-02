import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import "../styles/home.css"

const Home = () => {
  const [products, setProducts] = useState([]);

  const handleLogout = async ()=>{
    try {
      const loggedOutUser = await axios.get("https://ecom-project-backend-y7s9.onrender.com/api/logout",{withCredentials:true})
      console.log(loggedOutUser.data)
    } catch (error) {
      res.status(500).json({message:"Logout Failed"})
      console.log(error,error.message)
    }
  }

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://ecom-project-backend-y7s9.onrender.com/api" ,{},{
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
    <>
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
    <button onClick={handleLogout}>logout</button>
    </>
  );
};

export default Home;
