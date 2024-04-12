import React from 'react'
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";


const AdminUserLists = () => {

  const[users, setUsers] = useState([])
  // Get all users
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/userauth/alluserdetails`
      );
      setUsers(data.users);
      console.log(data);
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      toast.error("Something went wrong while fetching users.");
    }
  };

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line
  } , []); // Include userId in the dependency array
  
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
              <div className="card-header text-center">
                <h3>Users List</h3>
              </div>
              <div className="card-body">
                <h5 className="card-title mb-3">
                  Total Users: {users.length}
                </h5>
                <div className="table-responsive">
                  <table className="table table-bordered table-hover table-striped">
                    <thead>
                      <tr>
                        <th>Sr No.</th>
                        <th>User Name</th>
                        <th>User Email</th>
                        <th>User Phone</th>
                        <th>User Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr key={user._id}>
                          <td>{index + 1}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.phone}</td>
                          <td>{user.address}</td>
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
  )
}

export default AdminUserLists
