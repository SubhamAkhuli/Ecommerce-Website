import React, { useState } from "react";
import Headers from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../context/auth";

const Login = () => {
  const navigate = useNavigate();
  const [ user, setUser ] = useAuth();
  const location = useLocation();

  const [credentials, setCredentials] = useState({
    type: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { type, email, password } = credentials;

      if (!type) {
        toast.error("Please select user type");
      } else {
        if (type === "user") {
          if (!email || !password) {
            toast.error("Please fill all the fields");
          } else {
            const response = await axios.post(
              `${process.env.REACT_APP_API_URL}/userauth/userlogin`,
              {
                email,
                password,
              }
            );
            if (response.data.success) {
              toast.success(response.data.message);
              setUser({
                ...user,
                user: response.data.user,
                token: response.data.token,
              });
              
              localStorage.setItem("user", JSON.stringify(response.data));
              setTimeout(() => {
                navigate(location.state || "/dashboard/user");
              }, 100);
            } else {
              toast.error(response.data.message);
            }
          }
        } else if (type === "seller") {
          if (!email || !password) {
            toast.error("Please fill all the fields");
          } else {
            const response = await axios.post(
              `${process.env.REACT_APP_API_URL}/sellerauth/sellerlogin`,
              {
                email,
                password,
              }
            );
            if (response.data.success) {
              setUser({
                ...user,
                user: response.data.user,
                token: response.data.token,
              }); 

              if (response.data.user.verified) {
                toast.success(response.data.message);
                localStorage.setItem("user", JSON.stringify(response.data));
                setTimeout(() => {
                  navigate(location.state || "/dashboard/seller");
                }, 100);
              }
              else{
                // toast.success("Please verify your account")
                setTimeout(() => {
                  navigate(location.state || `/sellerverification/${response.data.seller_id}`);
                }, 100);
              }
            } else {
              if (response.data.message === "Please wait ,Your Account is not verified yet") {
                toast.error(response.data.message)
                setTimeout(() => {
                  navigate(location.state || `/sellerverification/${response.data.seller_id}`);
                }, 100);
              } else {
              toast.error(response.data.message);
              }
            }
          }
        } else if (type === "admin") {
          if (!email || !password) {
            toast.error("Please fill all the fields");
          } else {
            const response = await axios.post(
              `${process.env.REACT_APP_API_URL}/adminauth/adminlogin`,
              {
                email,
                password,
              }
            );
            if (response.data.success) {
              toast.success(response.data.message);
              setUser({
                ...user,
                user: response.data.user,
                token: response.data.token,
              });
              
              localStorage.setItem("user", JSON.stringify(response.data));
              setTimeout(() => {
                navigate(location.state || "/dashboard/admin");
              }, 100);
            } else {
              toast.error(response.data.message);
            }
          }
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
      <div className="container" >
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card m-3 " style={{borderRadius:"5px", boxShadow:"0 0 10px #ccc"}}>
              <div className="card-header">
                <h3 className="text-center">Login</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
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
                      <option value="admin">Admin</option>
                    </select>
                    <label htmlFor="floatingSelect">Select User Type</label>
                  </div>

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
                  <div id="emailHelp" className="form-text">
                    <NavLink
                      style={{
                        textDecoration: "none",
                      }}
                      to="/forgotpassword"
                    >
                      Forget Password?
                    </NavLink>
                  </div>
                  <button type="submit" className="btn btn-primary mt-3">
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
                        to="/userregister"
                      >
                        Register
                      </NavLink>
                    </button>
                    <b>/</b>
                    <button className="btn btn-primary mx-2">
                      <NavLink
                        style={{
                          textDecoration: "none",
                          color: "white",
                        }}
                        to="/sellerregister"
                      >
                        Seller Register
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

export default Login;
