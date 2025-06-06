import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import root from "./root";

createRoot(document.getElementById("root")).render(
  <RouterProvider router={root} />
);
