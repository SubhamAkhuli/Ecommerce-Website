import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";

const AdminMenu = () => {
  // eslint-disable-next-line
  const [user, setUser] = useAuth();


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
  }

  return (
    <>
      <div >
        <div className="list-group card">
          <div className="card-header">
            <h4 className="text-center">Control Panel</h4>
          </div>
          <Link
            to="/dashboard/admin"
            className="list-group-item list-group-item-action"
          ><i className="bi bi-person m-2 text-primary"></i>
            Profile
          </Link>
          <Link
            to="/dashboard/admin/all-product"
            className="list-group-item list-group-item-action"
          ><i className="bi bi-box-seam m-2 text-primary"></i>
            All Products
          </Link>
          <Link
            to="/dashboard/admin/users-list"
            className="list-group-item list-group-item-action"
          ><i className="bi bi-people m-2 text-primary"></i>
            Users List
          </Link>
          <Link
            to="/dashboard/admin/sellers-list"
            className="list-group-item list-group-item-action"
          ><i className="fa-solid fa-users m-2 text-primary"></i>
            Sellers List
          </Link>
          <Link
          to="/login"
          onClick={HandelLogout}
          className="list-group-item list-group-item-action"
        >
          <i className="bi bi-box-arrow-left m-2 text-primary"></i>Logout
        </Link>
        </div>
      </div>
    </>
  );
};

export default AdminMenu
