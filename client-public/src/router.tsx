import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout.js";
import HomePage from "./pages/HomePage.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ index: true, element: <HomePage /> }],
  },
]);

export default router;
