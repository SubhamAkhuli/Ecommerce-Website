import React from 'react'
import Header from '../../components/Layout/Header'
import Footer from '../../components/Layout/Footer'
import SellerMenu from './SellerMenu'
import { useAuth } from '../../context/auth'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const SellerHome = () => {
  const [user] = useAuth();
  const userId = user?.user?.id || "N/A";
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/api/v1/product/get-product/${userId}`
        );
        // Filter products based on quantity
        const filteredProducts = data.products.filter(product => product.quantity === 0);
        setProducts(filteredProducts);
      } catch (error) {
        console.error(error); // Log the error for debugging purposes
        toast.error("Something went wrong while fetching products.");
      }
    };

    fetchProducts();
  }, [userId]);
  return (
    <>
      <Header />
        <div className="container m-3" style={{minHeight:"65.2vh"}} >
        <div className="row">
          <div className="col-md-3">
            <SellerMenu />
          </div>
          <div className="col-md-9">
            <div className="card" style={{borderRadius:"5px", boxShadow:"0 0 10px #ccc"}}>
              <div className="card-header text-center">
                {" "}
                <h3>Welcome {user.user.name}</h3>
              </div>
              <div className="card-body">
                {products.length === 0 ? (
                  <p className="card-text text-center">
                    No product is out of stock.
                  </p>
                ) : (
                  <>
                    <h5 className="card-title">
                    You have {products.length}
                      {products.length > 1 ? " Products" : " Product"} which {products.length > 1 ? "are" : "is"} Out of Stock.
                    </h5>
                  </>
                )}
                <div className="d-flex flex-wrap">
                  {products.map((product) => (
                    <div
                      className="card m-2"
                      key={product._id}
                      style={{ width: "18rem",borderRadius:"5px", boxShadow:"0 0 10px #ccc" }}
                    >
                      <img
                        src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                        className="card-img-top"
                        style={{
                          height: "100px",
                          objectFit: "contain",
                          marginTop: "2px",
                        }}
                        alt={product.name}
                      />
                        <div className="card-body">
                          <h5 className="card-title">{product.name}</h5>
                          {product.quantity===0 ? (<p className="card-text text-danger"><b>Quantity: Out of Stock</b></p>) : (<p className="card-text"><b>Quantity: </b>{product.quantity}</p>)}
                          <p className="card-text" style={{marginBottom:"1px"}}>
                            <a href={`/dashboard/seller/update-product/${product._id}`} className='btn btn-primary'>Click here</a> to add new stock.
                          </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        </div>
        <Footer />
    </>
  )
}

export default SellerHome
