import React from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const AdminAllProducts = () => {
  const [products, setProducts] = useState([]);

  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-all-product`
      );
      setProducts(data.products);
      // console.log(data);
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      toast.error("Something went wrong while fetching products.");
    }
  };

  useEffect(() => {
    getAllProducts();
    // eslint-disable-next-line
  }, []); // Include userId in the dependency array

  return (
    <>
      <Header />
      <div className="container m-3" style={{ minHeight: "65.2vh" }}>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card">
              <div className="card-header text-center">
                <h3>All Products</h3>
              </div>
              <div className="card-body">
                <h5 className="card-title mb-3">
                  Total Products: {products.length}
                </h5>
                <div className="d-flex flex-wrap" >
                  {products.map((product) => (
                    <div
                      className="card m-2"
                      key={product._id}
                      style={{ width: "18rem" ,borderRadius:"5px", boxShadow:"0 0 10px #ccc", cursor:"pointer" }}
                    >
                      <img
                        src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                        className="card-img-top"
                        style={{
                          height: "200px",
                          objectFit: "contain",
                          marginTop: "10px",
                        }}
                        alt={product.name}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">
                          <b>Seller Name: </b>
                          {product.seller_name}
                        </p>
                        <p className="card-text">
                          <b>Brand: </b>
                          {product.brand}
                        </p>
                        <p className="card-text">
                          <b>Price: </b>₹{product.price}
                        </p>
                        <p className="card-text">
                          <b>Quantity: </b>
                          {product.quantity}
                        </p>
                        <p className="card-text">
                          <b>Category: </b>
                          {product.category}
                        </p>
                        <p className="card-text">
                          <b>Description: </b>
                          {product.description}
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
  );
};

export default AdminAllProducts;
