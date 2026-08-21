import styles from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <p className={styles.error} role="alert">
      {message}
    </p>
  );
};

export default ErrorMessage;
