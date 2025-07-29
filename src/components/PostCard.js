import React, { useState } from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaComment, FaShare } from "react-icons/fa";
import "./PostCard.css"; 

function PostCard({$id, tittle, featuredImage,description}) {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  // Handle Like Button
  const toggleLike = () => {
    setLiked(!liked);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  // Handle Share Button
  const sharePost = () => {
    const postUrl = `${window.location.origin}/post/${$id}`;
    navigator.clipboard.writeText(postUrl);
    alert("Post link copied to clipboard!");
  };

  return (
    <div className="card">
      <Link to={`/post/${$id}`} className="card-link">
        <div className="card-content">
          <div className="image-container">
            <img
              src={appwriteService.getFilePreview(featuredImage)}
              alt={tittle}
              className="card-image"
            />
          </div>
          <h2 className="card-title">{tittle}</h2>
          <p className="card-description">{description? description:"click to add more"}</p>
        </div>
      </Link>

      {/* Like, Comment, Share Buttons */}
      <div className="card-actions">
        <button className="action-button" onClick={toggleLike}>
          {liked ? <FaHeart className="liked" /> : <FaRegHeart />} {likes}
        </button>
        <button className="action-button">
          <FaComment /> Comment
        </button>
        <button className="action-button" onClick={sharePost}>
          <FaShare /> Share
        </button>
      </div>
    </div>
  );
}

export default PostCard;
