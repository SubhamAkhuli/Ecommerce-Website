import React from 'react'
import Header from '../../components/Layout/Header'
import Footer from '../../components/Layout/Footer'
import SellerMenu from './SellerMenu'
import { useAuth } from '../../context/auth'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const SellerHome = () => {
  const [user] = useAuth();
  const userId = user?.user?.id || "N/A";
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
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
        .filter((order) => order.orderItems.length > 0 && order.order_status === 'Processing'); // Remove orders with no matching order items
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


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/product/get-product/${userId}`
        );
        // Filter products based on quantity
        const filteredProducts = data.products.filter(product => product.quantity === 0);
        setProducts(filteredProducts);
      } catch (error) {
        console.error(error); // Log the error for debugging purposes
        toast.error("Something went wrong while fetching products.");
      }
    };

    fetchProducts();
  }, [userId]);

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
        <div className="container m-3" style={{minHeight:"65.2vh"}} >
        <div className="row">
          <div className="col-md-3">
            <SellerMenu />
          </div>
          <div className="col-md-9">
            <div className="card" style={{borderRadius:"5px", boxShadow:"0 0 10px #ccc"}}>
              <div className="card-header text-center">
                {" "}
                <h3>Welcome {user.user.name}</h3>
              </div>
              <div className='card-body'>
               {orders.length === 0 ? (
                  <p className="card-text text-center">
                    No new orders.
                  </p>
                ) : (
                  <>
                    <h5 className="card-title mb-2">
                      You have {orders.length} new {orders.length > 1 ? "orders" : "order"}:
                    </h5>
                    <div className="table-responsive ">
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
                          {orders.map((order, index) =>
                            order.orderItems.map((item, i) => (
                              <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{order._id}</td>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>₹{item.price}</td>
                                <td>{formatDate(order.updatedAt)}</td>
                                <td>
                                  <a href={`/dashboard/seller/order-update/${order._id}`} className="btn btn-primary">View Order</a>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
              <hr />
              <div className="card-body">
                {products.length === 0 ? (
                  <h5 className="card-text text-center">
                    No product is out of stock.
                  </h5>
                ) : (
                  <>
                    <h5 className="card-title">
                    You have {products.length}
                      {products.length > 1 ? " Products" : " Product"} which {products.length > 1 ? "are" : "is"} Out of Stock:
                    </h5>
                  </>
                )}
                <div className="d-flex flex-wrap">
                  {products.map((product) => (
                    <div
                      className="card m-2"
                      key={product._id}
                      style={{ width: "18rem",borderRadius:"5px", boxShadow:"0 0 10px #ccc" }}
                    >
                      <img
                        src={`${process.env.REACT_APP_API_URL}/product/product-photo/${product._id}`}
                        className="card-img-top"
                        style={{
                          height: "100px",
                          objectFit: "contain",
                          marginTop: "2px",
                        }}
                        alt={product.name}
                      />
                        <div className="card-body">
                          <h5 className="card-title">{product.name}</h5>
                          {product.quantity===0 ? (<p className="card-text text-danger"><b>Quantity: Out of Stock</b></p>) : (<p className="card-text"><b>Quantity: </b>{product.quantity}</p>)}
                          <p className="card-text" style={{marginBottom:"1px"}}>
                            <a href={`/dashboard/seller/update-product/${product._id}`} className='btn btn-primary'>Click here</a> to add new stock.
                          </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        </div>
        <Footer />
    </>
  )
}

export default SellerHome
