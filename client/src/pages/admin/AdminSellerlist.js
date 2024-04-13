import React from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminSellerlist = () => {
  // const [users, setUsers] = useState([]);
  const [seller, setSeller] = useState([]);
  const navigate = useNavigate();
  // Get all sellers
  const getAllSellers = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/sellerauth/allsellers`
      );
      // setUsers(data.sellers);
      setSeller(data.sellers);
      // console.log(data);
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      toast.error("Something went wrong while fetching sellers.");
    }
  };

  useEffect(() => {
    getAllSellers();
    // eslint-disable-next-line
  }, []); // Include userId in the dependency array

  return (
    <>
      <Header />
      <div className="container m-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card">
              <div className="card-header ">
                <h3 className="text-center">Sellers List</h3>
              </div>
              <div className="card-body">
                <h5 className="card-title mb-3">
                  Total Sellers: {seller.length}
                </h5>
                <div className="d-flex flex-wrap">
                  {seller.map((seller) => (
                    <div
                      className="card m-2"
                      key={seller._id}
                      style={{ width: "18rem" }}
                    >
                      <div className="card-body">
                        <h5 className="card-title">
                          <b>Shop Name: </b>
                          {seller.shop_name}
                        </h5>
                        <p className="card-text">
                          {" "}
                          <b>Category: </b>
                          {seller.category}
                        </p>
                        <p className="card-text">
                          <b>Seller Name: </b>
                          {seller.name}
                        </p>
                        <p className="card-text">
                          <b>Email id: </b>
                          {seller.email}
                        </p>
                        <p className="card-text">
                          <b>Address: </b>
                          {seller.address}
                        </p>
                        <p className="card-text">
                          <b>Phone No: </b>
                          {seller.phone}
                        </p>
                        <p
                          className="card-text text-primary"
                          onClick={() => {
                            navigate(
                              `/dashboard/admin/seller-specific-product/${seller._id}`
                            );
                          }}
                          style={{ cursor: "pointer"}}
                        >
                          <b>Seller Products...</b>
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

export default AdminSellerlist;
