import React from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import SellerMenu from "../../pages/seller/SellerMenu";
const SellerProducts = () => {
    return (
        <>
        <Header />
        <div className="container m-3" style={{ minHeight: "56vh" }}>
            <div className="row">
            <div className="col-md-3">
                <SellerMenu />
            </div>
            <div className="col-md-9">
                <div className="card">
                <div className="card-header text-center">
                <h3>Your Products</h3>
                </div>
                <div className="card-body">
                </div>
                </div>
            </div>
            </div>
        </div>
        <Footer />
        </>
    );
}

export default SellerProducts;