"use client";

import { useState, useEffect } from "react";

import { FaArrowLeft, FaLink, FaRegBookmark, FaRegStar } from "react-icons/fa6";
import { CgNotes } from "react-icons/cg";
import { BiLike } from "react-icons/bi";
import { RiChat3Line } from "react-icons/ri";
import { FaRegUserCircle, FaCheck } from "react-icons/fa";
import { Button } from "react-bootstrap";

import RichTextEditor from "./RichTextEditor";

import { useSelector, useDispatch } from "react-redux";
import { setFollowUps } from "./reducer";

import * as client from "./client";

export default function Post({ post, fetchPosts }: { post: any, fetchPosts: () => void }) {

    const dispatch = useDispatch();

    const fetchFollowUps = async () => {
        const followUps = await client.findPazzaFollowUpsByPost(post._id);
        dispatch(setFollowUps(followUps));
    }


    useEffect(() => {
        fetchFollowUps();
    }, [post]);

    return (
        post ? <PostDetails /> : <div className="text-pazza-dark">Select a post to view its details.</div>
    );

    function PostDetails() {

        const { currentUser } = useSelector((state: any) => state.accountReducer);
        const { followUps } = useSelector((state: any) => state.pazzaReducer);
        const [isFollowUpEditorOpen, setIsFollowUpEditorOpen] = useState(false);
        const [followUpDraft, setFollowUpDraft] = useState("");

        const handleStartFollowUp = () => {
            setIsFollowUpEditorOpen(true);
        };

        const handleCancelFollowUp = () => {
            setFollowUpDraft("");
            setIsFollowUpEditorOpen(false);
        };

        const handleSubmitFollowUp = async () => {
            const newFollowUp = {
                post: post._id,
                user: currentUser?._id,
                content: followUpDraft,
            };

            await client.createPazzaFollowUp(newFollowUp);

            setFollowUpDraft("");
            setIsFollowUpEditorOpen(false);

            fetchFollowUps();
        }

        return (
            <div className="">
                <div className="mb-4">
                    <FaArrowLeft className="me-2 text-pazza-primary" size={20} />
                    <CgNotes className="me-2" size={20} />
                    <span className="me-2 fw-bold">{post.type}</span>
                    <span className="text-pazza-dark">@{post._id}</span>
                </div>
                <h2>{post.summary}</h2>
                <p className="text-pazza-dark">Updated {calculateTimeDifference(post.updatedAt)} hours ago by {post.user.firstName} {post.user.lastName}</p>
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

                <div>
                    <h5 className="mb-3 border-bottom border-top p-3 fw-bold"><RiChat3Line className="me-3" size={25} />{followUps?.length || 0} Followup Discussions</h5>
                    {followUps?.map((followUp: any, index: number) => (
                        <FollowUp key={index} followUp={followUp} />
                    ))}
                    {isFollowUpEditorOpen ? (
                        <div className="mt-3 border rounded-3 p-3 bg-light">
                            <RichTextEditor
                                value={followUpDraft}
                                onChange={setFollowUpDraft}
                                placeholder="Add a follow-up discussion..."
                            />
                            <div className="d-flex justify-content-end gap-2 mt-3">
                                <Button type="button" className="bg-pazza-primary text-white border-0" onClick={handleSubmitFollowUp}>Submit</Button>
                                <Button type="button" className="bg-pazza-light border-0" onClick={handleCancelFollowUp}>Cancel</Button>
                            </div>
                        </div>
                    ) : (
                        <input
                            type="text"
                            className="form-control mt-3"
                            placeholder="Add a follow-up discussion..."
                            onFocus={handleStartFollowUp}
                            onClick={handleStartFollowUp}
                            readOnly
                        />
                    )}
                </div>

            </div>
        )
    }


    function FollowUp({ followUp }: { followUp: any }) {

        const updateResolved = async (newResolved: boolean) => {
            console.log("Updating follow-up resolved status to:", newResolved);
            const updatedFollowUp = { ...followUp, resolved: newResolved };
            await client.updatePazzaFollowUp(updatedFollowUp);
            fetchFollowUps();
        }
        const user = followUp?.user;
        const displayName = typeof user === "string"
            ? user
            : `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "Unknown user";

        return (
            <div className="p-3 border-bottom">
                <div className="mb-3 align-items-center d-flex">
                    <Switch resolved={followUp.resolved} updateResolved={updateResolved} />
                    {followUp.resolved ?
                        <span className="ms-2 fw-bold">Resolved</span> :
                        <span className="ms-2 fw-bold">Unresolved</span>
                    }
                </div>
                <div className="d-flex">
                    <FaRegUserCircle className="me-2" size={30} />
                    <div>
                        <span className="fw-bold">{displayName}</span><span className="ms-3 text-pazza-dark">{calculateTimeDifference(followUp.createdAt)} hours ago</span>
                        <div dangerouslySetInnerHTML={{ __html: followUp.content || '' }} />
                        <div className=""><BiLike className="me-2 text-pazza-primary" size={20} /> <span className="me-4 text-pazza-dark fw-bold">0</span></div>
                    </div>
                </div>
            </div>
        );
    }


    function Switch({ resolved, updateResolved }: { resolved: boolean, updateResolved: (newResolved: boolean) => void }) {

        return (
            <button
                onClick={() => updateResolved(!resolved)}
                className={`wd-switch ${resolved ? "wd-switch-on" : "wd-switch-off"}`}
                style={{
                    display: "inline-block",
                    position: "relative",
                    width: "40px",
                    height: "22px",
                    backgroundColor: resolved ? "#0C5FAB" : "#ccc",
                    border: "none",
                    borderRadius: "22px",
                    cursor: "pointer",
                    padding: "0",
                    transition: "background-color 0.3s ease",
                }}
            >
                <span
                    style={{
                        position: "absolute",
                        top: "2px",
                        left: resolved ? "20px" : "2px",
                        width: "18px",
                        height: "18px",
                        backgroundColor: "white",
                        borderRadius: "50%",
                        transition: "left 0.3s ease",
                    }}
                />
            </button>
        );
    }
}


function calculateTimeDifference(dateString: string) {
    const postDate = new Date(dateString);
    const currentDate = new Date();
    const diffInMs = currentDate.getTime() - postDate.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    return diffInHours;
};