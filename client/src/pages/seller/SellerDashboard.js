import React from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import { useAuth } from "../../context/auth";
import SellerMenu from "../../pages/seller/SellerMenu";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect } from "react";

const SellerDashboard = () => {
  const [user] = useAuth();
  const userId = user?.user?.id || "N/A";

  const [credentials, setCredentials] = useState([]);
  const [userDetails, setUserDetails] = useState({
    shop_name: '',
    category: '',
    name: '',
    email: '',
    address: '',
    phone: '',
    answer: '',
  });
  

  const getUserDetails = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/sellerauth/seller/${userId}`
      );
      setUserDetails(data.seller);
      setCredentials(data.seller);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching user details.");
    }
  };

  useEffect(() => {
    getUserDetails();
    // eslint-disable-next-line
  }, []);

  const [name, setName] = useState(credentials.name);
  const [edit, setEdit] = useState(0);
  const Clicked = () => {
    setEdit(1);
    toast.success("You can now edit your details");
  };
  const onChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, email, address, shop_name, category, answer, phone } =
        userDetails;
      if (
        credentials.name === name &&
        credentials.email === email &&
        credentials.address === address &&
        credentials.shop_name === shop_name &&
        credentials.category === category &&
        credentials.answer === answer &&
        credentials.phone === phone
      ) {
        toast.error("No Changes Made");
        setEdit(0);
      } else {
        if (!name) {
          toast.error("Name is Required");
        } else if (!phone) {
          toast.error("Phone is Required");
        } else if (!email) {
          toast.error("Email is Required");
        } else if (!shop_name) {
          toast.error("Shop Name is Required");
        } else if (!category) {
          toast.error("Category is Required");
        } else if (!address) {
          toast.error("Address is Required");
        } else if (!answer) {
          toast.error("Answer is Required");
        } else {
          const response = await axios.put(
            `http://localhost:8080/api/v1/sellerauth/sellerupdatedetails/${userId}`,
            {
              name,
              email,
              phone,
              address,
              shop_name,
              category,
              answer,
            }
          );
          if (response.data.success) {
            localStorage.setItem("user", JSON.stringify(response.data));
            toast.success(response.data.message);
            setName(name);
            setEdit(0);
          } else {
            toast.error(response.data.message);
            if (response.data.message === "Email Already Registered") {
              setEdit(0);
            }
          }
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Header username={name} />
      <div className="container m-3">
        <div className="row">
          <div className="col-md-3">
            <SellerMenu />
          </div>
          <div className="col-md-9">
            <div className="card" style={{borderRadius:"5px", boxShadow:"0 0 10px #ccc"}}>
              <div className="card-header text-center">
                {" "}
                <h3>Welcome {name}</h3>
              </div>
              <div className="card-body">
                <form>
                  {edit === 1 ? (
                    <div
                      className="alert alert-warning text-center"
                      role="alert"
                    >
                      You are in Edit Mode
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="form-floating mb-3">
                    <input
                      disabled={edit === 0 ? true : false}
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Enter your Shop Name"
                      onChange={onChange}
                      value={userDetails.shop_name}
                      name="shop_name"
                      required
                    />
                    <label htmlFor="floatingInput">Shop Name</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      disabled
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Enter your Shop Type"
                      onChange={onChange}
                      value={userDetails.category}
                      name="category"
                      required
                    />
                    <label htmlFor="floatingInput">
                      Shop Type{" "}
                      {edit === 1 ? "(Shop Type can not be Changed)" : ""}
                    </label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      disabled={edit === 0 ? true : false}
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Enter your Name"
                      onChange={onChange}
                      value={userDetails.name}
                      name="name"
                      required
                    />
                    <label htmlFor="floatingInput">Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      disabled={edit === 0 ? true : false}
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      onChange={onChange}
                      value={userDetails.email}
                      name="email"
                      required
                    />
                    <label htmlFor="floatingInput">Email address</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      disabled={edit === 0 ? true : false}
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Enter your Name"
                      onChange={onChange}
                      value={userDetails.address}
                      name="address"
                      required
                    />
                    <label htmlFor="floatingInput">Shop Address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      disabled={edit === 0 ? true : false}
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Enter your Phone Number"
                      onChange={onChange}
                      value={userDetails.phone}
                      name="phone"
                      required
                    />
                    <label htmlFor="floatingInput">Phone Number</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      disabled={edit === 0 ? true : false}
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Enter your Answer"
                      onChange={onChange}
                      value={userDetails.answer}
                      name="answer"
                      required
                    />
                    <label htmlFor="floatingInput">
                      What is Your Favorite sport?
                    </label>
                  </div>

                  <button
                    disabled={edit === 1 ? true : false}
                    type="button"
                    className={`btn btn-primary ${edit === 1 ? "d-none" : ""}`}
                    onClick={Clicked}
                  >
                    Edit
                  </button>

                  <button
                    disabled={edit === 0 ? true : false}
                    type="submit"
                    onClick={handleSubmit}
                    className={`btn btn-success m-1 ${
                      edit === 0 ? "d-none" : ""
                    }`}
                  >
                    Save
                  </button>
                  <button
                    disabled={edit === 0 ? true : false}
                    type="button"
                    className={`btn btn-danger ms-3 ${
                      edit === 0 ? "d-none" : ""
                    }`}
                    onClick={() => {
                      setEdit(0);
                    }}
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

export default SellerDashboard;
