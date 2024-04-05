import React from "react";
import Header from '../../components/Layout/Header'
import Footer from '../../components/Layout/Footer'
import { useAuth } from "../../context/auth";

const  UserDashboard = () => {
  const [user ]= useAuth();
  const userName = user?.user?.name || "N/A";
  const userEmail = user?.user?.email || "N/A";
  const userAddress = user?.user?.address || "N/A";
  return (
    <>
    <Header/>
      <div className="container-flui m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            {/* <UserMenu /> */}
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>{userName}</h3>
              <h3>{userEmail}</h3>
              <h3>{userAddress}</h3>
            </div>
          </div>
        </div>
      </div>
    <Footer/>
    </>
  );
};

export default  UserDashboard;

