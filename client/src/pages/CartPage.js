import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import DropIn from 'braintree-web-drop-in-react'
import axios from "axios";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState('');

  // Total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.error(error);
      return "";
    }
  };

  // Delete item
  const removeCartItem = (pid) => {
    try {
      const myCart = cart.filter((item) => item._id !== pid);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.error(error);
    }
  };

  // Get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // Handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <Layout title={"cart-page"}>
      <div className="cart-page">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="text-center bg-light p-3 mt-5 text-muted">
                {!auth?.user ? "Hello Guest" : `Hello ${auth?.token && auth?.user?.name}`}
              </h1>
              <p className="text-center">
                {cart?.length ? (
                  <>
                    You Have {cart.length} items in your cart{" "}
                    {auth?.token ? "" : <span className="text-danger">please login to checkout!</span>}
                  </>
                ) : (
                  "Your Cart Is Empty"
                )}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-7">
              {cart?.map((p) => (
                <div className="card mb-3" key={p._id}>
                  <div className="row no-gutters">
                    <div className="col-md-4">
                      <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        className="card-img"
                        alt={p.name}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.description.substring(0, 50)}</p>
                        <p className="card-text">
                          <strong>Price: ₹{p.price}</strong>
                        </p>
                        <button
                          className="btn btn-danger"
                          onClick={() => removeCartItem(p._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-5 cart-summary">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title">Cart Summary</h2>
                  <p className="card-text">Total | Checkout | Payment</p>
                  <hr />
                  <h4 className="card-text">Total : {totalPrice()} </h4>
                  {auth?.user?.address ? (
                    <>
                      <div className="mb-3">
                        <h4>Current Address</h4>
                        <h5>{auth.user.address}</h5>
                        <button
                          className="btn btn-warning"
                          onClick={() => navigate("/dashboard/user/profile")}
                        >
                          Update Address
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="mb-3">
                      {auth?.token ? (
                        <button
                          className="btn btn-warning"
                          onClick={() => navigate("/dashboard/user/profile")}
                        >
                          Update Address
                        </button>
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
                    </div>
                  )}

                  <div className="mt-2">
                    {!clientToken || !cart?.length ? (
                      ""
                    ) : (
                      <>
                        <DropIn
                          options={{
                            authorization: clientToken,
                            paypal: {
                              flow: "vault",
                            },
                          }}
                          onInstance={(instance) => setInstance(instance)}
                        />

                        <button
                          className="btn btn-primary"
                          onClick={handlePayment}
                          disabled={loading || !instance || !auth?.user?.address}
                        >
                          {loading ? "Processing ...." : "Make Payment"}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
