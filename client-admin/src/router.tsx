import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout.js";
import DashboardPage from "./pages/DashboardPage.js";
import LoginPage from "./pages/LoginPage.js";
import NotFoundPage from "./pages/NotFoundPage.js";
import RequireRole from "./components/RequireRole.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <RequireRole allowedRoles={["AUTHOR", "ADMIN"]}>
            <DashboardPage />
          </RequireRole>
        ),
      },
      { path: "login", element: <LoginPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default router;
