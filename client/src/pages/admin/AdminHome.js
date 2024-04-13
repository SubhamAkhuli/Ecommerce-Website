import React from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import AdminMenu from "./AdminMenu";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function AdminHome() {
  const [seller, setSeller] = useState([]);
  const sellerData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/sellerauth/unverifiedsellers"
      );
      // console.log(response.data.sellers);
      setSeller(response.data.sellers);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    sellerData();
  }, []);

  const approveSeller = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/sellerauth/verifyseller/${id}`
      );
      sellerData();
      if (response.data.success) {
        toast.success(response.data.message);
      }else{
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const rejectSeller = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/sellerauth/sellerdelete/${id}`
      );
      sellerData();
      if (response.data.success) {
        toast.success("Seller Rejected Successfully");
      }
      else{
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div>
      <Header />
      <div className="container m-3" style={{ minHeight: "65.2vh" }}>
        <div className="row ">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card">
              <div className="card-header text-center">
                <h3> Welcome to the Admin Dashboard</h3>
              </div>
              <div className="card-body">
                <p className="card-text text-center">
                  You can manage all the users and sellers from here.
                </p>
                <br></br>
                <h4 className="card-title text-center">Verified the Sellers</h4>
                {seller.length === 0 ? (
                  <p className="card-text text-center">
                    No Sellers left for Verification .
                  </p>
                ) : (
                  <>
                    <h5 className="card-title text-center">
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
                            <p className="card-title"><b>Shop Name: </b>{seller.shop_name}</p>
                            <p className="card-text"> <b>Category: </b>{seller.category}</p>
                            <p className="card-text"><b>Seller Name: </b>{seller.name}</p>
                            <p className="card-text"><b>Email id: </b>{seller.email}</p>
                            <p className="card-text"><b>Address: </b>{seller.address}</p>
                            <p className="card-text"><b>Phone No: </b>{seller.phone}</p>
                            <button className="btn btn-success me-3" onClick={()=>{
                              approveSeller(seller._id);
                            }}>Approve</button>
                            <button className="btn btn-danger" onClick={()=>{rejectSeller(seller._id)}}>Reject</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminHome;
