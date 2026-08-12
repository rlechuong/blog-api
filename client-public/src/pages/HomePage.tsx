import { useState, useEffect } from "react";
import { getPosts } from "../api/posts.js";
import type { Post } from "../types/post.js";
import { Link } from "react-router";

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
        if (err instanceof Error) {
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
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <h3>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </h3>
          <p>{post.content}</p>
          <p>Author: {post.author.name}</p>
          <p>Published: {post.publishedAt}</p>
          <p>Last Updated: {post.updatedAt}</p>
        </li>
      ))}
    </ul>
  );
};

export default HomePage;
