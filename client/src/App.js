import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Policy from "./pages/Policy";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";

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
  ]);
  return (
    <>
      {/* to call the pages */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;