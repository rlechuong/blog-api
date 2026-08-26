import CommentItem from "./CommentItem.js";
import type { Comment } from "../types/comment.js";
import EmptyMessage from "./EmptyMessage.js";
import styles from "./CommentList.module.css";

interface CommentListProps {
  comments: Comment[];
  onCommentDeleted: (id: number) => void;
}

const CommentList = ({ comments, onCommentDeleted }: CommentListProps) => {
  if (comments.length === 0) {
    return <EmptyMessage message="No comments yet." />;
  }

  return (
    <ul className={styles.list}>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} onCommentDeleted={onCommentDeleted} />
      ))}
    </ul>
  );
};

export default CommentList;
