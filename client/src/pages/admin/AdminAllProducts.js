import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import AdminMenu from "./AdminMenu";

const AdminAllProducts = () => {
  const [products, setProducts] = useState([]);

  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-all-product`
      );
      setProducts(data.products);
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      toast.error("Something went wrong while fetching products.");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // Group products by category
  const groupProductsByCategory = (products) => {
    return products.reduce((acc, product) => {
      const category = product.category || "Unknown";
      if (!acc[category]) {
        acc[category] = {
          count: 0,
          products: []
        };
      }
      acc[category].count += 1;
      acc[category].products.push(product);
      return acc;
    }, {});
  };

  // Group products by category
  const groupedProducts = groupProductsByCategory(products);

  return (
    <>
      <Header />
      <div className="container m-3" style={{ minHeight: "65.2vh" }}>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card" style={{ borderRadius: "5px", boxShadow: "0 0 10px #ccc" }}>
              <div className="card-header text-center">
                <h3>All Products</h3>
              </div>
              <div className="card-body">
                <h5 className="card-title mb-3">
                  Total Products: {products.length}
                </h5>
                {Object.keys(groupedProducts).map((category) => (
                  <div key={category} style={{ marginBottom: "20px" }}>
                    <h4  className="text-center"
                      style={{ textShadow: "2px 2px 2px #ccc" }}
                    >
                      Category: {category} ({groupedProducts[category].count} {groupedProducts[category].count === 1 ? "product" : "products"})</h4>
                    <div className="d-flex flex-wrap">
                      {groupedProducts[category].products.map((product) => (
                        <div
                          className="card m-2"
                          key={product._id}
                          style={{ width: "18rem", borderRadius: "5px", boxShadow: "0 0 10px #ccc", cursor: "pointer" }}
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
                              <b>Seller Name:</b> {product.seller_name}
                            </p>
                            <p className="card-text">
                              <b>Brand:</b> {product.brand}
                            </p>
                            <p className="card-text">
                              <b>Price:</b> ₹{product.price}
                            </p>
                            <p className="card-text">
                              <b>Quantity:</b> {product.quantity}
                            </p>
                            <p className="card-text">
                              <b>Category:</b> {product.category}
                            </p>
                            <p className="card-text">
                              <b>Description:</b> {product.description}
                            </p>
                          </div>
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
      <Footer />
    </>
  );
};

export default AdminAllProducts;
