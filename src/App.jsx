import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AdminDashboard from "./components/AdminDashboard";

const App = () => {
  return (

    
     <BrowserRouter>
      <Navbar />
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
