import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import pagenotfoundImg from "./pageNotFound.jpg";

function PageNotFound() {
  return (
    <div>
      <Header />
      <div className="container" style={{ minHeight: "69.8vh" }}>
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
