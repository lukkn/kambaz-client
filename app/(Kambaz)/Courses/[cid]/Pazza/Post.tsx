"use client";

import { FaArrowLeft, FaC, FaLink, FaRegBookmark, FaRegStar } from "react-icons/fa6";
import { CgNotes } from "react-icons/cg";
import { BiLike } from "react-icons/bi";

import FollowUps from "./FollowUps";

import { calculateTimeDifference } from "../../../../utils";


export default function Post({ post }: { post: any }) {

    return (
        post ? <PostDetails /> : <div className="text-pazza-dark">Select a post to view its details.</div>
    );

    function PostDetails() {

        return (
            <div className="">
                <div className="mb-4">
                    <FaArrowLeft className="me-2 text-pazza-primary" size={20} />
                    <CgNotes className="me-2" size={20} />
                    <span className="me-2 fw-bold">{post.type}</span>
                    <span className="text-pazza-dark">@{post._id}</span>
                </div>
                <h2>{post.summary}</h2>
                <p className="text-pazza-dark">Updated {calculateTimeDifference(post.updatedAt)} by {post.user.firstName} {post.user.lastName}</p>
                <div dangerouslySetInnerHTML={{ __html: post.details || '' }} />
                <div className="wd-tags d-flex flex-wrap gap-2 mb-4">
                    {post.folders?.map((folder: any, index: number) => (
                        <div key={folder._id} className="bg-pazza-accent text-pazza-primary py-1 px-2 rounded-2" style={{ width: "fit-content" }}>{folder.name}</div>
                    ))}
                </div>

                <div className="text-pazza-primary m-2 py-2">
                    <BiLike className="me-1" size={30} /> <span className="me-4">0</span>
                    <FaRegBookmark className="me-4" size={30} />
                    <FaRegStar className="me-4" size={30} />
                    <FaLink className="me-4" size={30} />
                    <span className="float-end">{post.views || 0} views</span>
                </div>

                <FollowUps postId={post._id} /> 
            </div>
        )
    }

}
