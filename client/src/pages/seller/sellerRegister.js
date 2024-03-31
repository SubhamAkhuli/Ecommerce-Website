import React, { useState } from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import { NavLink } from "react-router-dom";
import toast from 'react-hot-toast';

const SellerRegister = () => {
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
    console.log("form submitted");
    console.log(credentials);
    toast.success('Registration Successful');
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <>
      <Header />

      <div className="container" style={{ minHeight: "70.7vh" }}>
        <h1 className="text-center my-3">Seller Registration From</h1>
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
              <option value=" Fashion & Apparel"> Fashion & Apparel</option>
              <option value="Electronics & Gadgets">
                Electronics & Gadgets
              </option>
              <option value="Home & Lifestyle">Home & Lifestyle</option>
              <option value="Beauty & Health">Beauty & Health</option>
              <option value="Books & Stationary">Books & Stationary</option>
              <option value="Sports & Outdoors">Sports & Outdoors</option>
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
              id="phone_no"
              name="phone_no"
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
      <Footer />
    </>
  );
};

export default SellerRegister;
