import React, { useState, useEffect } from 'react';
import { PostCard } from '../components';
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";
import './AllPosts.css';

function AllPosts() {
    const [posts, setPosts] = useState([])
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {}, [])
    appwriteService.getPosts([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    })

    return (
        <div className="posts-container">
            {posts.map((post) => (
                post && post.userId === userData.$id?
                <div key={post.$id}>
                    <PostCard {...post} />
                </div>
                :null
            ))}
        </div>
    );
}

export default AllPosts;
