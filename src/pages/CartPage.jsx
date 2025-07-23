import React from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { UseAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = UseAuth();
  const navigate = useNavigate();

  // Total Price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-UK", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Remove Cart Item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  // Payment Integration Using Stripe
  const checkOutHandler = async () => {
    try {
      const stripe = await loadStripe(`${process.env.REACT_APP_STRIPE_KEY}`);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/checkout/create-session`,
        { products: cart, userId: auth?.user?._id } // body
      );

      const result = await stripe.redirectToCheckout({
        sessionId: data.id,
      });

      if (result.error) {
        console.log(result.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length >= 1
                ? `You have ${cart.length} items in your cart ${
                    auth.token ? "" : "please log in to checkout"
                  }`
                : "Your cart is empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row mb-2 card flex-row p-2">
                <div className="col-md-4">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    width={"100px"}
                    height={"200px"}
                  />
                </div>
                <div className="col-md-4">
                  <h4>{p.name}</h4>
                  <h4>Price: ₹{p.price}</h4>
                  <p>{p.description.substring(0, 200)}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-3 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total : {totalPrice()}</h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <button
                className="btn btn-warning"
                onClick={() =>
                  navigate("/login", {
                    state: "/cart",
                  })
                }
              >
                Please Login to Checkout
              </button>
            )}
            <button className="btn btn-primary" onClick={checkOutHandler}>
              Checkout
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
