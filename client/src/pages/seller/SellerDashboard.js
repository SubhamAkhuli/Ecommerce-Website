import React from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import { useAuth } from "../../context/auth";
import SellerMenu from "../../pages/seller/SellerMenu";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const SellerDashboard = () => {
  const [user] = useAuth();
  const userName = user?.user?.name || "N/A";
  const userEmail = user?.user?.email || "N/A";
  const userPhone = user?.user?.phone || "N/A";
  const userAddress = user?.user?.address || "N/A";
  const userShopName = user?.user?.shop_name || "N/A";
  const userShopType = user?.user?.category || "N/A";
  const userAns = user?.user?.answer || "N/A";
  const [credentials, setCredentials] = useState({
    name: userName,
    email: userEmail,
    phone: userPhone,
    address: userAddress,
    shop_name: userShopName,
    category: userShopType,
    answer: userAns,
  });

  const [edit, setEdit] = useState(0);
  const Clicked = () => {
    setEdit(1);
    toast.success("You can now edit your details");
    // console.log(edit);
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    // console.log(credentials);
    e.preventDefault();
    try {
      const { name, email, address, shop_name, category ,answer,phone} = credentials;
      if (!name) {
        toast.error("Name is Required");
      } else if (!email) {
        toast.error("Email is Required");
      } else if (!shop_name) {
        toast.error("Shop Name is Required");
      } else if (!category) {
        toast.error("Category is Required");
      } else if (!address) {
        toast.error("Address is Required");
      }else if (!answer) {
        toast.error("Answer is Required");
      }
       else if (
        name === userName &&
        email === userEmail &&
        phone === userPhone &&
        address === userAddress &&
        shop_name === userShopName &&
        category === userShopType &&
        answer === userAns
      ) {
        toast.error("No Changes Made");
        setEdit(0);
      } else {
        const response = await axios.put(
          `http://localhost:8080/api/v1/sellerauth/sellerupdatedetails/${user?.user?.id}`,
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
          setEdit(0);
        }
        else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Header />
      <div className="container m-3">
        <div className="row">
          <div className="col-md-3">
            <SellerMenu />
          </div>
          <div className="col-md-9">
            <div className="card">
              <div className="card-header text-center">
                {" "}
                <h3>Welcome {userName}</h3>
              </div>
              <div className="card-body">
                <form>
                  <div className="form-floating mb-3">
                    <input
                      disabled={edit === 0 ? true : false}
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Enter your Shop Name"
                      onChange={onChange}
                      value={credentials.shop_name}
                      name="shop_name"
                      required
                    />
                    <label htmlFor="floatingInput">Shop Name</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      disabled={edit === 0 ? true : false}
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Enter your Shop Type"
                      onChange={onChange}
                      value={credentials.category}
                      name="category"
                      required
                    />
                    <label htmlFor="floatingInput">Shop Type</label>
                  </div>


                  <div className="form-floating mb-3">
                    <input
                      disabled={edit === 0 ? true : false}
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Enter your Name"
                      onChange={onChange}
                      value={credentials.name}
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
                      value={credentials.email}
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
                      value={credentials.address}
                      name="address"
                      required
                    />
                    <label htmlFor="floatingInput">Address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      disabled={edit === 0 ? true : false}
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Enter your Phone Number"
                      onChange={onChange}
                      value={credentials.phone}
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
                      value={credentials.answer}
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
                    className="btn btn-primary"
                    onClick={Clicked}
                  >
                    Edit
                  </button>
                  <button
                    disabled={edit === 0 ? true : false}
                    type="submit"
                    onClick={handleSubmit}
                    className="btn btn-primary m-3"
                  >
                    Save
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
