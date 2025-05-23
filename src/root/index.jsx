import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Map from "../pages/dashboard";

const root = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/map",
    element: <Map />,
  },
]);
export default root;
