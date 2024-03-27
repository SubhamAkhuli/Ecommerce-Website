import React from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'

function PageNotFound() {
  return (
    <div>
      <Header />
      <div className="container" style={{ minHeight: "70.6vh" }}>
        <h1 className="text-center" >404 Page Not Found</h1> 
        </div>
        <Footer/>
    </div>
  )
}

export default PageNotFound
