"use client";

import { Button } from "react-bootstrap";
import { FiPlusCircle, FiMenu } from "react-icons/fi";
import { IoSearch, IoClose } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaChevronDown, FaSquare } from "react-icons/fa6";
import { LuPin } from "react-icons/lu";
import { VscTriangleLeft, VscTriangleRight } from "react-icons/vsc";

import { useSelector } from "react-redux";

export default function Posts({ isPostsExpanded, setIsPostsExpanded, setNewPost, setCurrentPost, currentPost, folderId, setFolderId }: { isPostsExpanded: boolean, setIsPostsExpanded: (value: boolean) => void, setNewPost: (value: boolean) => void, setCurrentPost: (post: any) => void, currentPost: any, folderId: string | null, setFolderId: (id: string | null) => void }) {

    const { posts } = useSelector((state: any) => state.pazzaReducer);
    const { folders } = useSelector((state: any) => state.pazzaReducer);

    // Categorize posts by date
    const categorizedPosts = categorizePosts(posts || []);

    return (
        <div className="d-flex flex-row pt-3">
            {isPostsExpanded && (
                <div className="ps-3" style={{ width: '400px' }}>
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
                            {folderId ?
                                <div className="d-inline-flex align-items-center bg-pazza-primary text-white px-2 py-1 rounded-3">
                                    {folders?.find((f: any) => f._id === folderId)?.name}
                                    <IoClose className="ms-2" role="button" onClick={() => setFolderId(null)} />
                                </div>
                                : "All Posts"}
                            <BsThreeDotsVertical className="m-3 float-end" />
                        </div>
                        <div>
                            {categorizedPosts.pinned.length > 0 && (
                                <div>
                                    <div className="bg-pazza-light border">
                                        <FaChevronDown className="m-2" />
                                        Pinned
                                        <LuPin className="m-2 float-end" />
                                    </div>
                                    {categorizedPosts.pinned.map((post: any) => (
                                        <PostItem key={post._id} post={post} currentPost={currentPost} setCurrentPost={setCurrentPost} />
                                    ))}
                                </div>
                            )}
                            
                            {categorizedPosts.today.length > 0 && (
                                <div>
                                    <div className="bg-pazza-light border">
                                        <FaChevronDown className="m-2" />
                                        Today
                                    </div>
                                    {categorizedPosts.today.map((post: any) => (
                                        <PostItem key={post._id} post={post} currentPost={currentPost} setCurrentPost={setCurrentPost} />
                                    ))}
                                </div>
                            )}
                            
                            {categorizedPosts.yesterday.length > 0 && (
                                <div>
                                    <div className="bg-pazza-light border">
                                        <FaChevronDown className="m-2" />
                                        Yesterday
                                    </div>
                                    {categorizedPosts.yesterday.map((post: any) => (
                                        <PostItem key={post._id} post={post} currentPost={currentPost} setCurrentPost={setCurrentPost} />
                                    ))}
                                </div>
                            )}
                            
                            {categorizedPosts.lastWeek.length > 0 && (
                                <div>
                                    <div className="bg-pazza-light border">
                                        <FaChevronDown className="m-2" />
                                        Last Week
                                    </div>
                                    {categorizedPosts.lastWeek.map((post: any) => (
                                        <PostItem key={post._id} post={post} currentPost={currentPost} setCurrentPost={setCurrentPost} />
                                    ))}
                                </div>
                            )}
                            
                            {categorizedPosts.weeks.map((week: any) => (
                                <div key={week.label}>
                                    <div className="bg-pazza-light border">
                                        <FaChevronDown className="m-2" />
                                        {week.label}
                                    </div>
                                    {week.posts.map((post: any) => (
                                        <PostItem key={post._id} post={post} currentPost={currentPost} setCurrentPost={setCurrentPost} />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            <div>
                {isPostsExpanded ?
                    <VscTriangleLeft size={30} role="button" onClick={() => setIsPostsExpanded(!isPostsExpanded)} className="text-pazza-primary" /> :
                    <VscTriangleRight size={30} role="button" onClick={() => setIsPostsExpanded(!isPostsExpanded)} className="text-pazza-primary" />
                }
            </div>
        </div>
    );
}

function PostItem({ post, currentPost, setCurrentPost }: { post: any, currentPost: any, setCurrentPost: (post: any) => void }) {
    return (
        <div className={`p-3 border-bottom ${currentPost?._id === post._id ? "bg-pazza-light" : ""}`} role="button" onClick={() => setCurrentPost(post)} style={currentPost?._id === post._id ? { backgroundColor: '#f0f0f0' } : {}}>
            <div className="d-flex align-items-center gap-2 mb-1">
                {(post.user.role === "FACULTY" || post.user.role === "TA") && <div className="bg-pazza-light p-1 rounded-2"><FaSquare color="#ffc008" className="me-2" />Instr</div>}
                <div className="fs-6 fw-bold">{post.summary}</div>
                <div className="fs-6 ms-auto">{formatDate(post.createdAt)}</div>
            </div>
            <div className="text-pazza-dark">{post.details}</div>
        </div>
    );
}

function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { year: '2-digit', month: '2-digit', day: '2-digit' });
}

function getWeekLabel(date: Date) {
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay()); // Start of week (Sunday)
    const end = new Date(start);
    end.setDate(start.getDate() + 6); // End of week (Saturday)
    
    return `${start.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`;
}

function categorizePosts(posts: any[]) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const lastWeekStart = new Date(today);
    lastWeekStart.setDate(lastWeekStart.getDate() - 7);
    
    const categorized = {
        pinned: [] as any[],
        today: [] as any[],
        yesterday: [] as any[],
        lastWeek: [] as any[],
        weeks: [] as any[]
    };
    
    const weekMap = new Map<string, any[]>();
    
    posts.forEach(post => {
        const postDate = new Date(post.createdAt);
        const postDateOnly = new Date(postDate.getFullYear(), postDate.getMonth(), postDate.getDate());
        
        if (post.pinned) {
            categorized.pinned.push(post);
        } else if (postDateOnly.getTime() === today.getTime()) {
            categorized.today.push(post);
        } else if (postDateOnly.getTime() === yesterday.getTime()) {
            categorized.yesterday.push(post);
        } else if (postDateOnly >= lastWeekStart && postDateOnly < yesterday) {
            categorized.lastWeek.push(post);
        } else {
            // Older than last week - group by week
            const weekLabel = getWeekLabel(postDate);
            if (!weekMap.has(weekLabel)) {
                weekMap.set(weekLabel, []);
            }
            weekMap.get(weekLabel)!.push(post);
        }
    });
    
    // Convert week map to sorted array
    const sortedWeeks = Array.from(weekMap.entries())
        .map(([label, posts]) => ({ label, posts }))
        .sort((a, b) => {
            // Sort by most recent week first
            const dateA = new Date(a.posts[0].createdAt);
            const dateB = new Date(b.posts[0].createdAt);
            return dateB.getTime() - dateA.getTime();
        });
    
    categorized.weeks = sortedWeeks;
    
    return categorized;
}