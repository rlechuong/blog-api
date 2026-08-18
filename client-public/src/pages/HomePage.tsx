import { useState, useEffect } from "react";
import { Link } from "react-router";
import { getPosts } from "../api/posts.js";
import { ApiError } from "../api/client.js";
import { formatDate } from "../lib/formatDate.js";
import { truncate } from "../lib/truncate.js";
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

  if (loading) return <p>Loading Posts...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!posts.length) return <p>No posts available.</p>;

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
                By {post.author.name}
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
