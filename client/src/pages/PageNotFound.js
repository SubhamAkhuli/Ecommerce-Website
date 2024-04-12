import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <div className="container" style={{ minHeight: "69.8vh" }}>
        <div className="pnf">
          <h1 className="pnf-title">404</h1>
          <h2 className="pnf-heading">Oops ! Page Not Found</h2>
          <p className="pnf-para">
            The page you are looking for might have been removed had its name
            changed or is temporarily unavailable.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate(-1);
            }}
          >
            <i
              class="bi bi-backspace me-2"
              style={{ cursor: "pointer", marginBottom: "2px" }}
            ></i>
            Back
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PageNotFound;
