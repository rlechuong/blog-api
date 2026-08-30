import { useState } from "react";
import { formatDateTime } from "../lib/formatDate.js";
import { deleteComment, updateComment } from "../api/comments.js";
import { ApiError } from "../api/client.js";
import type { Comment } from "../types/comment.js";
import formStyles from "../styles/form.module.css";
import styles from "./CommentItem.module.css";

interface CommentItemProps {
  comment: Comment;
  canEdit: boolean;
  canDelete: boolean;
  onCommentUpdated: (comment: Comment) => void;
  onCommentDeleted: (id: number) => void;
}

const CommentItem = ({
  comment,
  canEdit,
  canDelete,
  onCommentUpdated,
  onCommentDeleted,
}: CommentItemProps) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(comment.content);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEdit = () => {
    setDraft(comment.content);
    setEditing(true);
  };

  const handleCancel = () => {
    setDraft(comment.content);
    setEditing(false);
  };

  const handleSave = async () => {
    setError(null);
    setSaving(true);

    try {
      const updatedComment = await updateComment(comment.id, draft);
      onCommentUpdated(updatedComment);
      setEditing(false);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setSaving(false);
    }
  };

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
        <p className={styles.meta}>
          {comment.user?.name ?? "Deleted User"}
          {" · "}
          <time dateTime={comment.createdAt}>{formatDateTime(comment.createdAt)}</time>
          {comment.createdAt !== comment.updatedAt && " (Edited)"}
        </p>
        {editing ? (
          <div>
            <textarea
              className={styles.textarea}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              aria-label="Edit Comment"
              required
            />
            <div className={styles.actions}>
              <button
                onClick={handleSave}
                disabled={saving || deleting}
                className={styles.actionButton}
              >
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                onClick={handleCancel}
                disabled={saving || deleting}
                className={styles.actionButton}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p>{comment.content}</p>
            <div className={styles.actions}>
              {canEdit && (
                <button
                  onClick={handleEdit}
                  disabled={saving || deleting}
                  className={styles.actionButton}
                >
                  Edit
                </button>
              )}
              {canDelete && (
                <button
                  onClick={handleDelete}
                  disabled={saving || deleting}
                  className={`${styles.actionButton} ${styles.deleteButton}`}
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              )}
            </div>
          </div>
        )}
        {error && <p className={formStyles.error}>{error}</p>}
      </article>
    </li>
  );
};

export default CommentItem;
