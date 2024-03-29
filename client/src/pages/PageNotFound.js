import React from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import { NavLink } from 'react-router-dom'

function PageNotFound() {
  return (
    <div>
      <Header />
      <div className="container" style={{ minHeight: "69.8vh" }}>
      {/* <div className='d-flex justify-content-center mt-5'
      >
        <h1 className='mt-5' style={{color:"red"}} >404 Page Not Found!</h1> 
        </div> */}

        <div className="pnf">
        <h1 className="pnf-title">404</h1>
        <h2 className="pnf-heading">Oops ! Page Not Found</h2>
        <NavLink to="/" className="btn btn-primary">
          Go Back
        </NavLink>
      </div>
        </div>
        <Footer/>
    </div>
  )
}

export default PageNotFound
