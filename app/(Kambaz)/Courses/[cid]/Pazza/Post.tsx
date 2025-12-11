"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { FaArrowLeft, FaLink, FaRegBookmark, FaRegStar } from "react-icons/fa6";
import { CgNotes } from "react-icons/cg";
import { BiLike } from "react-icons/bi";
import { Button } from "react-bootstrap";

import FollowUps from "./FollowUps";
import RichTextEditor from "./RichTextEditor";

import { calculateTimeDifference } from "../../../../utils";
import * as client from "./client";

export default function Post({ postId }: { postId: string | null }) {

    const [post, setPost] = useState<any>(null);

    const fetchPost = async () => {
        if (!postId) return null;
        const post = await client.findPazzaPostById(postId);
        setPost(post);
    }

    useEffect(() => {
        fetchPost()
    }, [postId]);

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

                {
                    post.type === "QUESTION" && <Answer />
                }

                <FollowUps postId={post._id} />
            </div>
        )
    }

    function Answer() {
        const { currentUser } = useSelector((state: any) => state.accountReducer);

        const [isStudentEditorOpen, setIsStudentEditorOpen] = useState(false);
        const [isInstructorEditorOpen, setIsInstructorEditorOpen] = useState(false);
        const [studentAnswerDraft, setStudentAnswerDraft] = useState("");
        const [instructorAnswerDraft, setInstructorAnswerDraft] = useState("");

        const hasStudentAnswer = post.studentAnswer;
        const hasInstructorAnswer = post.instructorAnswer;

        const showStudentAnswer = hasStudentAnswer || currentUser?.role === "STUDENT";
        const showInstructorAnswer = hasInstructorAnswer || currentUser?.role !== "STUDENT";

        const openStudentEditor = () => {
            setStudentAnswerDraft(post.studentAnswer || "");
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
                studentAnswer: studentAnswerDraft,
            });

            fetchPost();
            setStudentAnswerDraft("");
            setIsStudentEditorOpen(false);
        };

        const handleEditStudentAnswer = () => {
            openStudentEditor();
        };

        const openInstructorEditor = () => {
            setInstructorAnswerDraft(post.instructorAnswer || "");
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
                instructorAnswer: instructorAnswerDraft,
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
                            <div className="fs-5 fw-bold">Students' Answer</div>
                            <p className="text-black-50" style={{ fontSize: "0.8rem" }}>Where students collectively construct a single answer</p>
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
                                        <div dangerouslySetInnerHTML={{ __html: post.studentAnswer }} />
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
                                            <Button size="sm" variant="light" className="border" onClick={handleEditStudentAnswer}>Edit</Button>
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
                            <div className="fs-5 fw-bold">Instructors' Answer</div>
                            <p className="text-black-50" style={{ fontSize: "0.8rem" }}>Where instructors collectively construct a single answer</p>
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
                                        <div dangerouslySetInnerHTML={{ __html: post.instructorAnswer }} />
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
                                            <Button size="sm" variant="light" className="border" onClick={handleEditInstructorAnswer}>Edit</Button>
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