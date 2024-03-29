import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

function Policy() {
  return (
    <div>
      <Header />
      <div className="container" style={{ minHeight: "67.5vh" }}>
        <h1 className="text-center my-3">Privacy Policy</h1>
        <h2 >Shipping Policy</h2>
        <p>
          We aim to process and ship orders within 1-2 business days of
          receiving them. Delivery times may vary depending on your location and
          shipping method selected at checkout.
        </p>

        <h2>Returns Policy</h2>
        <p>
          We accept returns within 30 days of purchase. Items must be unused and
          in the same condition as received. Customers are responsible for
          return shipping fees unless the return is due to a defect or error on
          our part.
        </p>

        <h2>Privacy Policy</h2>
        <p>
          We respect your privacy and are committed to protecting your personal
          information. Please review our Privacy Policy
          for details on how we collect, use, and safeguard your data.
        </p>
        <h2>Terms and Conditions</h2>
        <p>
          By using our website and/or placing an order, you agree to abide by
          our Terms and Conditions. Please read them
          carefully before making a purchase.
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default Policy;
