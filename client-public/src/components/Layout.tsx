import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div>
      <nav>
        <p>Navigation placeholder.</p>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
