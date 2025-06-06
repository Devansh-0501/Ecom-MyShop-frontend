import  { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/login.css"
import { Link } from "react-router-dom";
import api from "../services/api";

const Login = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
     
      console.log("Logging in with:", formData);
      const response = await api.post("/login",formData)
      

      setError(""); // Clear error
        console.log("Login successful:", response.data);
        if(response.data.user.role==="admin") navigate("/admin")
        else navigate("/")// Redirect to homepage
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Login</button>
        <Link className="link" to="/signUp">SignUp</Link>
      </form>
    </div>
  );
};

export default Login;
