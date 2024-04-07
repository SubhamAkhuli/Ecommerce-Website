import React from 'react'
import Headers from '../../components/Layout/Header'
import Footer from '../../components/Layout/Footer'
import UserMenu from './UserMenu'

const UserOrders = () => {
  return (
    <>
    <Headers />
    <div className="container m-5" style={{ minHeight: "56vh" }}>
      <div className="row">
        <div className="col-md-3">
          <UserMenu />
        </div>
        <div className="col-md-9">
          <div className="card">
            <div className="card-header text-center"> <h3>Your Orders</h3></div>
            <div className="card-body">
              <p>Orders will be displayed here</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    <Footer />
      
    </>
  )
}

export default UserOrders
