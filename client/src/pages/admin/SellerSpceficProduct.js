import React from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SellerSpceficProduct = () => {
  const [products, setProducts] = useState([]);
  const [sellerName, setSellerName] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  // Get all products by seller id
  const getAllProducts = async () => {
    try {
      const userId = params.pid || "N/A";
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/product/get-product/${userId}`
      );
      setProducts(data.products);
      const seller = await axios.get(
        `${process.env.REACT_APP_API_URL}/sellerauth/seller/${userId}`
      );
      setSellerName(seller.data.seller.name);
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
            <div className="card" style={{borderRadius:"5px", boxShadow:"0 0 10px #ccc"}}>
              <div className="card-header d-flex flex-wrap" >
                <button
                  className="btn btn-primary "
                  style={{borderRadius:"5px", boxShadow:"0 0 10px #ccc"}}
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  <i
                    className="bi bi-backspace me-2"
                    style={{ cursor: "pointer",marginBottom: "2px"}}
                  ></i>
                  Back
                </button>
                <h3 className="text-center mx-auto" >{sellerName}'s Specific Product</h3>
              </div>
              <div className="card-body">
                {products.length === 0 ? (
                  <p className="card-text text-center">No products found.</p>
                ) : (
                  <>
                    <h5 className="card-title">
                      Total Products: {products.length}
                    </h5>
                  </>
                )}
                <div className="d-flex flex-wrap">
                  {products.map((product) => (
                    <div
                      className="card m-2"
                      key={product._id}
                      style={{ width: "18rem" ,borderRadius:"5px", boxShadow:"0 0 10px #ccc", cursor:"pointer"}}
                    >
                      <img
                        src={`${process.env.REACT_APP_API_URL}/product/product-photo/${product._id}`}
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
                          <p className="card-text"><b>Brand: </b>{product.brand}</p> 
                          <p className="card-text"><b>Price: </b>₹{product.price}</p>
                          <p className="card-text"><b>Quantity: </b>{product.quantity}</p>
                          <p className="card-text"><b>Category: </b>{product.category}</p>
                          <p className="card-text"><b>Description: </b>{product.description}</p>
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

export default SellerSpceficProduct;
