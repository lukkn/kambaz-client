"use client";

import { Button } from "react-bootstrap";
import { FiPlusCircle, FiMenu } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaChevronDown, FaSquare } from "react-icons/fa6";
import { LuPin } from "react-icons/lu";

import { useSelector } from "react-redux";

export default function Posts({ setNewPost, setCurrentPost, currentPost }: { setNewPost: (value: boolean) => void, setCurrentPost: (post: any) => void, currentPost: any }) {

    const categories = ["PINNED", "TODAY", "YESTERDAY", "LAST WEEK", "EARLIER"];
    const { posts } = useSelector((state: any) => state.pazzaReducer);

    return (
        <div className="p-3" style={{ width: '400px' }}>
            <div className="d-flex flex-row gap-2 mb-3">
                <Button className="w-50 bg-pazza-primary text-white d-flex align-items-center justify-content-center border-0"
                    onClick={() => setNewPost(true)}>
                    <FiPlusCircle className="me-2" />
                    New Post
                </Button>
                <div className="d-flex align-items-center justify-content-center gap-2 border px-2 rounded-3">
                    <IoSearch />
                    <input type="text" placeholder="Search posts..." className="form-control border-0 shadow-none p-0" />
                </div>
            </div>
            <div className="border rounded-3 h-100">
                <div className="text-pazza-primary">
                    <FiMenu className="m-3" />
                    All Posts
                    <BsThreeDotsVertical className="m-3 float-end" />
                </div>
                <div>
                    <div className="bg-pazza-light border">
                        <FaChevronDown className="m-2" />
                        Pinned
                        <LuPin className="m-2 float-end" />
                    </div>
                    {posts?.map((post: any) => (
                        <div key={post._id} className={`p-3 border-bottom ${currentPost?._id === post._id ? "bg-pazza-light" : ""}`} role="button" onClick={() => setCurrentPost(post)} style={currentPost?._id === post._id ? { backgroundColor: '#f0f0f0' } : {}}>
                            <div className="d-flex align-items-center gap-2 mb-1">
                                <div className="bg-pazza-light p-1 rounded-2"><FaSquare color="#ffc008" className="me-2" />Instr</div>
                                <div className="fs-6 fw-bold">{post.summary}</div>
                                <div className="fs-6 ms-auto">{formatDate(post.createdAt)}</div>
                            </div>
                            <div className="text-pazza-dark">{post.details}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { year: '2-digit', month: '2-digit', day: '2-digit' });
}