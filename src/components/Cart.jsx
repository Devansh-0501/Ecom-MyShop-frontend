import "../styles/cart.css";
import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchCart = async () => {
    try {
      const res = await api.get("/user/cart");
      setCart(res.data.cart);
    } catch (error) {
      console.log(error.response?.data?.message || "Error fetching cart");
    }
  };

  const calculateTotalPrice = () => {
    const sum = cart.reduce((acc, item) => {
      return acc + item.quantity * item.productId.price;
    }, 0);
    setTotalPrice(sum);
  };

  const changeQuantity = async (temp, id) => {
    if (temp === "increase") {
      try {
        const res = await api.post(`user/cart`, {
          productId: id,
          decreament: false,
        });
        console.log(res.data);
      } catch (error) {
        console.log(error.response?.data?.message || error.message);
      }
    } else {
      try {
        const resp = await api.post(`user/cart`, {
          productId: id,
          decreament: true,
        });
        console.log(resp.data);
      } catch (error) {}
    }
    fetchCart();
  };

  const handleClearCart = async () => {
    try {
      const res = api.get(`/user/cart/clear`);
      console.log(res.data);
      // setCart([]);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  // useEffect(() => {

  // }, []);

  useEffect(() => {
    fetchCart();
    if (cart.length) {
      calculateTotalPrice();
    }
  }, [cart]);

  return (
    <div className="cart">
      <div className="cart-left">
        {cart.map((item) => {
          const products = item.productId;
          return (
            <div key={item._id} className="cart-display">
              <ProductCard
                id={products._id}
                image={products.image}
                name={products.name}
                description={products.desc}
                price={products.price}
              />
              <div className="quantity">
                <button
                  onClick={() => changeQuantity("increase", products._id)}
                >
                  +
                </button>

                <h1>Quantity: {item.quantity}</h1>

                <button
                  onClick={() => changeQuantity("decrease", products._id)}
                >
                  -
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="cart-right">
        <p>
          Total Price: <span>{totalPrice}</span>
        </p>
        <div className="card-right-buttons">
        <button onClick={handleClearCart}>clear cart</button>
        <button >Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
