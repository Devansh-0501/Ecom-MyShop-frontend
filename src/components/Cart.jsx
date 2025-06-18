import "../styles/cart.css";
import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchCart = async () => {
    try {
      const res = await api.get("/user/cart");
      console.log(res.data.cart);
      setCart(res.data.cart);
    } catch (error) {
      console.log(error.response?.data?.message || "Error fetching cart");
      navigate("/login");
    }
  };

  const changeQuantity = async (temp, id) => {
    try {
      const res = await api.post(`/user/cart`, {
        productId: id,
        decreament: temp === "decrease",
      });

      console.log(res.data);
      setCart(res.data.cart);
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  };

  const handleClearCart = async () => {
    try {
      const res = await api.get(`/user/cart/clear`);
      console.log(res.data);
      fetchCart();
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    const sum = cart.reduce((acc, item) => {
      return acc + item.quantity * item.productId.price;
    }, 0);
    setTotalPrice(sum);
  }, [cart]);


  const cartItemsWithSubtotal = cart.map((item) => {
    const product = item.productId;
    const subtotal = product.price * item.quantity;
    return { itemId: item._id, product, quantity: item.quantity, subtotal };
  });

  return (
    <>
      <Navbar/>
      <div className="cart">
        <div className="cart-left">
          {cartItemsWithSubtotal.map(({ itemId, product, quantity }) => (
            <div key={itemId} className="cart-display">
              <ProductCard
                id={product._id}
                image={product.image}
                name={product.name}
                description={product.desc}
                price={product.price}
                category={product.category}
              />
              <div className="quantity">
                <button onClick={() => changeQuantity("decrease", product._id)}>
                  -
                </button>
                <h1>Quantity: {quantity}</h1>
                <button onClick={() => changeQuantity("increase", product._id)}>
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-right">
          <h2>Cart Checkout</h2>
          <div className="cart-checkout">
            <ul>
              {cartItemsWithSubtotal.map(
                ({ product, quantity, subtotal, itemId }) => (
                  <li key={itemId}>
                    <p>
                      {product.name}: ₹{product.price} X {quantity} ={" "}
                      <span>₹{subtotal}</span>
                    </p>
                  </li>
                )
              )}
            </ul>
            <p>
              Total Price: <span>₹{totalPrice}</span>
            </p>
          </div>

          <div className="card-right-buttons">
            <button onClick={handleClearCart}>Clear Cart</button>
            <button>Buy Now</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
