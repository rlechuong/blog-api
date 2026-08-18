import { useState } from "react";
import { createComment } from "../api/comments.js";
import { ApiError } from "../api/client.js";
import type { Comment } from "../types/comment.js";
import formStyles from "./Form.module.css";
import styles from "./CommentForm.module.css";

interface CommentFormProps {
  postId: number;
  onCommentCreated: (comment: Comment) => void;
}

const CommentForm = ({ postId, onCommentCreated }: CommentFormProps) => {
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const newComment = await createComment(postId, content);
      onCommentCreated(newComment);
      setContent("");
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`${formStyles.form} ${styles.form}`}>
      <div>
        <label htmlFor="content">Comment</label>
        <textarea
          id="content"
          className={styles.textarea}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      {error && <p className={formStyles.error}>{error}</p>}
      <button type="submit" disabled={submitting}>
        {submitting ? "Creating Comment..." : "Create Comment"}
      </button>
    </form>
  );
};

export default CommentForm;
