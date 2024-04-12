import React from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminSellerlist = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  // Get all sellers
  const getAllSellers = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/sellerauth/allsellers`
      );
      setUsers(data.sellers);
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
      <div className="container m-3" style={{ minHeight: "65.2vh" }}>
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
                  Total Sellers: {users.length}
                </h5>
                <div className="table-responsive">
                  <table className="table table-bordered table-hover table-striped">
                    <thead>
                      <tr>
                        <th>Sr No.</th>
                        <th>Seller Name</th>
                        <th>Seller Email</th>
                        <th>Seller Phone</th>
                        <th>Seller Address</th>
                        <th>Seller Shop Name</th>
                        <th>Seller Category</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td
                            onClick={() => {
                              navigate(
                                `/dashboard/admin/seller-specific-product/${user._id}`
                              );
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            {user.name}
                          </td>
                          <td>{user.email}</td>
                          <td>{user.phone}</td>
                          <td>{user.address}</td>
                          <td>{user.shop_name}</td>
                          <td>{user.category}</td>
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

export default AdminSellerlist;
