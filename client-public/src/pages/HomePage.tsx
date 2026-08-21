import { useState, useEffect } from "react";
import { Link } from "react-router";
import { getPosts } from "../api/posts.js";
import { ApiError } from "../api/client.js";
import { formatDate } from "../lib/formatDate.js";
import { truncate } from "../lib/truncate.js";
import LoadingMessage from "../components/LoadingMessage.js";
import ErrorMessage from "../components/ErrorMessage.js";
import EmptyMessage from "../components/EmptyMessage.js";
import type { Post } from "../types/post.js";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
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

    fetchPosts();
  }, []);

  if (loading) return <LoadingMessage message="Loading Posts..." />;
  if (error) return <ErrorMessage message={error} />;
  if (!posts.length) return <EmptyMessage message="No posts available." />;

  return (
    <div>
      <h1 className={styles.pageTitle}>Blog - Client</h1>
      <ul className={styles.postList}>
        {posts.map((post) => (
          <li key={post.id} className={styles.postItem}>
            <article>
              <h2>
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
              </h2>
              <p className={styles.meta}>
                By {post.author?.name ?? "Deleted User"}
                {post.publishedAt && (
                  <>
                    {" · "}
                    <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                  </>
                )}
              </p>
              <p>{truncate(post.content)}</p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
