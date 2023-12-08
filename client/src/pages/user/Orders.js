import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid p-4 m-3 dashboard">
        <div className="row mt-4">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center mt-5">Your Orders</h1>
            {orders?.map((order, index) => (
              <div className="card mb-4 shadow" key={order._id}>
                <div className="card-header">
                  Order #{index + 1}
                  <span className={`float-right ${order.payment.success ? "text-success" : "text-danger"}`}>
                    {order.payment.success ? "Payment Successful" : "Payment Failed"}
                  </span>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-3">
                      <strong>Buyer:</strong> {order.buyer.name}
                    </div>
                    <div className="col-md-3">
                      <strong>Date:</strong> {moment(order.createAt).format("MMMM Do YYYY, h:mm:ss a")}
                    </div>
                    
                    <div className="col-md-3">
                      <strong>Quantity:</strong> {order.products.length}
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <div className="row">
                    {order.products.map((product) => (
                      <div className="col-md-3" key={product._id}>
                        <div className="card mb-2">
                          <img
                            src={`/api/v1/product/product-photo/${product._id}`}
                            className="card-img-top"
                            alt={product.name}
                          />
                          <div className="card-body">
                            <h6 className="card-title">{product.name}</h6>
                            <p className="card-text">₹{product.price}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
