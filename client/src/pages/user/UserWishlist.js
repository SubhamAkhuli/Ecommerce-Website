import React, { useEffect } from "react";
import Headers from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import UserMenu from "./UserMenu";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";

const UserWishlist = () => {
  const [user] = useAuth();
  const [wishlist, setWishlist] = useState([]);
  // show wishlist
  const showWishlist = async () => {
    // get all wishlist by user id
    const { data } = await axios.get(
      `http://localhost:8080/api/v1/wishlist/${user.user.id}`
    );
    if (data) {
      setWishlist(data);
      //  console.log(data);
    }
  };

  useEffect(() => {
    showWishlist();
    // eslint-disable-next-line
  }, []);

  // Helper function to truncate description to 15 words
  const truncateDescription = (description) => {
    const words = description.split(" ");
    if (words.length > 5) {
      return words.slice(0, 5).join(" ") + "...";
    }
    return description;
  };

  // remove product from wishlist
  const handelRemove = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/wishlist/remove/${id}`
      );
      if (data) {
        toast.success(data.message);
        showWishlist();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Headers />
      <div className="container m-3" style={{ minHeight: "65.2vh" }}>
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div
              className="card"
              style={{ borderRadius: "5px", boxShadow: "0 0 10px #ccc" }}
            >
              <div className="card-header text-center">
                {" "}
                <h3>Your Wishlist</h3>
              </div>
              <div className="card-body">
                <div className="d-flex flex-wrap ">

                  {wishlist.length > 0 ? (
                    wishlist.map((wish) => (
                      <div className="col-md-4" key={wish._id}>
                        <div
                          className="card m-2"
                          style={{
                            borderRadius: "5px",
                            boxShadow: "0 0 10px #ccc",
                          }}
                        >
                          <img
                            src={`http://localhost:8080/api/v1/product/product-photo/${wish.product._id}`}
                            className="card-img-top mt-1"
                            style={{ height: "150px" ,width:"100%",objectFit:"contain"}}
                            alt="..."
                          />
                          <div className="card-body">
                            <h5 className="card-title">{wish.product.name}</h5>
                            <p className="card-text">
                              {truncateDescription(wish.product.description)}
                            </p>
                            <a
                              href={`/product-details/${wish.product._id}`}
                              className="btn btn-primary ms-2"
                            >
                              View Product
                            </a>
                            <button className="btn btn-danger ms-2"
                            onClick={()=>{handelRemove(wish._id)}}>
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-md-12 text-center">
                      <h3>No Wishlist Found</h3>
                    </div>
                  )}
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

export default UserWishlist;
