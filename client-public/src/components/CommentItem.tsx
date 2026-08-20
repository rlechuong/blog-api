import { formatDateTime } from "../lib/formatDate.js";
import type { Comment } from "../types/comment.js";
import styles from "./CommentItem.module.css";

interface CommentItemProps {
  comment: Comment;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  return (
    <li className={styles.item}>
      <article>
        <p className={styles.meta}>
          {comment.user?.name ?? "Deleted User"}
          {" · "}
          <time dateTime={comment.createdAt}>{formatDateTime(comment.createdAt)}</time>
          {comment.createdAt !== comment.updatedAt && " (Edited)"}
        </p>
        <p>{comment.content}</p>
      </article>
    </li>
  );
};

export default CommentItem;
