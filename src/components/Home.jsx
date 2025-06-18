import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "../styles/home.css";
import api from "../services/api";
import Navbar from "./Navbar";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");

  // Fetch filtered/searched products
  const fetchProducts = async () => {
    try {
      const query = [];
      if (searchTerm) query.push(`search=${searchTerm}`);
      if (category) query.push(`category=${category}`);
      const url = query.length > 0 ? `/product?${query.join("&")}` : `/`;

      const response = await api.get(url);
      console.log("Fetched:", response.data.product);
      setProducts(response.data.product);
    } catch (error) {
      console.error("Error fetching products:", error.response?.data?.message);
    }
  };

  // Fetch products when searchTerm or category changes
  useEffect(() => {
    fetchProducts();
  }, [searchTerm, category]);

  return (
    <>
      <Navbar search={setSearchTerm} />
      <div className="home">
        <div className="home-header">
          <h1>Welcome to MyShop</h1>
        </div>
        <div className="home-mid">
          <div className="home-sidebar">
            <h2>Category</h2>
            <ul>
              {["All", "sports", "Electronics", "Accessories", "Fashion","Bags","Beauty"].map((cat, idx) => (
                <li
                  key={idx}
                 
                  onClick={() => setCategory(cat === "All" ? "" : cat)}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>

          <div className="home-product-display">
            {products.length > 0 ? (
              products.map((item) => (
                <ProductCard
                  key={item._id}
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  description={item.desc}
                  price={item.price}
                  category={item.category}
                />
              ))
            ) : (
              <p>No products found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
