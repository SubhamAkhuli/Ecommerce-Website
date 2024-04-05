import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Policy from "./pages/Policy";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import UserRegister from "./pages/user/userRegister";
import SellerRegister from "./pages/seller/sellerRegister";
import Login from "./pages/Auth/Login.js";
import UserDashboard from "./pages/user/UserDashboard";
import UserPrivateRoute from "./components/Routes/user/UserPrivate.js";
import SellerDashboard from "./pages/seller/SellerDashboard.js";
import SellerPrivateRoute from "./components/Routes/seller/SellerPrivate.js";
import AdminDashboard from "./pages/admin/AdminDashboard.js";
import AdminPrivateRoute from "./components/Routes/admin/AdminPrivate.js";
import ForgotPassword from "./pages/Auth/ForgotPassword.js";
import { AuthProvider } from "./context/auth";
function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Top-level routes */}
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<About />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/userregister" element={<UserRegister />} />
            <Route path="/sellerregister" element={<SellerRegister />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            {/* Nested routes */}
            <Route path="/dashboard" element={<UserPrivateRoute />}>
              <Route path="user" element={<UserDashboard />} />
            </Route>
            <Route path="/dashboard" element={<SellerPrivateRoute />}>
              <Route path="seller" element={<SellerDashboard />} />
            </Route>
            <Route path="/dashboard" element={<AdminPrivateRoute />} >
              <Route path="admin" element={<AdminDashboard/>} />
            </Route>



            {/* 404 Page Not Found */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
