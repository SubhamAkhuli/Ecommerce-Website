import React from "react";
import { NavLink } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import logo from "../Layout/logo.jpg";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";

const Header = (props) => {
  const { username } = props;
  const [user, setUser] = useAuth();

  const handleLogout = () => {
    setUser({
      user: null,
      token: "",
    });
    localStorage.removeItem("user");
    setTimeout(() => {
      toast.success("Logged out successfully");
    }, 100);
  };

  return (
    <>
      <Toaster />
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <img
            style={{ width: "40px", height: "35px", borderRadius: "50%" }}
            src={logo}
            alt="logo"
          />
          <NavLink className="navbar-brand mx-2" to="/">
            Ecommerce App
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {user?.user ? (
              <>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item ms-3">
                    <NavLink className="nav-link" to={`/dashboard/${user.user.type}`}>
                      Home
                    </NavLink>
                  </li>
                  {user.user.type === "admin" && (
                    <>
                    <li className="nav-item ms-3">
                      <NavLink
                        className="nav-link"
                        to="/dashboard/admin/users-list"
                      >
                        Users
                      </NavLink>
                    </li>
                    <li className="nav-item ms-3">
                      <NavLink
                        className="nav-link"
                        to="/dashboard/admin/sellers-list"
                      >
                        Sellers
                      </NavLink>
                    </li>
                    </>
            )}
                  {user.user.type === "seller" && (
                    <li className="nav-item ms-3">
                      <NavLink className="nav-link"  to="/dashboard/seller/create-product"
                    >
                    Add Product
                      </NavLink>
                    </li>
                  )}
                </ul>
                {user.user.type === "user" && (
                  <form className="d-flex" role="search">
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                    />
                    <button
                      className="btn btn-outline-success"
                      type="submit"
                    >
                      Search
                    </button>
                  </form>
                )}
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item dropdown mx-3">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      to=""
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {username || user.user.name}
                    </NavLink>
                    <ul className="dropdown-menu dropdown-menu-dark">
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to={`/dashboard/${user.user.type}/profile`}
                        >
                          <i className="bi bi-person-circle m-1"></i> My Profile
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="/login"
                          onClick={handleLogout}
                        >
                          <i className="fa-solid fa-power-off m-1"></i> Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  {user.user.type === "seller" && (
                    <>
                      <li className="nav-item me-3">
                        <NavLink
                          className="nav-link"
                          to="/dashboard/seller/orders"
                        >
                          Orders
                        </NavLink>
                      </li>
                      <li className="nav-item me-3">
                        <NavLink
                          className="nav-link"
                          to="/dashboard/seller/products"
                        >
                          Products
                        </NavLink>
                      </li>
                    </>
                  )}
                  {user.user.type === "user" && (
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/cart">
                        Cart(0)
                      </NavLink>
                    </li>
                  )}
                  {user.user.type === "admin" && (
                    <>
                       <li className="nav-item me-3">
                        <NavLink
                          className="nav-link"
                          to="/dashboard/admin/all-product"
                        >
                          Products
                        </NavLink>
                      </li>
                      <li className="nav-item me-3">
                        <NavLink
                          className="nav-link"
                          to="/dashboard/admin/orders"
                        >
                          Orders
                        </NavLink>
                      </li>
                    </>
                  )}
                </ul>
              </>
            ) : (
              <>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/">
                      Home
                    </NavLink>
                  </li>
                  </ul>
                <form className="d-flex" role="search">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button
                    className="btn btn-outline-success"
                    type="submit"
                  >
                    Search
                  </button>
                </form>
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/userregister">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/sellerregister">
                      Become a Seller
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                      <NavLink className="nav-link" to="/cart">
                        Cart(0)
                      </NavLink>
                    </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
