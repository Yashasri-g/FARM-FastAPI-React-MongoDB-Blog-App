import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8002/posts/";

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editPostId, setEditPostId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setAuthor("");
    setIsEditing(false);
    setEditPostId(null);
  };

  const handleCreatePost = async () => {
    try {
      setIsSaving(true);
      setErrorMessage("");
      const newPost = { title, content, author };
      await axios.post(API_URL, newPost);
      resetForm();
      await fetchPosts();
    } catch (error) {
      setErrorMessage("Unable to create the post. Check the API connection and try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      const response = await axios.get(API_URL);
      setPosts(response.data);
    } catch (error) {
      setErrorMessage("Unable to load posts right now.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      setErrorMessage("");
      await axios.delete(`${API_URL}${postId}`);
      await fetchPosts();
    } catch (error) {
      setErrorMessage("Unable to delete the post right now.");
    }
  };

  const handleEditPost = (post) => {
    setTitle(post.title);
    setContent(post.content);
    setAuthor(post.author);
    setEditPostId(post._id);
    setIsEditing(true);
  };

  const handleUpdatePost = async () => {
    try {
      setIsSaving(true);
      setErrorMessage("");
      const updatedPost = { title, content, author };
      await axios.put(`${API_URL}${editPostId}`, updatedPost);
      resetForm();
      await fetchPosts();
    } catch (error) {
      setErrorMessage("Unable to update the post right now.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="app-shell">
      <header className="page-header">
        <div>
          <h1>Blog Dashboard</h1>
          <p>Write, edit, and manage posts.</p>
        </div>
        <span className="post-count">{posts.length} posts</span>
      </header>

      <section className="content-grid">
        <article className="composer-card">
          <div className="section-heading">
            <div>
              <h2>{isEditing ? "Edit post" : "New post"}</h2>
            </div>
            {isEditing && (
              <button className="ghost-button" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>

          <div className="field-grid">
            <label className="field">
              <span>Title</span>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>

            <label className="field">
              <span>Author</span>
              <input
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </label>

            <label className="field field-full">
              <span>Content</span>
              <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </label>
          </div>

          {errorMessage && <div className="status-banner error">{errorMessage}</div>}

          <div className="action-row">
            <button
              className="primary-button"
              onClick={isEditing ? handleUpdatePost : handleCreatePost}
              disabled={isSaving || !title.trim() || !content.trim() || !author.trim()}
            >
              {isSaving ? "Saving..." : isEditing ? "Update post" : "Publish post"}
            </button>
            <button className="ghost-button" onClick={fetchPosts} disabled={isLoading}>
              Refresh list
            </button>
          </div>
        </article>

        <aside className="posts-card">
          <div className="section-heading">
            <h2>Posts</h2>
          </div>

          {isLoading ? (
            <div className="empty-state">Loading posts...</div>
          ) : posts.length === 0 ? (
            <div className="empty-state">No posts yet.</div>
          ) : (
            <div className="post-list">
              {posts.map((post) => (
                <article className="post-card" key={post._id}>
                  <div className="post-meta">
                    <span className="post-author">{post.author}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                  <div className="post-actions">
                    <button className="ghost-button" onClick={() => handleEditPost(post)}>
                      Edit
                    </button>
                    <button
                      className="danger-button"
                      onClick={() => handleDeletePost(post._id)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </aside>
      </section>
    </main>
  );
}

export default App;
