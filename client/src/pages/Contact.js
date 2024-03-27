import React from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

function Contact() {
  return (
    <div>
      <Header />
        <div className="text-center" style={{ minHeight: "67.5vh" }}>
          <h1 className="my-3">CONTACT US</h1>
        <p className="my-2">
            <stonge>Any query and info about prodduct feel free to call anytime we 24X7
            vaialible</stonge>
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
        <Footer />
    </div>
  )
}

export default Contact
