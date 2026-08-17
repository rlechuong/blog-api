import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div>
      <h1>Page Not Found.</h1>
      <p>This page does not exist.</p>
      <Link to="/">Home</Link>
    </div>
  );
};

export default NotFoundPage;
