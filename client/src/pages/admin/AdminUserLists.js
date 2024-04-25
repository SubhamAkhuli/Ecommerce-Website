import React, { useEffect, useState } from 'react';
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import { toast } from "react-hot-toast";

const AdminUserLists = () => {
  const [users, setUsers] = useState([]);

  // Get all users
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/userauth/alluserdetails`
      );
      // Filter out users whose name is "admin"
      const filteredUsers = data.users.filter(user => user.name.toLowerCase() !== 'admin');
      setUsers(filteredUsers);
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      toast.error("Something went wrong while fetching users.");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []); // Include an empty dependency array to fetch users only once when the component mounts

  return (
    <>
      <Header />
      <div className="container m-3" style={{ minHeight: "65.2vh" }}>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card" style={{ borderRadius: "5px", boxShadow: "0 0 10px #ccc" }}>
              <div className="card-header text-center">
                <h3>Users List</h3>
              </div>
              <div className="card-body">
                <h5 className="card-title mb-1">
                  Total {users.length === 1 ? "User" : "Users"}: {users.length}
                </h5>
                <div className="d-flex flex-wrap">
                  {users.map((user) => (
                    <div key={user._id} className="card m-2" style={{ width: "20rem", cursor: "pointer", borderRadius: "5px", boxShadow: "0 10px 10px #ccc" }}>
                      <div className="card-body">
                        <h5 className="card-title">
                          <b>Name:</b> {user.name}
                        </h5>
                        <p className="card-text">
                          <b>Email id:</b> {user.email}
                        </p>
                        <p className="card-text">
                          <b>Address:</b> {user.address}
                        </p>
                        <p className="card-text">
                          <b>Phone No:</b> {user.phone}
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
}

export default AdminUserLists;
