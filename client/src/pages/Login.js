import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { NavLink } from "react-router-dom";

const Login = () => {
  return (
    <>
      <Header />
      <div className="container " style={{ minHeight: "69.8vh" }}>
      <div className="pnf ">
        <button type="button" className="btn btn-info mb-3 ">
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
        <button type="button" className="btn btn-info">
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
      </div>

      <Footer />
    </>
  );
};

export default Login;
