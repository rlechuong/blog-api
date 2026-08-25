import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { createPost, getAdminPostById, updatePost } from "../api/posts.js";
import { ApiError } from "../api/client.js";
import LoadingMessage from "../components/LoadingMessage.js";
import ErrorMessage from "../components/ErrorMessage.js";
import formStyles from "../styles/form.module.css";
import styles from "./PostFormPage.module.css";

const PostFormPage = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const postId = Number(id);
  const isValidId = !Number.isNaN(postId);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [loading, setLoading] = useState(isEditing);
  const [loadError, setLoadError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isEditing) return;

    const fetchPost = async () => {
      try {
        const post = await getAdminPostById(postId);
        setTitle(post.title);
        setContent(post.content);
      } catch (err) {
        if (err instanceof ApiError) {
          setLoadError(err.message);
        } else {
          setLoadError("Something went wrong.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId, isEditing]);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      if (isEditing) {
        await updatePost(postId, { title, content });
      } else {
        await createPost(title, content);
      }
      navigate("/");
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

  const buttonLabel = submitting
    ? isEditing
      ? "Saving..."
      : "Creating Post..."
    : isEditing
      ? "Save Changes"
      : "Create Post";

  if (isEditing && !isValidId) return <ErrorMessage message="Invalid Post ID." />;
  if (loading) return <LoadingMessage message="Loading Post..." />;
  if (loadError) return <ErrorMessage message={loadError} />;

  return (
    <div>
      <h1 className={styles.pageTitle}>{isEditing ? "Edit Post" : "New Post"}</h1>
      <form onSubmit={handleSubmit} className={`${formStyles.form} ${styles.form}`}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={styles.textarea}
            required
          />
        </div>
        {error && <p className={formStyles.error}>{error}</p>}
        <div className={styles.actions}>
          <button type="submit" disabled={submitting}>
            {buttonLabel}
          </button>
          <Link to="/">Cancel</Link>
        </div>
      </form>
    </div>
  );
};

export default PostFormPage;
