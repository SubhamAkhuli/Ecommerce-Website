import React, { useState } from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const SellerRegister = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    shop_name: "",
    category: "",
    name: "",
    email: "",
    address: "",
    phone: "",
    answer: "",
    password: "",
    cpassword: "",
  });

  const handleSubmit = async (e) => {
    // console.log(credentials);
    e.preventDefault();
    try {
      const {
        shop_name,
        category,
        name,
        email,
        password,
        cpassword,
        address,
        phone,
        answer,
      } = credentials;
      if (password !== cpassword) {
        toast.error("Password do not match");
      } else {
       
        const response = await axios.post(
          `http://localhost:8080/api/v1/sellerauth/sellerregister`,
          {
            shop_name,
            category,
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
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <>
      <Header />

      <div className="container m-3">
        <div className="row mb-1">
          <div className="col-md-6 offset-md-3">
            <div className="card mt-1" style={{borderRadius:"5px", boxShadow:"0 0 10px #ccc"}}>
              <div className="card-header">
                <h3 className="text-center">Seller Registration From</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      name="shop_name"
                      placeholder="Enter your Shop Name"
                      onChange={onChange}
                      aria-describedby="emailHelp"
                      minLength={3}
                      required
                    />
                    <label htmlFor="floatingInput">Shop Name</label>
                    <div id="emailHelp" className="form-text">
                      Please Enter valid name atleast 3 characters. 
                    </div>
                  </div>
                  <div className=" form-floating mb-3">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      id="floatingSelect"
                      name="category" // Added name attribute
                      onChange={onChange} // Added onChange event
                      value={credentials.category} // Added value attribute
                    >
                      <option value="" disabled>
                        Choose One
                      </option>
                      <option value=" Fashion & Apparel">
                        Fashion & Apparel
                      </option>
                      <option value="Electronics & Gadgets">
                        Electronics & Gadgets
                      </option>
                      <option value="Home & Lifestyle">Home & Lifestyle</option>
                      <option value="Beauty & Health">Beauty & Health</option>
                      <option value="Books & Stationary">
                        Books & Stationary
                      </option>
                      <option value="Sports & Outdoors">
                        Sports & Outdoors
                      </option>
                      <option value="Grocery & Food">Grocery & Food</option>
                      <option value="Furniture & Home Decor">
                        Furniture & Home Decor
                      </option>
                      <option value="Automobiles & Accessories">
                        Automobiles & Accessories
                      </option>
                      <option value="Toys & Games">Toys & Games</option>
                      <option value="Watch & Clocks">Watch & Clocks</option>
                    </select>
                    <label htmlFor="floatingSelect">Select Shop Category</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingName"
                      name="name"
                      placeholder="Enter your Name"
                      onChange={onChange}
                      aria-describedby="emailHelp"
                      minLength={3}
                      required
                    />
                    <label htmlFor="floatingName">Name</label>
                    <div id="emailHelp" className="form-text">
                      Please Enter valid name atleast 3 characters.
                    </div>
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
                  <p className="mt-3">
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

export default SellerRegister;
