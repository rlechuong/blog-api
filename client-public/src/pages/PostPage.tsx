import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { useAuth } from "../context/useAuth.js";
import { getPostById } from "../api/posts.js";
import CommentForm from "../components/CommentForm.js";
import { formatDate, formatDateTime } from "../lib/formatDate.js";
import { ApiError } from "../api/client.js";
import type { PostWithComments } from "../types/post.js";
import type { Comment } from "../types/comment.js";
import styles from "./PostPage.module.css";

const PostPage = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const postId = Number(id);
  const isValidId = !Number.isNaN(postId);

  const [post, setPost] = useState<PostWithComments | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleCommentCreated = (newComment: Comment) => {
    setPost((prevPost) =>
      prevPost ? { ...prevPost, comments: [...prevPost.comments, newComment] } : prevPost,
    );
  };

  useEffect(() => {
    if (!isValidId) {
      return;
    }

    const fetchPost = async () => {
      try {
        const data = await getPostById(postId);
        setPost(data);
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError("Something went wrong.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId, isValidId]);

  if (!isValidId) return <p>Invalid Post ID.</p>;
  if (loading) return <p>Loading Post...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!post) return <p>No post available.</p>;

  return (
    <div>
      <article className={styles.article}>
        <h1>{post.title}</h1>
        <p className={styles.meta}>
          By {post.author.name}
          {post.publishedAt && (
            <>
              {" · "}
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </>
          )}
          {post.updatedAt !== post.createdAt && (
            <>
              {" · "}
              Updated: <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
            </>
          )}
        </p>
        <p>{post.content}</p>
      </article>

      <section className={styles.section}>
        <h2>Leave A Comment</h2>
        {user ? (
          <CommentForm postId={post.id} onCommentCreated={handleCommentCreated} />
        ) : (
          <p>
            <Link to="/login">Log In</Link> to leave a comment.
          </p>
        )}
      </section>

      <section className={styles.section}>
        <h2>Comments</h2>
        <ul className={styles.commentList}>
          {post.comments.map((comment) => (
            <li key={comment.id} className={styles.commentItem}>
              <article>
                <p className={styles.commentMeta}>
                  {comment.user.name}
                  {" · "}
                  <time dateTime={comment.createdAt}>{formatDateTime(comment.createdAt)}</time>
                  {comment.createdAt !== comment.updatedAt && " (Edited)"}
                </p>
                <p>{comment.content}</p>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default PostPage;
