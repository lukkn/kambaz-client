"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";

import { FaArrowLeft, FaLink, FaRegBookmark, FaRegStar } from "react-icons/fa6";
import { LuCircleCheckBig, LuApple, LuUsersRound, LuGraduationCap } from "react-icons/lu";
import { VscTriangleDown } from "react-icons/vsc";
import { MdErrorOutline } from "react-icons/md";
import { TbUserEdit } from "react-icons/tb";
import { CgNotes } from "react-icons/cg";
import { BiLike } from "react-icons/bi";
import { Button, Dropdown, DropdownToggle, DropdownItem, DropdownMenu } from "react-bootstrap";

import FollowUps from "./FollowUps";
import RichTextEditor from "./RichTextEditor";

import { calculateTimeDifference } from "../../../../utils";

import * as client from "./client";
import * as enrollmentClient from "../client";
import { current } from "@reduxjs/toolkit";

export default function Post({ postId, setCurrentPost, fetchPosts }: { postId: string | null, setCurrentPost: (post: any) => void, fetchPosts: () => void }) {
    const [post, setPost] = useState<any>(null);

    const fetchPost = async () => {
        if (!postId) return null;
        const post = await client.findPazzaPostById(postId);
        setPost(post);
        await client.updatePazzaPost({
            ...post,
            views: (post.views || 0) + 1,
        });
    }

    useEffect(() => {
        if (postId) {
            fetchPost()
        } else {
            setPost(null);
        }
    }, [postId]);

    return (
        post ? <PostDetails /> : <ClassSummary />
    );

    function ClassSummary() {
        const { cid } = useParams();
        const { currentUser } = useSelector((state: any) => state.accountReducer);
        const [stats, setStats] = useState<any>(null);
        const [studentsEnrolled, setStudentsEnrolled] = useState<number>(0);

        const getPazzaStats = async () => {
            const stats = await client.getPazzaStats(cid as string, currentUser._id);
            setStats(stats);
        }

        const fetchStudentsEnrolled = async () => {
            const enrollments = await enrollmentClient.findUsersForCourse(cid as string);
            setStudentsEnrolled(enrollments.length);
        }

        useEffect(() => {
            getPazzaStats();
            fetchStudentsEnrolled();
        }, []);

        return (
            <div>
                <h4 className="fw-bold">Class at a Glance</h4>
                <div className="row row-cols-1 row-cols-lg-2 g-3 mb-4">
                    <div className="col">
                        {stats?.unreadPosts > 0 ?
                            <div className="bg-pazza-warning text-pazza-warning-text rounded-3 p-3 bg-pazza-light d-flex flex-row align-items-center justify-content-center gap-3">
                                <MdErrorOutline size={30} />
                                <div className="d-flex flex-column justify-content-center align-items-center">
                                    <div className="fw-bold">Needs Attention</div>
                                    <div style={{ fontSize: "0.8rem" }}>{stats?.unreadPosts} unread posts</div>
                                </div>
                            </div> :
                            <div className="bg-pazza-success text-pazza-success-text rounded-3 p-3 bg-pazza-light d-flex flex-row align-items-center justify-content-center gap-3">
                                <LuCircleCheckBig size={30} />
                                <div className="d-flex flex-column justify-content-center align-items-center">
                                    <div className="fw-bold">All caught up</div>
                                    <div>No unread posts</div>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="col">
                        {stats?.unansweredQuestions > 0 ?
                            <div className="bg-pazza-warning text-pazza-warning-text rounded-3 p-3 bg-pazza-light d-flex flex-row align-items-center justify-content-center gap-3">
                                <MdErrorOutline size={30} />
                                <div className="d-flex flex-column justify-content-center align-items-center">
                                    <div className="fw-bold">Needs Attention</div>
                                    <div style={{ fontSize: "0.8rem" }}>{stats?.unansweredQuestions} unanswered questions</div>
                                </div>
                            </div> :
                            <div className="bg-pazza-success text-pazza-success-text rounded-3 p-3 bg-pazza-light d-flex flex-row align-items-center justify-content-center gap-3">
                                <LuCircleCheckBig size={30} />
                                <div className="d-flex flex-column justify-content-center align-items-center">
                                    <div className="fw-bold">All caught up</div>
                                    <div>No unanswered questions</div>
                                </div>
                            </div>
                        }
                    </div>
                </div>

                <div className="row row-cols-1 row-cols-lg-2 g-3">
                    <div className="col">
                        <div className="border p-4 rounded-2">
                            <TbUserEdit size={30} />
                            <div className="fs-4 fw-bold float-end">{stats?.totalPosts}</div>
                            <div className="text-pazza-dark fw-bold mt-1" style={{ fontSize: "0.9rem" }}>Total Posts</div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="border p-4 rounded-2">
                            <LuGraduationCap size={30} />
                            <div className="fs-4 fw-bold float-end">{studentsEnrolled}</div>
                            <div className="text-pazza-dark fw-bold mt-1" style={{ fontSize: "0.9rem" }}>Students Enrolled</div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="border p-4 rounded-2">
                            <div className="fw-bold mb-2" style={{ fontSize: "1.1rem" }}>Instructor Engagement</div>
                            <LuApple size={50} className="float-end" />
                            <div className="fs-4 fw-bold">{stats?.instructorResponses}</div>
                            <div className="text-pazza-dark fw-bold mt-1" style={{ fontSize: "0.9rem" }}>Instructor Responses</div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="border p-4 rounded-2">
                            <div className="fw-bold mb-2" style={{ fontSize: "1.1rem" }}>Student Participation</div>
                            <LuUsersRound size={50} className="float-end" />
                            <div className="fs-4 fw-bold">{stats?.studentResponses}</div>
                            <div className="text-pazza-dark fw-bold mt-1" style={{ fontSize: "0.9rem" }}>Student Responses</div>
                        </div>
                    </div>

                </div>
            </div>

        )
    }

    function PostDetails() {
        const [showActions, setShowActions] = useState(false);
        const [editMode, setEditMode] = useState(false);

        const handleDeletePost = async () => {
            await client.deletePazzaPost(post._id);
            fetchPosts();
            setCurrentPost(null);
        };

        const [editSummary, setEditSummary] = useState(post.summary);
        const [editDetails, setEditDetails] = useState(post.details);
        const [saving, setSaving] = useState(false);

        const handleSaveEdit = async () => {
            setSaving(true);
            await client.updatePazzaPost({
                ...post,
                summary: editSummary,
                details: editDetails,
            });
            setEditMode(false);
            setSaving(false);
            fetchPost();
        };

        const handleCancelEdit = () => {
            setEditSummary(post.summary);
            setEditDetails(post.details);
            setEditMode(false);
        };

        const { currentUser } = useSelector((state: any) => state.accountReducer);
        const isInstructor = ["FACULTY", "TA"].includes(currentUser?.role);
        const isOwner = post.user?._id === currentUser?._id;
        return (
            <div className="">
                <div className="mb-4 d-flex align-items-center justify-content-between">
                    <div>
                        <FaArrowLeft className="me-2 text-pazza-primary" size={20} role="button" onClick={() => setCurrentPost(null)} />
                        <CgNotes className="me-2" size={20} />
                        <span className="me-2 fw-bold">{post.type}</span>
                        <span className="text-pazza-dark">@{post._id}</span>
                    </div>
                    {(isInstructor || isOwner) && (
                        <div className="position-relative">
                            <Button variant="light" className="border" onClick={() => setShowActions(!showActions)}>
                                Actions <VscTriangleDown className="ms-2" />
                            </Button>
                            <div className={`position-absolute bg-white rounded-2 mt-2 px-4 py-2 d-flex flex-column gap-2 end-0 ${showActions ? "" : "d-none"}`} onMouseLeave={() => setShowActions(false)} style={{ zIndex: 10 }}>
                                <div role="button" onClick={() => { setEditMode(true); setShowActions(false); }}>Edit</div>
                                <div role="button" className="text-danger" onClick={handleDeletePost}>Delete</div>
                            </div>
                        </div>
                    )}
                </div>
                {editMode ? (
                    <>
                        <input
                            type="text"
                            className="form-control mb-3"
                            value={editSummary}
                            onChange={e => setEditSummary(e.target.value)}
                            placeholder="Edit summary"
                            maxLength={100}
                        />
                        <RichTextEditor value={editDetails} onChange={setEditDetails} placeholder="Edit details..." />
                        <div className="d-flex gap-2 mt-3">
                            <Button className="bg-pazza-primary text-white border-0" onClick={handleSaveEdit} disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
                            <Button variant="secondary" onClick={handleCancelEdit} disabled={saving}>Cancel</Button>
                        </div>
                    </>
                ) : (
                    <>
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

                        {
                            post.type === "QUESTION" && <Answer />
                        }

                        <FollowUps postId={post._id} />
                    </>
                )}
            </div>
        )
    }

    function Answer() {
        const { currentUser } = useSelector((state: any) => state.accountReducer);

        const [isStudentEditorOpen, setIsStudentEditorOpen] = useState(false);
        const [isInstructorEditorOpen, setIsInstructorEditorOpen] = useState(false);
        const [studentAnswerDraft, setStudentAnswerDraft] = useState("");
        const [instructorAnswerDraft, setInstructorAnswerDraft] = useState("");

        const hasStudentAnswer = post.studentAnswer.content;
        const hasInstructorAnswer = post.instructorAnswer.content;

        const showStudentAnswer = hasStudentAnswer || currentUser?.role === "STUDENT";
        const showInstructorAnswer = hasInstructorAnswer || currentUser?.role !== "STUDENT";

        const openStudentEditor = () => {
            setStudentAnswerDraft(post.studentAnswer.content || "");
            setIsStudentEditorOpen(true);
        };

        const handleStartStudentAnswer = () => {
            openStudentEditor();
        };

        const handleCancelStudentAnswer = () => {
            setStudentAnswerDraft("");
            setIsStudentEditorOpen(false);
        };

        const handleSubmitStudentAnswer = async () => {

            await client.updatePazzaPost({
                ...post,
                studentAnswer: {
                    user: currentUser._id,
                    content: studentAnswerDraft,
                }
            });

            fetchPost();
            setStudentAnswerDraft("");
            setIsStudentEditorOpen(false);
        };

        const handleEditStudentAnswer = () => {
            openStudentEditor();
        };

        const openInstructorEditor = () => {
            setInstructorAnswerDraft(post.instructorAnswer.content || "");
            setIsInstructorEditorOpen(true);
        };

        const handleStartInstructorAnswer = () => {
            openInstructorEditor();
        };

        const handleCancelInstructorAnswer = () => {
            setInstructorAnswerDraft("");
            setIsInstructorEditorOpen(false);
        };

        const handleSubmitInstructorAnswer = async () => {
            await client.updatePazzaPost({
                ...post,
                instructorAnswer: {
                    user: currentUser._id,
                    content: instructorAnswerDraft,
                }
            });

            fetchPost();
            setInstructorAnswerDraft("");
            setIsInstructorEditorOpen(false);
        };

        const handleEditInstructorAnswer = () => {
            openInstructorEditor();
        };

        return (
            <>
                {showStudentAnswer && (
                    <div className="bg-pazza-success p-3 border-top d-flex gap-3">
                        <div className="bg-pazza-success-dark text-white fw-bold rounded-3 d-flex align-items-center justify-content-center" style={{ width: "25px", height: "25px" }}>S</div>
                        <div className="mb-2 flex-grow-1">
                            <Dropdown className="float-end">
                                <DropdownToggle variant="light" className="border" style={{ zIndex: 11 }}>
                                    Actions
                                </DropdownToggle>
                                <DropdownMenu className={`position-absolute bg-white rounded-2 mt-2 px-4 py-2 d-flex flex-column gap-2 end-0`} style={{ zIndex: 10 }}>
                                    <DropdownItem role="button" onClick={() => { openStudentEditor(); }}>
                                        Edit
                                    </DropdownItem>
                                    <DropdownItem role="button" className="text-danger" onClick={async () => {
                                        if (!confirm("Delete student answer? This cannot be undone.")) return;
                                        await client.updatePazzaPost({
                                            ...post,
                                            studentAnswer: { user: null, content: "" }
                                        });
                                        fetchPost();
                                    }}>Delete</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            <div className="fs-5 fw-bold">Students' Answer</div>
                            {hasStudentAnswer ?
                                <p className="text-black-50" style={{ fontSize: "0.8rem" }}>Updated {calculateTimeDifference(post.studentAnswer.updatedAt)} by {post.studentAnswer.user?.firstName} {post.studentAnswer.user?.lastName}</p>
                                : <p className="text-black-50" style={{ fontSize: "0.8rem" }}>Where students collectively construct a single answer</p>
                            }
                            {isStudentEditorOpen ? (
                                <div>
                                    <RichTextEditor
                                        value={studentAnswerDraft}
                                        onChange={setStudentAnswerDraft}
                                        placeholder="Start the wiki answer..."
                                    />
                                    <div className="d-flex justify-content-end gap-2 mt-3">
                                        <Button type="button" className="bg-pazza-primary text-white border-0" onClick={handleSubmitStudentAnswer}>Submit</Button>
                                        <Button type="button" className="bg-pazza-light border-0" onClick={handleCancelStudentAnswer}>Cancel</Button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {hasStudentAnswer ? (
                                        <div dangerouslySetInnerHTML={{ __html: post.studentAnswer.content }} />
                                    ) : (
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Click to start off the wiki answer"
                                            onFocus={handleStartStudentAnswer}
                                            onClick={handleStartStudentAnswer}
                                            readOnly
                                        />
                                    )}
                                    {(hasStudentAnswer && currentUser.role === "STUDENT") && (
                                        <div className="d-flex mt-2">
                                            {/* Edit moved into dropdown */}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                )}

                {showInstructorAnswer && (
                    <div className="bg-pazza-warning p-3 border-top d-flex gap-3">

                        <div className="bg-pazza-warning-dark text-white fw-bold rounded-3 d-flex align-items-center justify-content-center" style={{ width: "25px", height: "25px" }}>i</div>
                        <div className="mb-2 flex-grow-1">
                            {currentUser.role !== "STUDENT" &&
                                <Dropdown className="float-end">
                                    <DropdownToggle variant="light" className="border" style={{ zIndex: 11 }} >
                                        Actions
                                    </DropdownToggle>
                                    <DropdownMenu className={`position-absolute bg-white rounded-2 mt-2 px-4 py-2 d-flex flex-column gap-2 end-0`} style={{ zIndex: 10 }}>
                                        <DropdownItem role="button" onClick={() => { openInstructorEditor(); }}>
                                            Edit
                                        </DropdownItem>
                                        <DropdownItem role="button" className="text-danger" onClick={async () => {
                                            await client.updatePazzaPost({
                                                ...post,
                                                instructorAnswer: { user: null, content: "" }
                                            });
                                            fetchPost();
                                        }}>Delete</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            }
                            <div className="fs-5 fw-bold">Instructors' Answer</div>
                            {hasInstructorAnswer ?
                                <p className="text-black-50" style={{ fontSize: "0.8rem" }}>Updated {calculateTimeDifference(post.instructorAnswer.updatedAt)} by {post.instructorAnswer.user?.firstName} {post.instructorAnswer.user?.lastName}</p>
                                :
                                <p className="text-black-50" style={{ fontSize: "0.8rem" }}>Where instructors collectively construct a single answer</p>
                            }

                            {isInstructorEditorOpen ? (
                                <div>
                                    <RichTextEditor
                                        value={instructorAnswerDraft}
                                        onChange={setInstructorAnswerDraft}
                                        placeholder="Start the wiki answer..."
                                    />
                                    <div className="d-flex justify-content-end gap-2 mt-3">
                                        <Button type="button" className="bg-pazza-primary text-white border-0" onClick={handleSubmitInstructorAnswer}>Submit</Button>
                                        <Button type="button" className="bg-pazza-light border-0" onClick={handleCancelInstructorAnswer}>Cancel</Button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {hasInstructorAnswer ? (
                                        <div dangerouslySetInnerHTML={{ __html: post.instructorAnswer.content }} />
                                    ) : (
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Click to start off the wiki answer"
                                            onFocus={handleStartInstructorAnswer}
                                            onClick={handleStartInstructorAnswer}
                                            readOnly
                                        />
                                    )}
                                    {(hasInstructorAnswer && currentUser.role !== "STUDENT") && (
                                        <div className="d-flex mt-2">
                                            {/* Edit moved into dropdown */}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                )}
            </>
        )
    }
}