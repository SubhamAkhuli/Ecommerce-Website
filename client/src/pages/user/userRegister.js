import React, { useState } from 'react'
import Header from '../../components/Layout/Header'
import Footer from '../../components/Layout/Footer'
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';
const UserRegister = () => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('form submitted');
    console.log(credentials);
    toast.success('Registration Successful');
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <>
    <Header/>
    <div className="container" style={{minHeight:"70.7vh"}}>
    <h1 className='text-center my-3'>Registration From</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input type="text" className="form-control" id="name" name='name' placeholder="Enter your Name" onChange={onChange} aria-describedby="emailHelp" minLength={3} required />
          <div id="emailHelp" className="form-text">Please Enter valid name atleast 3 characters.</div>
        </div>

        <div className="mb-3">
          <input type="email" className="form-control" id="email" name='email'  placeholder="Enter your Email"  onChange={onChange} aria-describedby="emailHelp" required />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <input type="text" className="form-control" id="address" name='address'  placeholder="Enter your Address"  onChange={onChange} required />
        </div>
        <div className="mb-3">
          <input type="text"  placeholder="Enter your Phone Number"  className="form-control" id="phone_no" name='phone_no' onChange={onChange} minLength={4} required />
        </div>
        <div className="mb-3">
          <input type="password" onChange={onChange} className="form-control" id="password" name='password' minLength={4}  placeholder="Enter your Password" required />
          <div id="emailHelp" className="form-text">Password atleast 4 characters.</div>
        </div>
        <div className="mb-3">
          <input type="password" className="form-control" id="cpassword" name='cpassword' placeholder="Confrim Password"  onChange={onChange} minLength={4} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <p className="mt-3">Already have an account?
          <button className="btn btn-primary mx-2"><NavLink style={{
            textDecoration: "none"
            , color: "white"
          }} to="/login">Login</NavLink></button></p>
      </form>
    </div>
    <Footer/>
    </>
  )
}

export default UserRegister
