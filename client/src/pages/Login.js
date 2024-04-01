import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { NavLink } from "react-router-dom";

const Login = () => {
  return (
    <>
      <Header />
      <div className="container pnf " style={{minHeight:"69.8vh"}}>
      <p className="text-center " style={{fontSize:"30px"}}>To Login as a user please press User Login Button </p>
        <button type="button" className="btn btn-info m-2">
          <NavLink
            style={{
              textDecoration: "none",
              color: "Black",
            }}
            to="/userlogin"
          >
            User Login
          </NavLink>
        </button>
        <p className="text-center mt-5" style={{fontSize:"30px"}}>To Login as a seller please press Seller Login Button </p>  
        <button type="button" className="btn btn-info m-2">
          <NavLink
            style={{
              textDecoration: "none",
              color: "Black",
            }}
            to="/sellerlogin"
          >
            Seller Login
          </NavLink>
        </button>
        </div>

      <Footer />
    </>
  );
};

export default Login;
