import React, { useState, useEffect } from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import UserMenu from "./UserMenu";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserOrders = () => {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const userId = auth?.user?.id;
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/order/userorders/${userId}`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
    // eslint-disable-next-line
  }, [auth?.token]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <Header />
      <div className="container m-3" style={{ minHeight: "65.2vh" }}>
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div
              className="card"
              style={{ borderRadius: "5px", boxShadow: "0 0 10px #ccc" }}
            >
              <div className="card-header text-center">
                <h3>Your Orders</h3>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <h6 className="text-center text-primary">
                      {orders.length
                        ? `You have ${orders.length} order${
                            orders.length === 1 ? "" : "s"
                          } in your account.`
                        : "You have no orders."}
                    </h6>
                    <div className="container mt-3">
                      {orders?.map((order, index) => (
                        <div
                          key={order._id}
                          onClick={() =>
                            navigate(
                              `/dashboard/user/orderdetails/${order._id}`
                            )
                          }
                          style={{
                            cursor: "pointer",
                            marginBottom: "5px",
                            boxShadow: "0 0 10px  #ccc",
                            padding: "10px",
                            borderRadius: "5px",
                          }}
                        >
                          <p style={{ marginBottom: "1px" }}>
                            <b>Shipping Address: </b>
                            {order.shippingAddress}
                          </p>
                          <p style={{ marginBottom: "0px" }}>
                            <b>Order Date: </b>
                            {formatDate(order.createdAt)}
                          </p>
                          {order.order_status === "Cancelled" && (
                            <>
                            <p
                                className="text-danger"
                                style={{ marginBottom: "0px" }}
                              >
                                <b>Order Status: </b>
                                {order.order_status} (Order Cancelled by
                              You)
                              </p>
                            <p style={{ marginBottom: "0px" }}>
                              <b>Cancelled Date: </b>
                              {formatDate(order.updatedAt)} 
                            </p>
                            </>
                          )}
                          {order.order_status === "Delivered" && (
                            <>
                              <p
                                className="text-success"
                                style={{ marginBottom: "0px" }}
                              >
                                <b>Order Status: </b>
                                {order.order_status}
                              </p>
                              <p style={{ marginBottom: "0px" }}>
                                <b>Delivered Date: </b>
                                {formatDate(order.updatedAt)}
                              </p>
                            </>
                          )}
                          {order.order_status === "Shipped" && (
                            <>
                              <p
                                className="text-primary"
                                style={{ marginBottom: "0px" }}
                              >
                                <b>Order Status: </b>
                                {order.order_status}
                              </p>
                            </>
                          )}
                          {order.order_status === "Order Confirmed" && (
                            <>
                              <p
                                className="text-info"
                                style={{ marginBottom: "0px" }}
                              >
                                <b>Order Status: </b>
                                {order.order_status}
                              </p>
                            </>
                          )}
                          {order.order_status === "Processing" && (
                            <>
                              <p
                                className="text-warning"
                                style={{ marginBottom: "0px" }}
                              >
                                <b>Order Status: </b>
                                {order.order_status}...
                              </p>
                            </>
                          )}
                          {order.order_status === "Not Process" && (
                            <>
                              <p
                                className="text-danger"
                                style={{ marginBottom: "0px" }}
                              >
                                <b>Order Status: </b>
                                {order.order_status} (Order Cancelled by the
                                Seller)
                              </p>
                              <p style={{ marginBottom: "0px" }}>
                              <b>Cancelled Date: </b>
                              {formatDate(order.updatedAt)} 
                            </p>
                            </>
                          )}
                          <p style={{ marginBottom: "0px" }}>
                            <b>Total Price: ₹</b>
                            {order.total_price}
                          </p>
                          <div className="row">
                            {order.orderItems.map((item, i) => (
                              <div key={i} className="col-md-6">
                                <img
                                  src={`${process.env.REACT_APP_API_URL}/product/product-photo/${item.product}`}
                                  alt={item.name}
                                  style={{
                                    width: "100px",
                                    height: "100px",
                                    objectFit: "contain",
                                    borderRadius: "5px",
                                    marginBottom: "5px",
                                  }}
                                />
                                <p style={{ marginBottom: "0px" }}>
                                  <b>Product Name: </b>
                                  {item.name}
                                </p>
                                <p style={{ marginBottom: "0px" }}>
                                  <b>Price: ₹</b>
                                  {item.price}
                                </p>
                                <p style={{ marginBottom: "0px" }}>
                                  <b>Quantity: </b>
                                  {item.quantity}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserOrders;
