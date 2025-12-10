"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import Folders from "./Folders";
import Posts from "./Posts";
import Post from "./Post";
import NewPost from "./NewPost";

import * as client from "./client";

export default function Pazza() {

    const { cid } = useParams();

    const [newPost, setNewPost] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);
    const [posts, setPosts] = useState<any[]>([]);

    const fetchPosts = async () => {
        const fetchedPosts = await client.findPazzaPostsByCourse(cid as string);
        setPosts(fetchedPosts);
    }

    useEffect(() => {
        fetchPosts();
    }, []);
    

    return (
        <div className="d-flex flex-row">
            <Posts setNewPost={setNewPost} setCurrentPost={setCurrentPost} currentPost={currentPost} posts={posts} />
            <div className="flex-grow-1">
                <Folders />
                <div className="p-4">
                    {newPost ? <NewPost setNewPost={setNewPost} /> : <Post post={currentPost} />}
                </div>
            </div>
        </div>
    )
}

