import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout.js";
import HomePage from "./pages/HomePage.js";
import PostPage from "./pages/PostPage.js";
import LoginPage from "./pages/LoginPage.js";
import RegisterPage from "./pages/RegisterPage.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "posts/:id", element: <PostPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
]);

export default router;
