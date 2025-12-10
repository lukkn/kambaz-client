"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import Folders from "./Folders";
import Posts from "./Posts";
import Post from "./Post";
import NewPost from "./NewPost";

import { setFolders, setPosts } from "./reducer";
import { useSelector, useDispatch } from "react-redux";

import * as client from "./client";

export default function Pazza() {

    const dispatch = useDispatch();
    const { cid } = useParams();

    const [newPost, setNewPost] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);

    const fetchPosts = async () => {
        const fetchedPosts = await client.findPazzaPostsByCourse(cid as string);
        dispatch(setPosts(fetchedPosts));
    };

    const fetchFolders = async () => {
        const folders = await client.findPazzaFoldersByCourse(cid as string);
        dispatch(setFolders(folders));
    };

    useEffect(() => {
        fetchPosts();
        fetchFolders();
    }, []);
    

    return (
        <div className="d-flex flex-row">
            <Posts setNewPost={setNewPost} setCurrentPost={setCurrentPost} currentPost={currentPost} />
            <div className="flex-grow-1">
                <Folders />
                <div className="p-4">
                    {newPost ? <NewPost setNewPost={setNewPost} /> : <Post post={currentPost} />}
                </div>
            </div>
        </div>
    )
}

