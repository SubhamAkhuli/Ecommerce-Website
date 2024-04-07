import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const UserMenu = () => {
  const navigate = useNavigate();
  const [user, setUser] = useAuth();
  const userId = user?.user?.id;

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
  const ref = useRef(null);

  const handelDelete = () => {
    // on the delete modal
    ref.current.click();
  };

  const handelYes = async (e) => {
    e.preventDefault();
    // console.log("delete");
    setUser({
      user: null,
      token: "",
    });
    const response = await axios.delete(
      `http://localhost:8080/api/v1/userauth/userdelete/${userId}`
    );
    if (response.data.success) {
      toast.success(response.data.message);
      localStorage.removeItem("user");
      setTimeout(() => {
        navigate("/");
      }, 100);
    }
  };

  return (
    <>
      {/* Delete conformation Modal */}
      <div>
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
      </div>

      <div className="list-group card">
        <div className="card-header text-center">
          <h4>User Menu</h4>
        </div>

        <Link
          to="/dashboard/user"
          className="list-group-item list-group-item-action "
        >
          <i className="fa-regular fa-user m-2 text-primary"></i>Profile
        </Link>
        <Link
          to="/dashboard/user/orders"
          className="list-group-item list-group-item-action"
        >
          <i className="bi bi-box2 m-2 text-primary"></i>Orders
        </Link>
        <Link
          to="/dashboard/user/wishlist"
          className="list-group-item list-group-item-action"
        >
          <i className="bi bi-bag-heart m-2 text-primary"></i> Wishlist
        </Link>
        <Link
          to="/dashboard/user/changepassword"
          className="list-group-item list-group-item-action"
        >
          <i className="bi bi-key m-2 text-primary"></i>Change Password
        </Link>
        <p
          onClick={handelDelete}
          className="list-group-item list-group-item-action text-danger"
          style={{ cursor: "pointer", marginBottom: "0px" }}
        >
          <i className="fa-solid fa-user-slash m-2 text-primary"></i>{" "}
          <b>Delete Account</b>
        </p>
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

export default UserMenu;
