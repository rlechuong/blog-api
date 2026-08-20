import CommentItem from "./CommentItem.js";
import type { Comment } from "../types/comment.js";
import styles from "./CommentList.module.css";

interface CommentListProps {
  comments: Comment[];
}

const CommentList = ({ comments }: CommentListProps) => {
  if (comments.length === 0) {
    return <p className={styles.empty}>No comments yet.</p>;
  }

  return (
    <ul className={styles.list}>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </ul>
  );
};

export default CommentList;
