"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import Folders from "./Folders";
import Posts from "./Posts";
import Post from "./Post";
import NewPost from "./NewPost";

import { setFolders, setPosts } from "./reducer";
import { useDispatch } from "react-redux";

import * as client from "./client";
import { current } from "@reduxjs/toolkit";

export default function Pazza() {

    const dispatch = useDispatch();
    const { cid } = useParams();

    const [newPost, setNewPost] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);
    const [folderId, setFolderId] = useState<string | null>(null);
    const [isPostsExpanded, setIsPostsExpanded] = useState(true);

    const filterFolders = async () => {
        let posts;
        if (folderId) {
            posts = await client.findPazzaPostsByCourse(cid as string, folderId as string);
        } else {
            posts = await client.findPazzaPostsByCourse(cid as string);
        }
        dispatch(setPosts(posts));
    }

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

    useEffect(() => {
        filterFolders();
    }, [folderId]);


    useEffect(() => {
        if (currentPost) setNewPost(false);
    }, [currentPost]);

    useEffect(() => {
        setCurrentPost(null);
    }, [newPost]);

    return (
        <div className="d-flex flex-row">
            <Posts isPostsExpanded={isPostsExpanded} setIsPostsExpanded={setIsPostsExpanded} setNewPost={setNewPost} setCurrentPost={setCurrentPost} currentPost={currentPost} folderId={folderId} setFolderId={setFolderId} />
            <div className="flex-grow-1">
                <Folders folderId={folderId} setFolderId={setFolderId} />
                <div className="p-4">
                    {newPost ? <NewPost setNewPost={setNewPost} fetchPosts={fetchPosts} /> : <Post post={currentPost} />}
                </div>
            </div>
        </div>
    )
}

