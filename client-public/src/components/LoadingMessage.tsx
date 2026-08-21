import styles from "./LoadingMessage.module.css";

interface LoadingMessageProps {
  message?: string;
}

const LoadingMessage = ({ message = "Loading..." }: LoadingMessageProps) => {
  return (
    <p className={styles.loading} role="status">
      {message}
    </p>
  );
};

export default LoadingMessage;
