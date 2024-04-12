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
      console.log(data);
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
                <div className="table-responsive">
                  <table className="table table-bordered table-hover table-striped">
                    <thead>
                      <tr>
                        <th>Sr No.</th>
                        <th>Seller Name</th>
                        <th>Product Name</th>
                        <th>Product Price</th>
                        <th>Product Quantity</th>
                        <th>Product Category</th>
                        <th>Product Description</th>
                        <th>Product Image</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product._id}>
                          <td>{products.indexOf(product) + 1}</td>
                          <td
                            onClick={() => {
                              navigate(
                                `/dashboard/admin/seller-specific-product/${product.seller}`
                              );
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            {product.seller_name}
                          </td>
                          {/* <td>{product_.sellername || "N/A"}</td> */}
                          <td>{product.name || "N/A"}</td>
                          <td>₹{product.price}</td>
                          <td>{product.quantity}</td>
                          <td>{product.category}</td>
                          <td>{product.description}</td>
                          <td>
                            <img
                              src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                              alt={product.name}
                              // style={{ width: "100px", height: "50px" }}
                              style={{
                                height: "200px",
                                width: "150px",
                                margin: "auto",
                                objectFit: "contain",
                                marginTop: "5px",
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
