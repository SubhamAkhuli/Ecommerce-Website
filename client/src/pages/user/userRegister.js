import React, { useState } from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const UserRegister = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    address: "",
    phone: "",
    answer: "",
  });

  const handleSubmit = async (e) => {
    console.log(credentials);
    e.preventDefault();
    try {
      const { name, email, password, cpassword, address, phone,answer } = credentials;
      if (password !== cpassword) {
        toast.error("Password do not match");
      } else {
        const response = await axios.post(
          `http://localhost:8080/api/v1/userauth/userregister`,
          {
            name,
            email,
            password,
            address,
            phone,
            answer,
          }
        );
        if (response.data.success) {
          toast.success(response.data.message);
          // navigate('/login');
          setTimeout(() => {
            navigate("/login");
          }, 100);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Registration Failed");
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Header />
        <div className="container" >
        <div className="row mb-2">
          <div className="col-md-6 offset-md-3">
            <div className="card mt-3">
              <div className="card-header">
                <h3 className="text-center">Registration From</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingName"
                      placeholder="Enter your Name"
                      onChange={onChange}
                      name="name"
                      required
                    />
                    <label htmlFor="floatingName">Name</label>
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
                    <div id="emailHelp" className="form-text">
                      We'll never share your email with anyone else.
                    </div>
                  </div>


                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingAddress"
                      placeholder="Enter your Name"
                      onChange={onChange}
                      name="address"
                      required
                    />
                    <label htmlFor="floatingAddress">Address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingPhone"
                      placeholder="Enter your Phone Number"
                      onChange={onChange}
                      name="phone"
                      required
                    />
                    <label htmlFor="floatingPhone">Phone Number</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingAnswer"
                      placeholder="Enter your Answer"
                      onChange={onChange}
                      name="answer"
                      required
                    />
                    <label htmlFor="floatingAnswer">What is Your Favorite sport?</label>
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
                    <div id="emailHelp" className="form-text">
                      Password atleast 4 characters.
                    </div>
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
                  <p >
                    Already have an account?
                    <button className="btn btn-primary mx-2">
                      <NavLink
                        style={{
                          textDecoration: "none",
                          color: "white",
                        }}
                        to="/login"
                      >
                        Login
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

export default UserRegister;
