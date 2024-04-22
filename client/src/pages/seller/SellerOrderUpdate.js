import React, { useState, useEffect } from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { useNavigate, useParams } from "react-router-dom";

const SellerOrderUpdate = () => {
  const navigate = useNavigate();
  const [user] = useAuth();
  const params = useParams();

  const [orders, setOrders] = useState(null);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/order/getone-order/${params.oid}`
      );
      console.log(data);
      const filteredOrderItems = data.orderItems.filter(
        (item) => item.seller === user.user.id
      );
      const filteredOrder = {
        ...data,
        orderItems: filteredOrderItems,
      };
      setOrders([filteredOrder]); // Set the orders state with the filtered data
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while fetching orders.");
    }
  };

  useEffect(() => {
    getOrders();
    // eslint-disable-next-line
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handelaccept = async (orderId) => {
    console.log(orderId);
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/order/accept-order/${orderId}`
      );
      console.log(data);
      toast.success("Order Accepted Successfully");
      getOrders();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while accepting order.");
    }
  };

  const handelreject = async (orderId) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/order/reject-order/${orderId}`
      );
      console.log(data);
      toast.success("Order Rejected Successfully");
      getOrders();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while rejecting order.");
    }
  };

  const handelupdate = (orderId) => async (e) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/order/order-status-update/${orderId}`,
        { order_status: e.target.value }
      );
      toast.success("Order Status Updated Successfully");
      getOrders();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while updating order status.");
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-3 mb-3" style={{ minHeight: "65.2vh" }}>
        <div
          className="card"
          style={{ borderRadius: "5px", boxShadow: "0 0 10px #ccc" }}
        >
          <div className="card-header d-flex flex-wrap">
            <button
              className="btn btn-primary "
              style={{ borderRadius: "5px", boxShadow: "0 0 10px #ccc" }}
              onClick={() => {
                navigate(-1);
              }}
            >
              <i className="bi bi-arrow-left"></i>
              Back
            </button>
            <h3 className="text-center mx-auto">Order Details</h3>
          </div>
          <div className="card-body">
            {orders &&
              orders.map((order) => (
                <div key={order._id}>
                  <h5>Order ID: {order._id}</h5>
                  <h5>Order Items:</h5>
                  <div className="row">
                    <div className="col-md-6">
                      {order.orderItems.map((item, i) => (
                        <div key={i} className="col-md-6">
                          <img
                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${item.product}`}
                            alt={item.name}
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "contain",
                              borderRadius: "5px",
                              marginBottom: "5px",
                            }}
                          />
                          <p>
                            <b>Seller Name: </b>
                            {item.seller_name}
                          </p>
                          <p>
                            <b>Product Name: </b>
                            {item.name}
                          </p>
                          <p>
                            <b>Quantity: </b>
                            {item.quantity}
                          </p>
                          <p>
                            <b>Price: ₹</b>
                            {item.price}
                          </p>
                          <hr />
                        </div>

                      ))}
                    </div>
                    <div className="col-md-6">
                      <p>
                        <b>Order Date: </b>
                        {formatDate(order.createdAt)}
                      </p>
                      <p>
                        <b>Shipping Address: </b>
                        {order.shippingAddress}
                      </p>
                      {/* Conditional rendering based on order status */}
                      {order.order_status === "Processing" && (
                        <>
                          <p>
                            <b>
                              Order Status:{" "}
                              <span className="text-warning">
                                {order.order_status}...
                              </span>
                            </b>
                          </p>
                          <p>You can Accept the order or Reject the order</p>
                          {/* Accept and Reject buttons */}
                          <button
                            className="btn btn-success me-2"
                            onClick={() => {
                              handelaccept(order._id);
                            }}
                          >
                            Accept
                          </button>
                          <button
                            className="btn btn-danger ml-2"
                            onClick={() => {
                              handelreject(order._id);
                            }}
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {order.order_status !== "Processing" && (
                        <>
                          {/* Render different elements based on order status */}
                          {order.order_status === "Not Process" && (
                            <p>
                              <b>Order Status: </b>
                              <span className="text-danger">
                                Order {order.order_status}
                              </span>
                            </p>
                          )}
                          {order.order_status !== "Not Process" && (
                            <>
                              <p>
                                <b>Order Status: </b>
                                <span className="text-success">
                                  {order.order_status}
                                </span>
                              </p>
                              {order.order_status === "Delivered" && (
                                <p>
                                  <b>Delivery Date: </b>
                                  {formatDate(order.updatedAt)}
                                </p>
                              )}
                              {order.order_status !== "Delivered" && (
                                <>
                                <span>
                                <b>Update Status: </b>
                              </span>
                              <select
                                className="form-select mt-3 "
                                aria-label="Default select example"
                                onChange={handelupdate(order._id)}
                                value={order.order_status}
                              >
                                <option value="Order Confirmed" disabled>
                                  Order Confirmed
                                </option>
                                <option value="Shipped" disabled={order.order_status==="Shipped"}>Shipped</option>
                                <option value="Delivered">Delivered</option>
                              </select>
                                </>
                              )
                                }
                              
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SellerOrderUpdate;
