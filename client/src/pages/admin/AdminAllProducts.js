import React from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {useNavigate} from "react-router-dom";

const AdminAllProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

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
                <div className="row">
                  {products.map((product) => (
                    <div className="col-md-4" key={product._id}>
                      <div className="card mb-3" style={{borderRadius: "5px", border: "2px solid #ccc"}}>
                        <img
                          src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                          alt={product.name}
                          className="card-img-top"
                          style={{ height: "200px", objectFit: "contain" , marginTop: "5px" }} 
                        />
                        <div className="card-body">
                          <h5 className="card-title">{product.name}</h5>
                          <p className="card-text">Price: ₹{product.price}</p>
                          <p className="card-text">Quantity: {product.quantity}</p>
                          <p className="card-text">Category: {product.category}</p>
                          <p className="card-text">
                            Description: {product.description}
                          </p>
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              navigate(
                                `/dashboard/admin/seller-specific-product/${product.seller}`
                              );
                            }}
                          >
                            View Seller
                          </button>
                        </div>
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
