import React, { useEffect, useState } from 'react';
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useCart } from "../context/Cart";

const Product = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    brand: "",
  });
  const [add, setAdd] = useState(false);
  const [hide, setHide] = useState(false);
  const [cart, setCart] = useCart();
  const params = useParams();
  const navigate = useNavigate();
  const[Stock, setStock] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
    if (!user) {
      setHide(true);
    } else {
      setHide(false);
    }
  }, []);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/product/getone-product/${params.pid || "N/A"}`
        );
        setProduct(data.product);
        if(data.product.quantity === 0){
          setStock(true);
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong while fetching product.");
      }
    };

    getProduct();
  }, [params.pid]);

  const handelWishlist = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/wishlist/add-to-wishlist`,
        { product }
      );
      if (data.message === "Product already in wishlist") {
        toast.error(data.message);
        setAdd(true);
      } else {
        toast.success(data.message);
        setAdd(true);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while adding to wishlist.");
    }
  };

  return (
    <>
      <Header />
      <div className="container pnf" style={{ minHeight: "69.8vh" }}>
        <div className="row m-3">
          <div className="col-md-6">
            <img
              src={`${process.env.REACT_APP_API_URL}/product/product-photo/${product._id}`}
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
            {Stock && <p className="text-danger mb-0"><b>Currently Out of Stock</b></p>}
            <button style={{ boxShadow: "2px 2px 10px #ccc" }} className="btn btn-light text-bg-secondary" disabled={Stock} onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
              toast.success("Product added to cart");
              setTimeout(() => {
                navigate("/cart");
              }, 100);
            }}><i className="bi bi-cart-plus-fill m-1 "></i> Add to Cart</button>
            <button disabled={add} hidden={hide} style={{ boxShadow: "2px 2px 10px #ccc" }} className="btn btn-light text-bg-secondary m-2" onClick={handelWishlist}><i className="bi bi-heart-fill m-1 text-danger"></i> Add to Wishlist</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
