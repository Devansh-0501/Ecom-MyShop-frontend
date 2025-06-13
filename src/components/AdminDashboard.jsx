import "../styles/adminDashboard.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import api from "../services/api";
import AdminProductCard from "./AdminProductCard";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    image: "",
    desc: "",
  });

  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/");
      console.log("Fetched:", response.data.product);
      setProducts(response.data.product);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const loggedOutUser = await api.get("/user/logout");
      console.log(loggedOutUser.data);
      navigate("/");
    } catch (error) {
      console.log(error, error.message);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const deletedUser = await api.delete(`/admin/${id}`);
      console.log(deletedUser);
      fetchUsers(); //to re render or trigger useEffect
    } catch (error) {
      console.log(error, error.message);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get("/admin/allUsers");
      console.log("hi",response.data);
      setUsers(response.data.allUsers);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  const handleProductDelete = async (id) => {
    try {
      const res = await api.delete(`/${id}`);
      console.log(res.data);
      fetchProducts();
    } catch (error) {
      console.log(error, error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
    
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/", productData);
      console.log(response.data);
      alert("Product Added Successfully");
      setProductData({
        name: "",
        price: "",
        image: "",
        desc: "",
      });
      fetchProducts();
    } catch (error) {
      console.log(error, error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchProducts();
  }, []);

  return (
    <>
      <div className="admin-dashboard">
        <h2 className="dashboard-title">Admin Dashboard</h2>

        <div className="products">
          <div className="add-products">
            <h1>Add a New Product</h1>
            <form onSubmit={submitHandler}>
              <input
                type="text"
                onChange={handleChange}
                value={productData.name}
                placeholder="Name"
                name="name"
              />
              <input
                type="number"
                onChange={handleChange}
                value={productData.price}
                placeholder="Price"
                name="price"
              />
              <input
                type="text"
                onChange={handleChange}
                value={productData.image}
                placeholder="Image URL"
                name="image"
              />
              <input
                type="text"
                onChange={handleChange}
                value={productData.desc}
                placeholder="Description"
                name="desc"
              />
              <button type="submit">Add</button>
              {/* <input type="text" value={name} placeholder="Enter the name of the product" name="name" /> */}
            </form>
          </div>

          <div className="product-display">
            <h1>All Products</h1>
            <div className="product-grid">
              {products.map((item) => (
                <div key={item._id} className="single-product">
                  <button
                    onClick={() => {
                      handleProductDelete(item._id);
                    }}
                  >
                    Delete Product
                  </button>
                  <AdminProductCard
                    key={item._id}
                    image={item.image}
                    name={item.name}
                    description={item.desc}
                    price={item.price}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="user-display">
          <h1>All Users</h1>
          {users.map((user) => (
            <div key={user._id} className="user-card">
              <h3>{user.name}</h3>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Role:</strong> {user.role}
              </p>
              <button
                onClick={() => {
                  deleteHandler(user._id);
                }}
                className="delete-user"
              >
                Delete User
              </button>
            </div>
          ))}
        </div>
      </div>
      <button onClick={handleLogout}>logout</button>
    </>
  );
};

export default AdminDashboard;
