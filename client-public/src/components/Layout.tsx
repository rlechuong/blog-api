import { Outlet, Link, useNavigate } from "react-router";
import { useAuth } from "../context/useAuth.js";
import styles from "./Layout.module.css";

const Layout = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <nav className={styles.nav}>
        <Link to="/">Home</Link>
        <span className={styles.spacer} />
        {loading ? null : user ? (
          <>
            <span>Welcome, {user.name}</span>
            <button onClick={handleLogout} className={styles.navButton}>
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Log In</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
