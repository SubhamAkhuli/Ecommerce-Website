import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
function Homepage() {
  return (
    <div>
      <Header />
      <div className="container" style={{ minHeight: "68.6vh" }}>
        <h1 className="text-center mt-2">Welcome to the Homepage</h1>
      </div>
      <Footer />
    </div>
  );
}

export default Homepage;
