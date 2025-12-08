"use client";

import { useState } from "react";

import Post from "./Post";
import NewPost from "./NewPost";

export default function Pazza() {

    const [newPost, setNewPost] = useState(true);

    return newPost ? <NewPost /> : <Post />;
}

