import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout.js";
import HomePage from "./pages/HomePage.js";
import PostPage from "./pages/PostPage.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "posts/:id", element: <PostPage /> },
    ],
  },
]);

export default router;
