import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import SellerMenu from "../../pages/seller/SellerMenu";
import { useAuth } from "../../context/auth";
import { useRef } from "react";

const SellerProducts = () => {
  const [user] = useAuth();
  const userId = user?.user?.id || "N/A";
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const navigate = useNavigate();

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/product/get-product/${userId}`
      );
      setProducts(data.products);
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      toast.error("Something went wrong while fetching products.");
    }
  };

  useEffect(() => {
    getAllProducts();
    // eslint-disable-next-line
  }, [userId]); // Include userId in the dependency array


  // delete modal on set
  const ref = useRef(null);

  const refClose = useRef(null);
  
  const handelYes = async (e) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API_URL}/product/delete-product/${productId}`
      );
      if (data.success) {
        refClose.current.click();
        toast.success(data.message);
        getAllProducts();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error); // Log the error for debugging purposes
      toast.error("Something went wrong while deleting the product.");
    }
  };

  return (
    <>
      {/* delete modal */}

      <button
        type="button"
        className="btn btn-primary d-none"
        ref={ref}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Are You Sure want to delete this product ?{" "}
              </h1>
              <button
                type="button"
                className="btn-close"
                ref={refClose}
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
              >
                No
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handelYes}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <Header />
      <div className="container m-3" style={{ minHeight: "65.2vh" }}>
        <div className="row">
          <div className="col-md-3">
            <SellerMenu />
          </div>
          <div className="col-md-9">
            <div className="card" style={{borderRadius:"5px", boxShadow:"0 0 10px #ccc"}}>
              <div className="card-header text-center">
                <h3>Your Products</h3>
              </div>
              <div className="card-body">
                {products.length === 0 ? (
                  <p className="card-text text-center">
                    You have not added any products yet.{" "}
                    <Link to="/dashboard/seller/create-product" className="btn btn-primary">
                      Click here
                    </Link>{" "}
                    to add products.
                  </p>
                ) : (
                  <>
                    <h5 className="card-title">
                      Total: {products.length}
                      {products.length > 1 ? " Products" : " Product"}
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
                          height: "200px",
                          width: "150px",
                          margin: "auto",
                          objectFit: "contain",
                          marginTop: "5px",
                        }}
                        alt={product.name}
                      />
                        <div className="card-body">
                          <h5 className="card-title">{product.name}</h5>
                          <p className="card-text"><b>Seller Name: </b>{product.seller_name}</p>
                          <p className="card-text"><b>Brand: </b>{product.brand}</p> 
                          <p className="card-text"><b>Price: </b>₹{product.price}</p>
                          {product.quantity===0 ? (<p className="card-text text-danger"><b>Quantity: Out of Stock</b></p>) : (<p className="card-text"><b>Quantity: </b>{product.quantity}</p>)}
                          <p className="card-text"><b>Category: </b>{product.category}</p>
                          <p className="card-text"><b>Description: </b>{product.description}</p>
                      </div>
                      <i
                        className="fas fa-edit "
                        style={{
                          color: "green",
                          cursor: "pointer",
                          position: "absolute",
                          marginLeft: "230px",
                          marginTop: "10px",
                        }}
                        onClick={async () => {
                          try {
                            navigate(
                              `/dashboard/seller/update-product/${product._id}`
                            );
                          } catch (error) {
                            console.error(error); // Log the error for debugging purposes
                            toast.error(
                              "Something went wrong while updating the product."
                            );
                          }
                        }}
                      ></i>
                      <i
                        className="fas fa-trash-alt"
                        style={{
                          color: "red",
                          cursor: "pointer",
                          position: "absolute",
                          marginLeft: "260px",
                          marginTop: "10px",
                        }}
                        onClick={() => {
                          setProductId(product._id);
                          ref.current.click();
                        }}
                      ></i>
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

export default SellerProducts;
