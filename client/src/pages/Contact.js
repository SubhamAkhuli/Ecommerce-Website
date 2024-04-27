import React from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import contactus from './contactus.jpeg'
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

function Contact() {
  return (
    <div>
      <Header />
        <div className="text-center" style={{ minHeight: "67.5vh" }}>
          <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src={contactus}
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className=" text-center">Contact Us</h1>
          <p className="text-justify mt-2">
            any query and info about prodduct feel free to call anytime we 24X7
            vaialible
          </p>
          <p className="mt-3">
            <BiMailSend /> : www.help@ecommerceapp.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 012-3456789
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-0000 (toll free)
          </p>
        </div>
      </div>
        </div>
        <Footer />
    </div>
  )
}

export default Contact
