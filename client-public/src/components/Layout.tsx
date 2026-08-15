import { Outlet, Link, useNavigate } from "react-router";
import { useAuth } from "../context/useAuth.js";

const Layout = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        {loading ? null : user ? (
          <>
            <span>Welcome, {user.name}</span>
            <button onClick={handleLogout}>Log Out</button>
          </>
        ) : (
          <>
            <Link to="/login">Log In</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
