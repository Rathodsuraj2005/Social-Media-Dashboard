import React, { useState } from "react";
import "./SocialMediaDashboard.css";

const SocialMediaDashboard = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([
    { id: 1, user: "Alice", content: "Smile", likes: 2, comments: ["Nice post!"] },
    { id: 2, user: "Bob", content: "Welcome to my profile", likes: 5, comments: ["I agree!", "100% true"] },
  ]);
  const [newPost, setNewPost] = useState("");

  const login = () => setUser("JohnDoe");
  const logout = () => setUser(null);

  const addPost = () => {
    if (newPost.trim() === "") return;
    const newPostObj = { id: posts.length + 1, user, content: newPost, likes: 0, comments: [] };
    setPosts([newPostObj, ...posts]);
    setNewPost("");
  };

  const likePost = (id) => {
    setPosts(posts.map(post => post.id === id ? { ...post, likes: post.likes + 1 } : post));
  };

  const addComment = (id, comment) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, comments: [...post.comments, comment] } : post
    ));
  };

  return (
    <div className="dashboard-container">
      <h2 className="title">Social Media Dashboard</h2>
      {user ? (
        <>
          <p>Welcome to The my world! <button className="logout-btn" onClick={logout}>Logout</button></p>
          <textarea
            className="post-input"
            placeholder="What's on your mind?"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          ></textarea>
          <button className="post-btn" onClick={addPost}>Post</button>
        </>
      ) : (
        <button className="login-btn" onClick={login}>Login</button>
      )}
      
      <div className="posts">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <h4>{post.user}</h4>
            <p>{post.content}</p>
            <button className="like-btn" onClick={() => likePost(post.id)}>❤️ {post.likes}</button>
            <div className="comments">
              {post.comments.map((comment, i) => <p key={i} className="comment">💬 {comment}</p>)}
            </div>
            <input
              className="comment-input"
              type="text"
              placeholder="Add a comment..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.value) {
                  addComment(post.id, e.target.value);
                  e.target.value = "";
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialMediaDashboard;
