import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
// import axios from "axios";
// import { useRef } from "react";
// import { useNavigate } from "react-router-dom";

const SellerMenu = () => {
  // eslint-disable-next-line
  const [user, setUser] = useAuth();
  // const userId = user?.user?.id;
  // const navigate = useNavigate();

  // logout
  const HandelLogout = () => {
    setUser({
      user: null,
      token: "",
    });
    localStorage.removeItem("user");
    setTimeout(() => {
      toast.success("Logout Successfully");
    }, 100);
  };

  // delete modal on set
  // const ref = useRef(null);

  // const handelDelete = () => {
  //   // on the delete modal
  //   ref.current.click();
  // };

  // const handelYes = async (e) => {
  //   e.preventDefault();
  //   // console.log("delete");
  //   setUser({
  //     user: null,
  //     token: "",
  //   });
  //   const response = await axios.delete(
  //     `http://localhost:8080/api/v1/sellerauth/sellerdelete/${userId}`
  //   );
  //   if (response.data.success) {
  //     toast.success(response.data.message);
  //     localStorage.removeItem("user");
  //     setTimeout(() => {
  //       navigate("/");
  //     }, 100);
  //   } else {
  //     toast.error(response.data.message);
  //   }
  // };
  return (
    <>
      {/* Delete conformation Modal */}
      {/* <div>
        <button
          type="button"
          className="btn btn-primary d-none"
          ref={ref}
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Launch demo modal
        </button>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1
                  className="modal-title fs-5 text-danger"
                  id="exampleModalLabel"
                >
                  You want to delete your account!!
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success"
                  data-bs-dismiss="modal"
                >
                  No
                </button>
                <button
                  type="button"
                  onClick={handelYes}
                  className="btn btn-danger"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div
        className="list-group card"
        style={{ borderRadius: "5px", boxShadow: "0 5px 10px #ccc" }}
      >
        <div className="card-header text-center">
          <h4>Seller Menu</h4>
        </div>
        <Link
          to="/dashboard/seller"
          className="list-group-item list-group-item-action"
        >
          <i className="bi bi-house m-2 text-primary"></i> Home
        </Link>
        <Link
          to="/dashboard/seller/profile"
          className="list-group-item list-group-item-action"
        >
          <i className="fa-regular fa-user m-2 text-primary"></i> Profile
        </Link>
        <Link
          to="/dashboard/seller/create-product"
          className="list-group-item list-group-item-action"
        >
          <i className="fa-solid fa-boxes-packing m-2 text-primary"></i>Add
          Product
        </Link>
        <Link
          to="/dashboard/seller/products"
          className="list-group-item list-group-item-action"
        >
          <i className="bi bi-box-seam m-2 text-primary"></i>
          Your Products
        </Link>
        <Link
          to="/dashboard/seller/orders"
          className="list-group-item list-group-item-action"
        >
          <i className="fa-solid fa-dolly m-2 text-primary"></i>
          Your Orders
        </Link>
        <Link
          to="/dashboard/seller/changepassword"
          className="list-group-item list-group-item-action"
        >
          <i className="bi bi-key m-2 text-primary"></i>Change Password
        </Link>
        {/* <p
          onClick={handelDelete}
          className="list-group-item list-group-item-action text-danger"
          style={{ cursor: "pointer", marginBottom: "0px" }}
        >
          <i className="fa-solid fa-user-slash m-2 text-primary"></i>{" "}
          <b>Delete Account</b>
        </p> */}
        <Link
          to="/login"
          onClick={HandelLogout}
          className="list-group-item list-group-item-action"
        >
          <i className="bi bi-box-arrow-left m-2 text-primary"></i>Logout
        </Link>
      </div>
    </>
  );
};

export default SellerMenu;
