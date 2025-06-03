import axios from 'axios';
import "../styles/adminDashboard.css";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);


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

   const handleLogout = async ()=>{
    try {
      const loggedOutUser = await axios.get("https://ecom-project-backend-y7s9.onrender.com/api/logout",{withCredentials:true})
      console.log(loggedOutUser.data)
      navigate("/")
    } catch (error) {
     
      console.log(error,error.message)
    }
  }

  const deleteHandler = async (id)=>{
    try {
        const deletedUser = await axios.delete(`https://ecom-project-backend-y7s9.onrender.com/api/admin/${id}`,{withCredentials:true})
        console.log(deletedUser)
        fetchUsers();//to re render or trigger useEffect
    } catch (error) {
        console.log(error,error.message)
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://ecom-project-backend-y7s9.onrender.com/api/admin",
        { withCredentials: true }
      );
      console.log(response.data)
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
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
      <div className="user-display">
        {users.map((user) => (
          <div key={user._id} className="user-card">
            <h3>{user.name}</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <button onClick={()=>{deleteHandler(user._id)}} className='delete-user'>Delete User</button>
          </div>
        ))}
      </div>
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
    </div> 
    <button onClick={handleLogout}>logout</button>
    </>
  );
};

export default AdminDashboard;
