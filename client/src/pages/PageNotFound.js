import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import pagenotfoundImg from "./pageNotFound.jpg";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <div className="container" style={{ minHeight: "69.8vh" }}>
      <button onClick={() => navigate(-1)} style={{boxShadow:"0 0 10px #ccc"}} className="btn btn-primary mt-3"><i className="bi bi-arrow-left"></i> Go Back</button>
        <div className="pnf">
          <img
            src={pagenotfoundImg}
            alt="Page Not Found"
            className="pnf-img"
            style={{ width: "500px", height: "auto" }}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PageNotFound;
