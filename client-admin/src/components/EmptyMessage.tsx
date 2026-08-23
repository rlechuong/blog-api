import styles from "./EmptyMessage.module.css";

interface EmptyMessageProps {
  message: string;
}

const EmptyMessage = ({ message }: EmptyMessageProps) => {
  return <p className={styles.empty}>{message}</p>;
};

export default EmptyMessage;
