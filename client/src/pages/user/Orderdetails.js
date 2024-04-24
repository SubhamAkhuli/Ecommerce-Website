import React, { useState, useEffect } from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import UserMenu from "./UserMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const Orderdetails = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [order, setOrder] = useState(null);

  const getOrder = async () => {
    try {
      const orderId = params.oid || "N/A";
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/order/getone-order/${orderId}`
      );
      setOrder(data);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while fetching order.");
    }
  };

  useEffect(() => {
    getOrder();
    // eslint-disable-next-line
  }, [params.oid]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handelcancelOrder = async (orderId) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/order/cancel-order/${orderId}`
      );
      if (data) {
        toast.success("Order Cancelled Successfully");
        getOrder();
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while cancelling order.");
    }
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
              <div className="card-header d-flex flex-wrap">
                <button
                  className="btn btn-primary "
                  style={{ borderRadius: "5px", boxShadow: "0 0 10px #ccc" }}
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  <i class="bi bi-arrow-left"></i>
                  Back
                </button>
                <h3 className="text-center mx-auto">Order Details</h3>
              </div>
              <div className="card-body">
                {order ? (
                  <>
                    <h5>Order ID: {order._id}</h5>

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
                          {order.order_status} (Order Cancelled by You)
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
                          {order.order_status} (Order Cancelled by the Seller)
                        </p>
                        <p style={{ marginBottom: "0px" }}>
                          <b>Cancelled Date: </b>
                          {formatDate(order.updatedAt)}
                        </p>
                      </>
                    )}
                    <p style={{ marginBottom: "0px" }}>
                      <b>Total Amount: ₹</b>
                      {order.total_price}
                    </p>
                    <p style={{ marginBottom: "0px" }}>
                      <b>Shipping Address: </b>
                      {order.shippingAddress}
                    </p>

                    <p style={{ marginBottom: "0px" }}>
                      <b>Payment Time: </b>
                      {formatDate(order.paymentResult.update_time)}
                    </p>
                    <h5>Order Items:</h5>
                    <div className="row">
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
                          <p style={{ marginBottom: "0px" }}>
                            <b>Seller Name: </b>
                            {item.seller_name}
                          </p>
                          <p style={{ marginBottom: "0px" }}>
                            <b>Product Name: </b>
                            {item.name}
                          </p>
                          <p style={{ marginBottom: "0px" }}>
                            <b>Quantity: </b>
                            {item.quantity}
                          </p>
                          <p style={{ marginBottom: "0px" }}>
                            <b>Price: ₹</b>
                            {item.price}
                          </p>
                        </div>
                      ))}
                    </div>
                    {!["Delivered", "Cancelled", "Not Process"].includes(
                      order.order_status
                    ) && (
                      <button
                        onClick={() => handelcancelOrder(order._id)}
                        className="btn btn-danger mt-3"
                      >
                        Cancel Order
                      </button>
                    )}
                  </>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Orderdetails;
