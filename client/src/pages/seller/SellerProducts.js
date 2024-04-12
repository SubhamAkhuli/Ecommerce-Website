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
        `http://localhost:8080/api/v1/product/get-product/${userId}`
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
        `http://localhost:8080/api/v1/product/delete-product/${productId}`
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
            <div className="card">
              <div className="card-header text-center">
                <h3>Your Products</h3>
              </div>
              <div className="card-body">
                {products.length === 0 ? (
                  <p className="card-text text-center">
                    You have not added any products yet.{" "}
                    <Link to="/dashboard/seller/create-product">
                      Click here
                    </Link>{" "}
                    to add products.
                  </p>
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
                      style={{ width: "18rem" }}
                    >
                      <img
                        src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
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
                        <h5 className="card-title">
                          <b>{product.name}</b>
                        </h5>
                        <p
                          className="card-text"
                          style={{ marginBottom: "2px" }}
                        >
                          {product.description}
                        </p>
                        <p
                          className="card-text"
                          style={{ marginBottom: "2px" }}
                        >
                          <b>Price: ₹</b>
                          {product.price}
                        </p>
                        <p
                          className="card-text"
                          style={{ marginBottom: "2px" }}
                        >
                          <b>Brand:</b> {product.brand}
                        </p>
                        <p
                          className="card-text"
                          style={{ marginBottom: "2px" }}
                        >
                          <b>Quantity:</b> {product.quantity}
                        </p>
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
