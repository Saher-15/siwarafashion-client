import React, { useEffect } from "react";
import { SectionTitle } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { calculateTotals, clearCart } from "../features/cart/cartSlice";
import { store } from "../store";

const ThankYou = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const { total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createNewOrder = async () => {
    try {
      const userData = localStorage.getItem("user_Data");
      console.log(userData);
      const response = await axios.post(`https://siwarafashion-server-59dda37c29fa.herokuapp.com/order/new_order/${localStorage.getItem("id")}`,{ 
        subtotal: total*0.9,
        cartItems: cartItems,
      });

      // Save order to user's order history
      // saveOrderToHistory(response.data._id);

      // Clear cart and recalculate totals upon successful order creation
      store.dispatch(clearCart());
      store.dispatch(calculateTotals());
      toast.success("Order completed");
    } catch (err) {
      console.error("Error creating order:", err);
      toast.error("Failed to create order");
    }
  };

  useEffect(() => {
    if (!loginState) {
      toast.error("You must be logged in to access this page");
      navigate("/");
    } else {
      // Check if there are items in the cart and create order
      if (cartItems.length > 0) {
        createNewOrder();
      }
    }
  }, []);

  return (
    <>
      <SectionTitle title="Thank You" path="Home | Cart | Thank you" />
      <div className="thankyou-content text-center text-accent-content px-10 max-w-7xl mx-auto">
        <h2 className="text-6xl max-sm:text-4xl">
          Thank you for your purchase!
        </h2>

        <h3 className="text-2xl mt-10 max-sm:text-xl">
          We hope you love your new clothes! We appreciate your
          business and look forward to seeing you again soon.
        </h3>
        <h3 className="text-2xl mt-5 max-sm:text-xl">
          Here are some things you can do next:
        </h3>
        <ul className="text-xl mt-5 text-blue-500 max-sm:text-lg">
          <li className="hover:text-blue-600 cursor-pointer">
            <Link to="/order-history">&rarr; See order history &larr;</Link>
          </li>
          <li className="hover:text-blue-600 cursor-pointer">
            <Link to="/">&rarr; Browse more product and buy more &larr;</Link>
          </li>
        </ul>

        <h4 className="text-xl mt-5 max-sm:text-lg">
          Thank you again for your purchase!
        </h4>
        <h4 className="text-xl max-sm:text-lg">
          Sincerely, SiwaraFashion team
        </h4>
      </div>
    </>
  );
};

export default ThankYou;
