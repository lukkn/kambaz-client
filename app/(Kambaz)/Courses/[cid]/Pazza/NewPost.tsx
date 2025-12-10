
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";

import { FiPlusCircle } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa6";

import * as client from "./client";

export default function NewPost({ setNewPost }: { setNewPost: (value: boolean) => void }) {

    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { cid } = useParams();

    const [type, setType] = useState("QUESTION");
    const [postTo, setPostTo] = useState("ENTIRE_CLASS");
    const [summary, setSummary] = useState("");
    const [details, setDetails] = useState("");
    const [showNameAs, setShowNameAs] = useState(`${currentUser?.firstName} ${currentUser?.lastName}`);


    const createPost = async (newPost: any) => {
        await client.createPazzaPost(newPost);
        setNewPost(false);
    }

    return (
        <div className="">
            <div className="d-flex align-items-center mb-4">
                <FaArrowLeft size={25} className="text-pazza-primary me-3" role="button" onClick={() => setNewPost(false)} />
                <FiPlusCircle size={25} />
                <span className="ms-2 fw-bold">New Post</span>
            </div>

            <div className="fw-bold mb-2">Post Type*</div>
            <div className="form-check mb-2">
                <input type="radio" name="postType" id="question" value="QUESTION" className="form-check-input me-2" checked={type === "QUESTION"} onChange={(e) => setType(e.target.value)} />
                <label className="form-check-label" htmlFor="question">Question</label>
            </div>
            <div className="form-check mb-2">
                <input type="radio" name="postType" id="note" value="NOTE" className="form-check-input me-2" checked={type === "NOTE"} onChange={(e) => setType(e.target.value)} />
                <label className="form-check-label" htmlFor="note">Note</label>
            </div>
            <div className="form-check mb-2">
                <input type="radio" name="postType" id="poll" value="POLL" className="form-check-input me-2" checked={type === "POLL"} onChange={(e) => setType(e.target.value)} />
                <label className="form-check-label" htmlFor="poll">Poll/In-Class Response</label>
            </div>

            <div className="fw-bold mt-4 mb-2">Post To*</div>
            <div className="form-check mb-2">
                <input type="radio" name="postTo" id="entireClass" value="ENTIRE_CLASS" className="form-check-input me-2" checked={postTo === "ENTIRE_CLASS"} onChange={(e) => setPostTo(e.target.value)} />
                <label className="form-check-label" htmlFor="entireClass">Entire Class</label>
            </div>
            <div className="form-check mb-2 ">
                <input type="radio" name="postTo" id="instructors" value="INSTRUCTORS" className="form-check-input me-2" checked={postTo === "INSTRUCTORS"} onChange={(e) => setPostTo(e.target.value)} />
                <label className="form-check-label" htmlFor="instructors">Instructor(s)</label>
            </div>

            <div className="fw-bold mt-4 mb-2">Selected Folder(s)*</div>
            <div className="mb-4">
            </div>

            <div className="fw-bold mt-4 mb-2">Summary*</div>
            <input type="text" className="form-control mb-4" placeholder="Enter a one line summary, 100 characters or less" value={summary} onChange={(e) => setSummary(e.target.value)} />

            <div className="fw-bold mt-4 mb-2">Details</div>
            <textarea className="form-control mb-4" rows={4} value={details} onChange={(e) => setDetails(e.target.value)} />

            <div className="fw-bold mt-4 mb-2">Show my name as</div>
            <select className="form-select mb-4" value={showNameAs} onChange={(e) => setShowNameAs(e.target.value)}>
                <option value="SHOW_NAME">{currentUser?.firstName} {currentUser?.lastName}</option>
                <option value="ANONYMOUS">Anonymous to Classmates</option>
            </select>

            <div className="mb-4">* Required fields</div>

            <button className="btn btn-pazza-primary"
                onClick={() => {
                    const newPost = {
                        type,
                        course: cid,
                        user: currentUser?._id,
                        summary,
                        details,
                        isAnonymous: showNameAs === "ANONYMOUS",
                        visibility: postTo,

                    };
                    console.log("Creating post:", newPost);
                    createPost(newPost);
                }}>Post My Question</button>
            <button className="btn btn-secondary ms-3">Save Draft</button>
            <button className="btn btn-secondary ms-3">Cancel</button>

        </div>
    );
}