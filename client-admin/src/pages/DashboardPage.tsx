import { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth.js";
import { getAdminPosts } from "../api/posts.js";
import LoadingMessage from "../components/LoadingMessage.js";
import ErrorMessage from "../components/ErrorMessage.js";
import EmptyMessage from "../components/EmptyMessage.js";
import PostRow from "../components/PostRow.js";
import { ApiError } from "../api/client.js";
import type { Post } from "../types/post.js";
import styles from "./DashboardPage.module.css";

const DashboardPage = () => {
  const { user } = useAuth();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handlePostUpdated = (updatedPost: Post) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post)),
    );
  };

  const handlePostDeleted = (id: number) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  useEffect(() => {
    const fetchAdminPosts = async () => {
      try {
        const data = await getAdminPosts();
        setPosts(data);
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

    fetchAdminPosts();
  }, []);

  if (loading) return <LoadingMessage message="Loading Posts..." />;
  if (error) return <ErrorMessage message={error} />;
  if (!posts.length) {
    return (
      <EmptyMessage
        message={
          user?.role === "ADMIN" ? "No posts available." : "You haven't written any posts yet."
        }
      />
    );
  }

  return (
    <div>
      <h1 className={styles.pageTitle}>Posts</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            {user?.role === "ADMIN" && <th>Author</th>}
            <th>Created</th>
            <th>Updated</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <PostRow
              key={post.id}
              post={post}
              showAuthor={user?.role === "ADMIN"}
              onPostUpdated={handlePostUpdated}
              onPostDeleted={handlePostDeleted}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardPage;
