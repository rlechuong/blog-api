import { Link } from "react-router";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1>Page Not Found</h1>
      <p className={styles.message}>This page does not exist.</p>
      <Link to="/">Home</Link>
    </div>
  );
};

export default NotFoundPage;
