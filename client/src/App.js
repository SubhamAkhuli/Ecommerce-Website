import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Policy from "./pages/Policy";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Auth/Login.js";
import Product from "./pages/Product.js";
import CartPage from "./pages/CartPage.js";

// user links
import UserRegister from "./pages/user/userRegister";
import UserDashboard from "./pages/user/UserDashboard";
import UserPrivateRoute from "./components/Routes/user/UserPrivate.js";
import UserOrders from "./pages/user/UserOrders.js";
import UserOrderdetails from "./pages/user/Orderdetails.js";
import UserWishlist from "./pages/user/UserWishlist.js";
import UserChangePassword from "./pages/user/UserChangePassword.js";

// seller links
import SellerHome from "./pages/seller/SellerHome";
import SellerRegister from "./pages/seller/sellerRegister";
import Sellerverification from "./pages/seller/Sellerverification.js";
import SellerDashboard from "./pages/seller/SellerDashboard.js";
import SellerPrivateRoute from "./components/Routes/seller/SellerPrivate.js";
import SellerCreateProduct from "./pages/seller/SellerCreateProduct.js";
import SellerProducts from "./pages/seller/SellerProducts.js";
import SellerUpdateProduct from "./pages/seller/SellerUpdateProduct.js";
import SellerOrders from "./pages/seller/SellerOrders.js";
import SellerOrderUpdate from "./pages/seller/SellerOrderUpdate.js";
import SellerChangePassword from "./pages/seller/SellerChangePassword.js";

// admin links
import AdminHome from "./pages/admin/AdminHome.js";
import AdminDashboard from "./pages/admin/AdminDashboard.js";
import AdminPrivateRoute from "./components/Routes/admin/AdminPrivate.js";
import AdminAllProducts from "./pages/admin/AdminAllProducts.js";
import AdminUserLists from "./pages/admin/AdminUserLists.js";
import AdminSellerLists from "./pages/admin/AdminSellerlist.js";
import SellerSpceficProduct from "./pages/admin/SellerSpceficProduct.js";

// forgot password
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
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/product-details/:pid" element={<Product />} />
            <Route path="/cart" element={<CartPage />} />
            {/* Nested routes */}

            {/* User routes */}
            <Route path="/userregister" element={<UserRegister />} />
            <Route path="/dashboard" element={<UserPrivateRoute />}>
              <Route path="user" element={<Homepage />} />
              <Route path="user/profile" element={<UserDashboard />} />
              <Route path="user/orders" element={<UserOrders />} />
              <Route path="user/orderdetails/:oid" element={<UserOrderdetails />} />
              <Route path="user/wishlist" element={<UserWishlist />} />
              <Route path="user/changepassword" element={<UserChangePassword />} />

            </Route>

            {/* Seller routes */}
            <Route path="/sellerverification/:pid" element={<Sellerverification />}/>
            <Route path="/sellerregister" element={<SellerRegister />} />
            <Route path="/dashboard" element={<SellerPrivateRoute />}>
              <Route path="seller" element={<SellerHome />} />
              <Route path="seller/profile" element={<SellerDashboard />} />
              <Route path="seller/create-product" element={<SellerCreateProduct />}/>
              <Route path="seller/products" element={<SellerProducts />} />
              <Route path="seller/update-product/:pid" element={<SellerUpdateProduct />} />
              <Route path="seller/orders" element={<SellerOrders />} />
              <Route path="seller/order-update/:oid" element={<SellerOrderUpdate />} />
              <Route  path="seller/changepassword" element={<SellerChangePassword />}/>
            </Route>

            {/* Admin routes */}
            <Route path="/dashboard" element={<AdminPrivateRoute />}>
              <Route path="admin" element={<AdminHome />} />
              <Route path="admin/profile" element={<AdminDashboard />} />
              <Route path="admin/all-product" element={<AdminAllProducts />} />
              <Route path="admin/users-list" element={<AdminUserLists />} />
              <Route path="admin/sellers-list" element={<AdminSellerLists />} />
              <Route path="admin/seller-specific-product/:pid" element={<SellerSpceficProduct />} />
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
