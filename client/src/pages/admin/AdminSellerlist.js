import React, { useEffect, useState } from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminSellerlist = () => {
  const [sellers, setSellers] = useState([]);
  const navigate = useNavigate();

  // Get all sellers
  const getAllSellers = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/sellerauth/allsellers`
      );
      // Filter out sellers whose verified field is false
      const verifiedSellers = data.sellers.filter(seller => seller.verified);
      setSellers(verifiedSellers);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while fetching sellers.");
    }
  };

  // Group sellers by category
  const groupSellersByCategory = (sellers) => {
    return sellers.reduce((acc, seller) => {
      const category = seller.category || "Unknown";
      if (!acc[category]) {
        acc[category] = {
          count: 0,
          sellers: [],
        };
      }
      acc[category].count += 1;
      acc[category].sellers.push(seller);
      return acc;
    }, {});
  };

  useEffect(() => {
    getAllSellers();
  }, []);

  // Group sellers by category
  const groupedSellers = groupSellersByCategory(sellers);

  return (
    <>
      <Header />
      <div className="container m-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div
              className="card"
              style={{ borderRadius: "5px", boxShadow: "0 0 10px #ccc" }}
            >
              <div className="card-header">
                <h3 className="text-center">Sellers List</h3>
              </div>
              <div className="card-body">
                <h5 className="card-title mb-3">
                  Total {sellers.length===1 ? "Seller" :"Sellers"}: {sellers.length}
                </h5>
                {Object.keys(groupedSellers).map((category) => (
                  <div key={category} style={{ marginBottom: "20px" }}>
                    <h4
                      className="text-center"
                      style={{ textShadow: "2px 2px 2px #ccc" }}
                    >
                      Category: {category} ({groupedSellers[category].count}{" "}
                      {groupedSellers[category].count === 1
                        ? "seller"
                        : "sellers"}
                      )
                    </h4>
                    <div className="d-flex flex-wrap">
                      {groupedSellers[category].sellers.map((seller) => (
                        <div
                          className="card m-2"
                          key={seller._id}
                          style={{
                            width: "20rem",
                            cursor: "pointer",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            boxShadow: "0 10px 10px #ccc",
                          }}
                          onClick={() => {
                            navigate(
                              `/dashboard/admin/seller-specific-product/${seller._id}`
                            );
                          }}
                        >
                          <div className="card-body">
                            <h5 className="card-title">
                              <b>Shop Name:</b> {seller.shop_name}
                            </h5>
                            <p className="card-text">
                              <b>Category:</b> {seller.category}
                            </p>
                            <p className="card-text">
                              <b>Seller Name:</b> {seller.name}
                            </p>
                            <p className="card-text">
                              <b>Email id:</b> {seller.email}
                            </p>
                            <p className="card-text">
                              <b>Address:</b> {seller.address}
                            </p>
                            <p className="card-text">
                              <b>Phone No:</b> {seller.phone}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminSellerlist;
