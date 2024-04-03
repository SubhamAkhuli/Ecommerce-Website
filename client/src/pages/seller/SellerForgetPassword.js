import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Headers from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import toast from 'react-hot-toast';


const SellerForgetPassword = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: "",  
        answer: "",
        newPassword: "",
        cpassword: "",
        });
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
      };
    const handelSubmit = async (e) => {
        e.preventDefault();
        try {
          const { email, answer, newPassword, cpassword } = credentials;
          if (newPassword !== cpassword) {
            toast.error("Password do not match");
          } else {
            const response = await axios.post(
              `http://localhost:8080/api/v1/sellerauth/sellerforgotpassword`,
              {
                email,
                answer,
                newPassword,
              }
            );
            if (response.data.success) {
                toast.success(response.data.message);
              setTimeout(() => {
                navigate("/sellerlogin");
              }, 100);
            } else {
                toast.error(response.data.message);
            }
          }
        } catch (error) {
          console.log(error);
          toast.error("Password Change Failed");
        }
        }



  return (
    <>
    <Headers />
    <div className="container" style={{ minHeight: "69.8vh" }}>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card m-4">
              <div className="card-header">
                <h3 className="text-center">Password Change</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handelSubmit} >
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      onChange={onChange}
                      name="email"
                      required
                    />
                    <label htmlFor="floatingInput">Email address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Enter your Answer"
                      onChange={onChange}
                      name="answer"
                      required
                    />
                    <label htmlFor="floatingInput">What is Your Favorite sport?</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      onChange={onChange}
                      name="newPassword"
                      required
                    />
                    <label htmlFor="floatingPassword">New Password</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Confrim Password"
                      onChange={onChange}
                      name="cpassword"
                      required
                    />
                    <label htmlFor="floatingPassword">Confrim Password</label>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    <Footer />
      
    </>
  )
}

export default SellerForgetPassword
