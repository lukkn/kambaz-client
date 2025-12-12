"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import Folders from "./Folders";
import Posts from "./Posts";
import Post from "./Post";
import NewPost from "./NewPost";

import { setFolders, setPosts } from "./reducer";
import { useDispatch, useSelector } from "react-redux";

import * as client from "./client";

export default function Pazza() {

    const dispatch = useDispatch();
    const { cid } = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const [newPost, setNewPost] = useState(false);
    const [currentPost, setCurrentPost] = useState<any>(null);
    const [folderId, setFolderId] = useState<string | null>(null);
    const [isPostsExpanded, setIsPostsExpanded] = useState(true);

    const filterFolders = async () => {
        let posts;
        if (folderId) {
            posts = await client.findCoursePazzaPostByFolder(cid as string, folderId as string, currentUser.role, currentUser._id);
        } else {
            posts = await client.findPazzaPostsByCourse(cid as string, currentUser.role, currentUser._id);
        }
        dispatch(setPosts(posts));
    }

    const fetchPosts = async () => {
        const fetchedPosts = await client.findPazzaPostsByCourse(cid as string, currentUser.role, currentUser._id);
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

    return (
        <div className="d-flex flex-row">
            <Posts isPostsExpanded={isPostsExpanded} setIsPostsExpanded={setIsPostsExpanded} setNewPost={setNewPost} setCurrentPost={setCurrentPost} currentPost={currentPost} folderId={folderId} setFolderId={setFolderId} />
            <div className="flex-grow-1">
                <Folders folderId={folderId} setFolderId={setFolderId} />
                <div className="p-4" style={{ height: 'calc(100vh - 210px)', overflowY: 'auto' }}>
                    {newPost ? <NewPost setNewPost={setNewPost} fetchPosts={fetchPosts} setCurrentPost={setCurrentPost} /> : <Post postId={currentPost?._id || null} setCurrentPost={setCurrentPost} fetchPosts={fetchPosts}/>}
                </div>
            </div>
        </div>
    )
}

