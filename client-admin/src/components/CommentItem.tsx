import { useState } from "react";
import { deleteComment } from "../api/comments.js";
import { formatDateTime } from "../lib/formatDate.js";
import { ApiError } from "../api/client.js";
import ErrorMessage from "./ErrorMessage.js";
import type { Comment } from "../types/comment.js";
import styles from "./CommentItem.module.css";

interface CommentItemProps {
  comment: Comment;
  onCommentDeleted: (id: number) => void;
}

const CommentItem = ({ comment, onCommentDeleted }: CommentItemProps) => {
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Delete this comment permanently?")) return;

    setError(null);
    setDeleting(true);

    try {
      await deleteComment(comment.id);
      onCommentDeleted(comment.id);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setDeleting(false);
    }
  };

  return (
    <li className={styles.item}>
      <article>
        <div className={styles.meta}>
          <span>
            {comment.user?.name ?? "Deleted User"}
            {" · "}
            <time dateTime={comment.createdAt}>{formatDateTime(comment.createdAt)}</time>
            {comment.createdAt !== comment.updatedAt && " (Edited)"}
          </span>
          <button onClick={handleDelete} disabled={deleting} className={styles.deleteButton}>
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
        <p>{comment.content}</p>
        {error && <ErrorMessage message={error} />}
      </article>
    </li>
  );
};

export default CommentItem;
