import React, { useState, useEffect } from 'react';
import appwriteService from "../appwrite/config";
import { PostCard } from '../components';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        appwriteService.getPosts()
            .then(response => {
                if (response && response.documents) {
                    setPosts(response.documents);
                }
            })
            .catch(error => console.error("Error fetching posts:", error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <p>Loading posts...</p>;
    }

    if (posts.length === 0) {
        return <p>No posts available.</p>;
    }

    return (
        <div className="posts-container">
        {posts.map((post) => {
            return <PostCard key={post.$id} {...post} />;
        })}
        </div>
    );
}

export default Home;
