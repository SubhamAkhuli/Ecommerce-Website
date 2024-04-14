import React from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import AdminMenu from "./AdminMenu";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [user] = useAuth();
  const userName = user?.user?.name || "N/A";
  const userEmail = user?.user?.email || "N/A";
  const userAddress = user?.user?.address || "N/A";
  const userPhone = user?.user?.phone || "N/A";
  return (
    <>
      <Header />
      <div className="container m-3" style={{ minHeight: "65.2vh" }}>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card" style={{borderRadius:"5px", boxShadow:"0 0 10px #ccc"}}>
              <div className="card-header text-center">
                <h3>Welcome {userName}</h3>
              </div>
              <div className="card-body">
                <form>
                  <div className="form-floating mb-3">
                    <input
                      disabled
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Enter your Name"
                      value={userName}
                      name="name"
                      required
                    />
                    <label htmlFor="floatingInput">Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      disabled
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Enter your Shop Type"
                      value={userEmail}
                      name="email"
                      required
                    />
                    <label htmlFor="floatingInput">Email</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      disabled
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Enter your Phone"
                      value={userPhone}
                      name="phone"
                      required
                    />
                    <label htmlFor="floatingInput">Phone</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      disabled
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Enter your Address"
                      value={userAddress}
                      name="address"
                      required
                    />
                    <label htmlFor="floatingInput">Address</label>
                  </div>
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

export default AdminDashboard;
