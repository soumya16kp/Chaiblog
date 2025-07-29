import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import "./Post.css"; 

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            appwriteService.deletePost(post.$id).then((status) => {
                if (status) {
                    appwriteService.deleteFile(post.featuredImage);
                    navigate("/");
                }
            });
        }
    };

    return post ? (
        <article className="post-wrapper">
            <header className="post-header">
                <h1 className="post-title">{post.tittle}</h1>
                <p className="post-meta">
                    By <span className="author-name">{post.writer || "Unknown Author"}</span>
                </p>
            </header>

            <div className="post-image-container">
                <img
                    src={appwriteService.getFilePreview(post.featuredImage)}
                    alt={post.tittle}
                    className="post-image"
                />
            </div>

            <section className="post-content">
                {post.content ? parse(post.content) : <p>No content available.</p>}
            </section>

            {isAuthor && (
                <div className="post-actions">
                    <Link to={`/edit-post/${post.$id}`}>
                        <button className="button button-edit">Edit</button>
                    </Link>
                    <button className="button button-delete" onClick={deletePost}>
                        Delete
                    </button>
                </div>
            )}
        </article>
    ) : null;
}
