
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { FaRegUserCircle } from "react-icons/fa";
import { VscTriangleDown } from "react-icons/vsc";
import { RiChat3Line } from "react-icons/ri";
import { BiLike } from "react-icons/bi";
import { Button } from "react-bootstrap";

import Switch from "../../../../components/switch";
import RichTextEditor from "./RichTextEditor";

import * as client from "./client";
import { setFollowUps } from "./reducer";
import { calculateTimeDifference } from "../../../../utils";

export default function FollowUps({ postId }: { postId: string }) {

    const dispatch = useDispatch();

    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const { followUps } = useSelector((state: any) => state.pazzaReducer);


    const fetchFollowUps = async () => {
        const followUps = await client.findPazzaFollowUpsByPost(postId);
        dispatch(setFollowUps(followUps));
    }


    useEffect(() => {
        fetchFollowUps();
    }, [postId]);


    return (
        <div>
            <h5 className="mb-3 border-bottom border-top p-3 fw-bold"><RiChat3Line className="me-3" size={25} />{followUps?.length || 0} Followup Discussions</h5>
            {followUps?.map((followUp: any, index: number) => (
                <FollowUpItem
                    key={followUp?._id || index}
                    followUp={followUp}
                    depth={0}
                    onRefresh={fetchFollowUps}
                />
            ))}
            <FollowUpEditor onSubmitted={fetchFollowUps} />
        </div>
    )


    function FollowUpItem({ followUp, depth, onRefresh }: { followUp: any, depth: number, onRefresh: () => Promise<void> }) {
        const [showActions, setShowActions] = useState(false);
        const [editMode, setEditMode] = useState(false);
        const [followUpContent, setFollowUpContent] = useState("");
        const [nestedFollowUps, setNestedFollowUps] = useState<any[]>([]);

        const updateResolved = async (newResolved: boolean) => {
            console.log("Updating follow-up resolved status to:", newResolved);
            const updatedFollowUp = { ...followUp, resolved: newResolved };
            await client.updatePazzaFollowUp(updatedFollowUp);
            await onRefresh();
        }

        const handleDeleteFollowUp = async () => {
            await client.deletePazzaFollowUp(followUp._id);
            await onRefresh();
        }

        const handleEditFollowUp = async () => {
            await client.updatePazzaFollowUp({ ...followUp, content: followUpContent });
            setEditMode(false);
            await onRefresh();
        }

        const fetchNestedFollowUps = async () => {
            const nestedIds = Array.isArray(followUp?.nestedFollowUps) ? followUp.nestedFollowUps : [];
            if (nestedIds.length === 0) {
                setNestedFollowUps([]);
                return;
            }
            const nested = await client.findFollowUpsById(nestedIds);
            setNestedFollowUps(Array.isArray(nested) ? nested : []);
            console.log("Fetched nested follow-ups:", nested);
        }

        useEffect(() => {
            fetchNestedFollowUps();
        }, [followUp?._id, followUp?.nestedFollowUps?.join(",")]);

        return (
            <div className={depth ? "ms-4 mt-3 p-3 border-start rounded-3 bg-light" : "p-3 border-bottom"}>
                <div className="align-items-center d-flex position-relative">
                    {depth === 0 && (
                        <div className="mb-2">
                            <Switch state={followUp.resolved} setState={updateResolved} />
                            {followUp.resolved ?
                                <span className="ms-2 fw-bold">Resolved</span> :
                                <span className="ms-2 fw-bold">Unresolved</span>
                            }
                        </div>
                    )}
                    <div className="position-absolute end-0 top-0 bg-pazza-accent px-2 py-1 rounded-2 text-pazza-primary" >
                        <div role="button" onClick={() => setShowActions(!showActions)}>Actions <VscTriangleDown className="ms-2" /></div>
                        <div className={`position-absolute bg-white rounded-2 mt-2 px-4 py-2 d-flex flex-column gap-2 ${showActions ? "" : "d-none"}`} onMouseLeave={() => setShowActions(false)}>
                            <div role="button"
                                onClick={() => {
                                    setEditMode(true)
                                    setFollowUpContent(followUp.content);
                                }}>Edit</div>
                            <div role="button" className="" onClick={handleDeleteFollowUp}>Delete</div>
                        </div>
                    </div>
                </div>

                <div className="d-flex">
                    <FaRegUserCircle className="me-2" size={30} />
                    <div>
                        <span className="fw-bold">{followUp.user.firstName} {followUp.user.lastName}</span><span className="ms-3 text-pazza-dark">{calculateTimeDifference(followUp.createdAt)}</span>
                        {editMode ?
                            <div className="my-2">
                                <RichTextEditor
                                    value={followUpContent}
                                    onChange={setFollowUpContent}
                                />
                                <Button className="mt-2 bg-pazza-primary text-white border-0" onClick={() => handleEditFollowUp()}>Save</Button>
                                <Button className="mt-2 ms-2 bg-pazza-light border-0" onClick={() => setEditMode(false)}>Cancel</Button>
                            </div>
                            : <div dangerouslySetInnerHTML={{ __html: followUp.content || '' }} />
                        }
                        <div className=""><BiLike className="me-2 text-pazza-primary" size={20} /> <span className="me-4 text-pazza-dark fw-bold">0</span></div>
                    </div>
                </div>
                {nestedFollowUps?.map((nestedFollowUp: any, index: number) => (
                    <FollowUpItem
                        key={nestedFollowUp?._id || index}
                        followUp={nestedFollowUp}
                        depth={depth + 1}
                        onRefresh={fetchNestedFollowUps}
                    />
                ))}
                <FollowUpEditor
                    key={followUp._id}
                    placeholder="Reply to this follow-up discussion..."
                    parentId={followUp._id}
                    onSubmitted={onRefresh}
                />

            </div>
        );
    }

    function FollowUpEditor({ placeholder, parentId, onSubmitted }: { placeholder?: string, parentId?: string, onSubmitted?: () => Promise<void> }) {
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
                user: currentUser?._id,
                content: followUpDraft,
            };
            if (parentId) {
                await client.createNestedPazzaFollowUp(parentId, newFollowUp);
            } else {
                const followUpWithPost = { ...newFollowUp, post: postId };
                await client.createPazzaFollowUp(followUpWithPost);
            }

            setFollowUpDraft("");
            setIsFollowUpEditorOpen(false);
            if (onSubmitted) {
                await onSubmitted();
            } else {
                fetchFollowUps();
            }
        }
        return (
            <>
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
                        placeholder={placeholder || "Compose a new follow-up discussion..."}
                        onFocus={handleStartFollowUp}
                        onClick={handleStartFollowUp}
                        readOnly
                    />
                )}
            </>
        )
    }

};