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
      // console.log(data);
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      toast.error("Something went wrong while fetching users.");
    }
  };

  useEffect(() => {
    getAllUsers();
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
              <div className="card-header text-center">
                <h3>Users List</h3>
              </div>
              <div className="card-body">
                <h5 className="card-title mb-3">
                  Total Users: {users.length}
                </h5>
                <div className="list-group">
                  {users.map((user) => (
                    <div
                      className="list-group-item list-group-item-action"
                      style={{
                        cursor: "pointer",
                        border: "2px solid #ccc",
                        borderRadius: "5px",
                        margin: "5px",
                        padding: "5px",
                        boxShadow: "0 0 10px #ccc",
                      }}
                      key={user._id}
                    >
                      <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1"><b>Name: </b>{user.name}</h5>
                      </div>
                      <p className="mb-1"><b>Phone No: </b>{user.phone}</p>
                      <small><b>Email id: </b>{user.email}</small><br/>
                      <small><b>Address: </b>{user.address}</small>
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
  )
}

export default AdminUserLists
