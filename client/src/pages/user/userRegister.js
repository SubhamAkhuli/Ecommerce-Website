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
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, email, password, cpassword, address, phone } = credentials;
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
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Enter your Name"
                      onChange={onChange}
                      aria-describedby="emailHelp"
                      minLength={3}
                      required
                    />
                    <div id="emailHelp" className="form-text">
                      Please Enter valid name atleast 3 characters.
                    </div>
                  </div>

                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Enter your Email"
                      onChange={onChange}
                      aria-describedby="emailHelp"
                      required
                    />
                    <div id="emailHelp" className="form-text">
                      We'll never share your email with anyone else.
                    </div>
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      placeholder="Enter your Address"
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="Enter your Phone Number"
                      className="form-control"
                      id="phone"
                      name="phone"
                      onChange={onChange}
                      minLength={4}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      onChange={onChange}
                      className="form-control"
                      id="password"
                      name="password"
                      minLength={4}
                      placeholder="Enter your Password"
                      required
                    />
                    <div id="emailHelp" className="form-text">
                      Password atleast 4 characters.
                    </div>
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="cpassword"
                      name="cpassword"
                      placeholder="Confrim Password"
                      onChange={onChange}
                      minLength={4}
                      required
                    />
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
