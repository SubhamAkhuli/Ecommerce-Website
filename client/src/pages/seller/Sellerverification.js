import React from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";

const Sellerverification = () => {
  return (
    <>
      <Header />
      <div className="container" style={{ minHeight: "69.8vh" }}>
        <div className="pnf">
          <h2 className="pnf-heading">
            {" "}
            Please wait ,we are verifying your details...
          </h2>
          <div className="spinner-border m-3 text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="pnf-para ">
            You will be redirected to the dashboard once your details are
            verified.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Sellerverification;
