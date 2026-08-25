import { useState } from "react";
import { Link } from "react-router";
import { deletePost, updatePost } from "../api/posts.js";
import { formatDateShort, formatDateTime } from "../lib/formatDate.js";
import ErrorMessage from "./ErrorMessage.js";
import { ApiError } from "../api/client.js";
import type { Post } from "../types/post.js";
import styles from "./PostRow.module.css";

interface PostRowProps {
  post: Post;
  showAuthor: boolean;
  onPostUpdated: (post: Post) => void;
  onPostDeleted: (id: number) => void;
}

const PostRow = ({ post, showAuthor, onPostUpdated, onPostDeleted }: PostRowProps) => {
  const [error, setError] = useState<string | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleTogglePublish = async () => {
    setError(null);
    setPublishing(true);

    try {
      const updatedPost = await updatePost(post.id, { isPublished: !post.isPublished });
      onPostUpdated(updatedPost);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setPublishing(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this post permanently?")) return;

    setError(null);
    setDeleting(true);

    try {
      await deletePost(post.id);
      onPostDeleted(post.id);
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
    <>
      <tr>
        <td className={styles.titleCell}>{post.title}</td>
        {showAuthor && <td className={styles.authorCell}>{post.author?.name ?? "Deleted User"}</td>}
        <td>
          <time dateTime={post.createdAt} title={formatDateTime(post.createdAt)}>
            {formatDateShort(post.createdAt)}
          </time>
        </td>
        <td>
          <time dateTime={post.updatedAt} title={formatDateTime(post.updatedAt)}>
            {formatDateShort(post.updatedAt)}
          </time>
        </td>
        <td>{post.isPublished ? "Published" : "Draft"}</td>
        <td>
          <div className={styles.actions}>
            <button
              onClick={handleTogglePublish}
              disabled={publishing || deleting}
              className={styles.actionButton}
            >
              {publishing ? "Saving..." : post.isPublished ? "Unpublish" : "Publish"}
            </button>
            <Link to={`/posts/${post.id}/edit`}>Edit</Link>
            <button
              onClick={handleDelete}
              disabled={deleting || publishing}
              className={`${styles.actionButton} ${styles.deleteButton}`}
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </td>
      </tr>
      {error && (
        <tr>
          <td colSpan={showAuthor ? 6 : 5}>
            <ErrorMessage message={error} />
          </td>
        </tr>
      )}
    </>
  );
};

export default PostRow;
