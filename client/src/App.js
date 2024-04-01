import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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

function App() {
  // new react router process create a router
  const router = createBrowserRouter([
    {
      // path is the url path
      path: "/",
      // element is the component to be rendered
      element: (
        <>
          <Homepage />
        </>
      ),
    },
    {
      path: "/about",
      element: (
        <>
          <About />
        </>
      ),
    },
    {
      path: "/policy",
      element: (
        <>
          <Policy />
        </>
      ),
    },
    {
      path: "/contact",
      element: (
        <>
          <Contact />
        </>
      ),
    },
    {
      path: "*",
      element: (
        <>
          <PageNotFound />
        </>
      ),
    },
    {
      path:"/userregister",
      element:(<>
        <UserRegister/>
        </>)
    },
    {
      path:"/sellerregister",
      element:(<>
        <SellerRegister/>
        </>)
    },
    {
      path:"/login",
      element:(<>
        <Login/>
        </>)
    },
    {
      path:"/userlogin",
      element:(<>
        <UserLogin/>
        </>)

    },
    {
      path:"/sellerlogin",
      element:(<>
        <SellerLogin/>
        </>)

    },
  ]);
  return (
    <>
      {/* to call the pages */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
