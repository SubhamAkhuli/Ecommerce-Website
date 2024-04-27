import React, { useState, useEffect } from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import SellerMenu from "../../pages/seller/SellerMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SellerOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [user] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/order/seller-orders/${user.user.id}`
      );
      // Filter orders where any order item's seller ID matches the user's ID
      const filteredOrders = data
        .map((order) => ({
          ...order,
          orderItems: order.orderItems.filter(
            (item) => item.seller === user.user.id
          ),
        }))
        .filter((order) => order.orderItems.length > 0); // Remove orders with no matching order items
      setOrders(filteredOrders);
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
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
};


  return (
    <>
      <Header />
      <div className="container m-3" style={{ minHeight: "65.2vh" }}>
        <div className="row">
          <div className="col-md-3">
            <SellerMenu />
          </div>
          <div className="col-md-9">
            <div className="card">
              <div className="card-header text-center">
                <h3>Your Orders</h3>
              </div>
              {orders.length > 0 ? (
                <div className="card-body">
                  <div className="table-responsive">
                    <table
                      className="table table-bordered table-hover"
                      style={{ boxShadow: "0 0 10px #ccc" }}
                    >
                      <thead>
                        <tr>
                        <th scope="col">S.No</th>
                          <th scope="col">Order ID</th>
                          <th scope="col">Product Name</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Price</th>
                          <th scope="col">Order Date</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order,index) => (
                          <tr key={order._id}>
                          <td>{index+1}</td>
                            <td>{order._id}</td>
                            <td>
                              <ul style={{listStyleType:"none",margin:"0px",padding:"0px"}}>
                                {order.orderItems.map((item) => (
                                  <li key={item._id}>{item.name}</li>
                                ))}
                              </ul>
                            </td>
                            <td style={{ alignContent: "center" }}>
                              <ul style={{listStyleType:"none",margin:"0px",padding:"0px"}}>
                                {order.orderItems.map((item) => (
                                  <li key={item._id}>{item.quantity}</li>
                                ))}
                              </ul>
                            </td>
                            <td style={{ alignContent: "center" }}>
                              <ul style={{listStyleType:"none",margin:"0px",padding:"0px"}}>
                                {order.orderItems.map((item) => (
                                  <li key={item._id}>₹{item.price}</li>
                                ))}
                              </ul>
                            </td>
                            <td style={{ alignContent: "center" }}>
                              {/* {new Date(order.createdAt).toLocaleDateString()} */}
                              {formatDate(order.updatedAt)} 
                            </td>
                            <td style={{ alignContent: "center" }}>
                              {/* Render different actions based on order status */}
                              {order.order_status === "Delivered" ? (
                                <p className="text-success">Order Delivered</p>
                              ) : order.order_status === "Cancelled" ? (
                                <p className="text-danger">
                                  Order Cancelled by Customer
                                </p>
                              ) : order.order_status === "Not Process" ? (
                                <p className="text-danger">
                                  Order Cancelled by You
                                </p>
                              ) : (
                                <button
                                  className="btn btn-primary btn-sm m-auto"
                                  onClick={() => {
                                    navigate(
                                      `/dashboard/seller/order-update/${order._id}`
                                    );
                                  }}
                                >
                                  View Order
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="card-body">
                  <h4 className="text-center">No orders found.</h4>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SellerOrders;
