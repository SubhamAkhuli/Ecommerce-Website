import React from "react";
import { useState } from "react";
import Headers from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    type: "",
    email: "",
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
      const { type, email, answer, newPassword, cpassword } = credentials;
      if (newPassword !== cpassword) {
        toast.error("Password do not match");
      } else if (!type) {
        toast.error("Please select user type");
      } else if (!email || !answer || !newPassword || !cpassword) {
        toast.error("Please fill all the fields");
      } else {
        if (type === "user") {
          const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/userauth/userforgotpassword`,
            {
              email,
              answer,
              newPassword,
            }
          );
          if (response.data.success) {
            toast.success(response.data.message);
            setTimeout(() => {
              navigate("/login");
            }, 100);
          } else {
            toast.error(response.data.message);
          }
        }
        if (type === "seller") {
          const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/sellerauth/sellerforgotpassword`,
            {
              email,
              answer,
              newPassword,
            }
          );
          if (response.data.success) {
            toast.success(response.data.message);
            setTimeout(() => {
              navigate("/login");
            }, 100);
          } else {
            toast.error(response.data.message);
          }
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
      <div className="container" style={{ minHeight: "69.8vh" }}>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card m-4" style={{borderRadius:"5px", boxShadow:"0 0 10px #ccc"}}>
              <div className="card-header">
                <h3 className="text-center">Change Password</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handelSubmit}>
                  <div className=" form-floating mb-3">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      id="floatingSelect"
                      name="type" // Added name attribute
                      onChange={onChange} // Added onChange event
                      value={credentials.type} // Added value attribute
                    >
                      <option value="" disabled>
                        Choose One
                      </option>
                      <option value="user">User(For Normal User)</option>
                      <option value="seller">Seller</option>
                    </select>
                    <label htmlFor="floatingSelect">Select User Type</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingEmail"
                      placeholder="name@example.com"
                      onChange={onChange}
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
                      id="floatingcPassword"
                      placeholder="Confrim Password"
                      onChange={onChange}
                      name="cpassword"
                      required
                    />
                    <label htmlFor="floatingcPassword">Confrim Password</label>
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

export default ForgotPassword;
