import React from "react";
import { useState } from "react";
import Headers from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import SellerMenu from "./SellerMenu";

const SellerChangePassword = () => {
  const [user] = useAuth();
  const userEmail = user?.user?.email || "N/A";
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    answer: "",
    newPassword: "",
    cpassword: "",
  });
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const { answer, newPassword, cpassword } = credentials;
      if (newPassword !== cpassword) {
        toast.error("Password do not match");
      } else if (!answer || !newPassword || !cpassword) {
        toast.error("Please fill all the fields");
      } else {
        const response = await axios.post(
          `http://localhost:8080/api/v1/sellerauth/sellerforgotpassword`,
          {
            email: userEmail,
            answer,
            newPassword,
          }
        );
        if (response.data.success) {
          toast.success(response.data.message);
          setTimeout(() => {
            navigate("/dashboard/seller");
          }, 100);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Password Change Failed");
    }
  };
  return (
    <>
      <Headers />
      <div className="container m-3" style={{ minHeight: "65.2vh" }}>
        <div className="row">
          <div className="col-md-3">
            <SellerMenu />
          </div>
          <div className="col-md-9">
            <div className="card">
              <div className="card-header text-center ">
                <h3>Change Password</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handelSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      disabled
                      type="email"
                      className="form-control"
                      id="floatingEmail"
                      placeholder="name@example.com"
                      value={userEmail}
                      name="email"
                      required
                    />
                    <label htmlFor="floatingEmail">Email address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Enter your Answer"
                      onChange={onChange}
                      name="answer"
                      required
                    />
                    <label htmlFor="floatingInput">
                      What is Your Favorite sport?
                    </label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      onChange={onChange}
                      name="newPassword"
                      required
                    />
                    <label htmlFor="floatingPassword">New Password</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingCPassword"
                      placeholder="Confrim Password"
                      onChange={onChange}
                      name="cpassword"
                      required
                    />
                    <label htmlFor="floatingPassword">Confrim Password</label>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger mx-3"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </button>
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

export default SellerChangePassword;
