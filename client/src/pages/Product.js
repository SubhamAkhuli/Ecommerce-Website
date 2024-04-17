import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Product = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    brand: "",
  });

  // get product details
  const getProduct = async () => {
    try {
      const productId = params.pid || "N/A";
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/getone-product/${productId}`
      );
      setProduct(data.product);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while fetching product.");
    }
  };

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line
  }, [params.pid]);

  return (
    <>
      <Header />
      <div className="container pnf" style={{minHeight:" 69.8vh"}}>
        <div className="row m-3">
          <div className="col-md-6">
            <img
              src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
              className="card-img-top"
              style={{
                width: "300px",
                height: "300px",
                margin: "20px",
                objectFit: "contain",
              }}
              alt={product.name}
            />
          </div>
          <div className="col-md-6">
            <h2>{product.name}</h2>
            <p><b>Brand: </b>{product.brand}</p>
            <p><b>Price: </b>₹{product.price}</p>
            <p><b>Description: </b> {product.description}</p>
            <button style={{boxShadow:"2px 2px 10px #ccc"}} className="btn btn-light" onClick={()=>{
              navigate("/cart")
            }}>Add to Cart</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
