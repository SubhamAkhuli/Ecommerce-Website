import React from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";

const Sellerverification = () => {
  const params = useParams();
  const [user, setUser] = useAuth();
  const navigate = useNavigate();
  const checkVerification = async () => {
      const seller = await axios.get(
        `http://localhost:8080/api/v1/sellerauth/sellercheck/${params.pid}`
      );
      // console.log(seller.data.seller.verified);
      console.log(seller.data.message);
      if (seller.data.message === "Seller Not Found") {
        toast.error(
          "Admin has rejected your request, please try again with valid details."
        );
        setTimeout(() => {
          navigate("/sellerregister");
        }, 100);
      } else {
        if (seller.data.seller.verified) {
          setUser({
            ...user,
            user: seller.data.seller,
            token: seller.data.token,
          });

          localStorage.setItem("user", JSON.stringify(seller.data));
          navigate("/dashboard/seller");
        } else {
          setTimeout(() => {
          checkVerification();
          },30000);
        }
      }
  };

  useEffect(() => {
    checkVerification();
    // eslint-disable-next-line
  }, []);

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
