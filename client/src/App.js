import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Policy from "./pages/Policy";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import UserRegister from "./pages/user/userRegister";
import SellerRegister from "./pages/seller/sellerRegister";
import Login from "./pages/Login";
import UserLogin from "./pages/user/Userlogin";
import SellerLogin from "./pages/seller/Sellerlogin.js";
import UserDashboard from "./pages/user/UserDashboard";
import UserPrivateRoute from "./components/Routes/user/UserPrivate.js";
import SellerDashboard from "./pages/seller/SellerDashboard.js";
import SellerPrivateRoute from "./components/Routes/seller/SellerPrivate.js";
import UserForgot from "./pages/user/UserForgot.js";
import SellerForgetPassword from "./pages/seller/SellerForgetPassword.js";
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
            <Route path="/userlogin" element={<UserLogin />} />
            <Route path="/sellerlogin" element={<SellerLogin />} />
            <Route path="/userforgotpassword" element={<UserForgot />} />
            <Route path="/sellerforgotpassword" element={<SellerForgetPassword />} />
            {/* Nested routes */}
            <Route path="/userdashboard" element={<UserPrivateRoute />}>
              <Route path="" element={<UserDashboard />} />
            </Route>
            <Route path="/sellerdashboard" element={<SellerPrivateRoute />}>
              <Route path="" element={<SellerDashboard />} />
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
