import React, { useState } from "react";
import Headers from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const SellerLogin = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    // console.log(credentials);
    e.preventDefault();
    try {
      const { email, password } = credentials;
      if (!email || !password) {
        toast.error("Please fill all the fields");
      } else {
        const response = await axios.post(
          "http://localhost:8080/api/v1/sellerauth/sellerlogin",
          {
            email,
            password,
          }
        );
        if (response.data.success) {
          toast.success(response.data.message);
          setTimeout(() => {
            navigate("/");
          }, 100);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Login Failed");
    }
  };

  return (
    <>
      <Headers />
      <div className="container" style={{ minHeight: "69.8vh" }}>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card mt-5">
              <div className="card-header">
                <h3 className="text-center">Seller Login</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      onChange={onChange}
                      name="email"
                      required
                    />
                    <label htmlFor="floatingInput">Email address</label>
                  </div>
                    <div className="form-floating mb-3">
                    <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        onChange={onChange}
                        name="password"
                        required
                    />
                    <label htmlFor="floatingPassword">Password</label>
                    </div>
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                  <p className="mt-3">
                    Don't have an account?
                    <button className="btn btn-primary mx-2">
                      <NavLink
                        style={{
                          textDecoration: "none",
                          color: "white",
                        }}
                        to="/sellerregister"
                      >
                        Register
                      </NavLink>
                    </button>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SellerLogin;
