import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { useAuth } from "../context/useAuth.js";
import { getPostById } from "../api/posts.js";
import CommentForm from "../components/CommentForm.js";
import type { PostWithComments } from "../types/post.js";
import type { Comment } from "../types/comment.js";

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
        if (err instanceof Error) {
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
      <div>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <p>Published: {post.publishedAt}</p>
        <p>Last Updated: {post.updatedAt}</p>
      </div>

      {user ? (
        <div>
          <CommentForm postId={post.id} onCommentCreated={handleCommentCreated} />
        </div>
      ) : (
        <p>
          <Link to="/login">Log In</Link> to leave a comment.
        </p>
      )}

      <div>
        <h2>Comments</h2>
        <ul>
          {post.comments.map((comment) => (
            <li key={comment.id}>
              <p>{comment.content}</p>
              <p>User:{comment.user.name}</p>
              <p>{comment.createdAt}</p>
              {comment.createdAt !== comment.updatedAt && <p>Edited: {comment.updatedAt}</p>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostPage;
