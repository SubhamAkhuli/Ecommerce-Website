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
    password: "",
    cpassword: "",
  });

  const handleSubmit = async (e) => {
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
      } = credentials;
      if (password !== cpassword) {
        toast.error("Password do not match");
      } else {
        // console.log(credentials);
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

      <div className="container">
        <div className="row mb-1">
          <div className="col-md-6 offset-md-3">
            <div className="card mt-1">
              <div className="card-header">
                <h3 className="text-center">Seller Registration From</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="shop_name"
                      name="shop_name"
                      placeholder="Enter your Shop Name"
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
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      name="category" // Added name attribute
                      onChange={onChange} // Added onChange event
                      value={credentials.category} // Added value attribute
                    >
                      <option value="" disabled>
                        Choose Your Shop Category
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
                  </div>

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
