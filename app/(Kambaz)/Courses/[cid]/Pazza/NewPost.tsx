
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import Link from "next/link";

import { FiPlusCircle } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from "react-bootstrap";

import RichTextEditor from "./RichTextEditor";

import * as client from "./client";
import * as courseClient from "../../client";
import { read } from "fs";

export default function NewPost({ setNewPost, fetchPosts, setCurrentPost }: { setNewPost: (value: boolean) => void, fetchPosts: () => void, setCurrentPost: (post: any) => void }) {

    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { cid } = useParams();

    const [type, setType] = useState("QUESTION");
    const [visibilityCategory, setVisibilityCategory] = useState("ALL");
    const [specificViewers, setSpecificViewers] = useState<Array<any>>([]);
    const [summary, setSummary] = useState("");
    const [details, setDetails] = useState("");
    const [showNameAs, setShowNameAs] = useState(`${currentUser?.firstName} ${currentUser?.lastName}`);
    const [folders, setFolders] = useState<Array<any>>([]);
    const [selectedFolders, setSelectedFolders] = useState<Array<string>>([]);
    const [attemptedSubmit, setAttemptedSubmit] = useState(false);
    const [errors, setErrors] = useState<Array<string>>([]);


    const [users, setUsers] = useState<Array<any>>([]);
    const [postTo, setPostTo] = useState("ALL");

    const createPost = async (newPost: any) => {
        const post = await client.createPazzaPost(newPost);
        fetchPosts();
        setNewPost(false);
        return post;
    }

    const handleSubmit = async () => {
        setAttemptedSubmit(true);
        const validationErrors = [] as Array<string>;

        if (!summary.trim()) { validationErrors.push("Summary is required."); }
        if (selectedFolders.length === 0) { validationErrors.push("Select at least one folder."); }
        if (!type) { validationErrors.push("Post type is required."); }
        if (!postTo) { validationErrors.push("Post visibility is required."); }

        if (validationErrors.length) {
            setErrors(validationErrors);
            return;
        }

        setErrors([]);

        const newPost = {
            type,
            course: cid,
            user: currentUser?._id,
            summary,
            details,
            folders: selectedFolders,
            visibilityCategory,
            specificViewers: specificViewers.map((user) => user._id),
            isAnonymous: showNameAs === "ANONYMOUS",
        };
        console.log("Creating post:", newPost);
        const post = await createPost(newPost);
        setCurrentPost(post);
    }

    const fetchFolders = async () => {
        const folders = await client.findPazzaFoldersByCourse(cid as string);
        setFolders(folders);
    }

    const fetchUsers = async () => {
        const users = await courseClient.findUsersForCourse(cid as string);
        setUsers(users);
    }

    useEffect(() => {
        fetchUsers();
        fetchFolders();
    }, []);

    useEffect(() => {
        console.log("Selected folders:", selectedFolders);
    }, [selectedFolders]);

    return (
        <div className="">
            <div className="d-flex align-items-center mb-4">
                <FaArrowLeft size={25} className="text-pazza-primary me-3" role="button" onClick={() => setNewPost(false)} />
                <FiPlusCircle size={25} />
                <span className="ms-2 fw-bold">New Post</span>
            </div>

            <div className="fw-bold mb-2">Post Type*</div>
            <div className="d-flex gap-4">
                <div className="form-check mb-2">
                    <input type="radio" name="postType" id="question" value="QUESTION" className="form-check-input me-2" checked={type === "QUESTION"} onChange={(e) => setType(e.target.value)} />
                    <label className="form-check-label" htmlFor="question">Question</label>
                </div>
                <div className="form-check mb-2">
                    <input type="radio" name="postType" id="note" value="NOTE" className="form-check-input me-2" checked={type === "NOTE"} onChange={(e) => setType(e.target.value)} />
                    <label className="form-check-label" htmlFor="note">Note</label>
                </div>
            </div>

            <div className="fw-bold mt-4 mb-2">Post To*</div>
            <div className="d-flex gap-4 mb-1">
                <div className="form-check mb-2">
                    <input type="radio" name="postTo" id="entireClass" value="ALL" className="form-check-input me-2" checked={postTo === "ALL"}
                        onChange={(e) => {
                            setPostTo(e.target.value)
                            setVisibilityCategory("ALL");
                        }} />
                    <label className="form-check-label" htmlFor="entireClass">Entire Class</label>
                </div>
                <div className="form-check mb-2 ">
                    <input type="radio" name="postTo" id="instructors" value="SPECIFIC" className="form-check-input me-2" checked={postTo === "SPECIFIC"}
                        onChange={(e) => {
                            setPostTo(e.target.value);
                            setVisibilityCategory("NONE");
                        }} />
                    <label className="form-check-label" htmlFor="instructors">Individual Student(s) / Instructor(s) </label>
                </div>
            </div>
            {postTo === "SPECIFIC" && (
                <>
                    <Dropdown className="mb-4">
                        <DropdownToggle id="dropdown-basic-button" className="btn btn-secondary bg-white text-dark border-dark  ">
                            Select users
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem
                                onClick={() => {
                                    if (visibilityCategory !== "INSTRUCTORS") setVisibilityCategory("INSTRUCTORS");
                                }}
                                disabled={visibilityCategory === "INSTRUCTORS"}
                            >
                                All Instructors{visibilityCategory === "INSTRUCTORS" && " (Selected)"}
                            </DropdownItem>
                            {
                                users.map((user) => {
                                    const alreadySelected = specificViewers.some((u) => u._id === user._id);
                                    return (
                                        <DropdownItem
                                            key={user._id}
                                            onClick={() => {
                                                if (!alreadySelected) setSpecificViewers([...specificViewers, user]);
                                            }}
                                            disabled={alreadySelected}
                                        >
                                            {user.firstName} {user.lastName}
                                            {alreadySelected && " (Selected)"}
                                        </DropdownItem>
                                    );
                                })
                            }
                        </DropdownMenu>
                    </Dropdown>
                    <div>
                        {visibilityCategory === "INSTRUCTORS" && (
                            <div className="border border-1 rounded-2 d-inline-flex align-items-center ps-3 pe-2 py-1 me-2 mb-2">
                                <div>All Instructors</div>
                                <IoClose size={16} className="text-pazza-dark ms-2" role="button" onClick={() => setVisibilityCategory("NONE")} />
                            </div>
                        )}
                        {specificViewers?.map((user) => (
                            <div className="border border-1 rounded-2 d-inline-flex align-items-center px-2 py-1 me-2 mb-2" key={user._id}>
                                <div key={user._id}>{user.firstName} {user.lastName}</div>
                                <IoClose size={16} className="text-pazza-dark ms-2" role="button" onClick={() => setSpecificViewers(specificViewers.filter((u) => u._id !== user._id))} />
                            </div>
                        ))}
                    </div>
                </>
            )}


            <div className="fw-bold mt-4 mb-2">Selected Folder(s)*</div>
            <div className="mb-2 d-flex flex-wrap gap-3">
                {folders.map((folder) => {
                    const isSelected = selectedFolders.includes(folder._id);
                    return (
                        <div
                            key={folder._id}
                            role="button"
                            className={`px-2 py-1 rounded-2 ${isSelected ? "bg-pazza-primary text-white" : "bg-pazza-accent text-pazza-primary"}`}
                            onClick={() => {
                                if (isSelected) {
                                    setSelectedFolders(selectedFolders.filter((id) => id !== folder._id));
                                } else {
                                    setSelectedFolders([...selectedFolders, folder._id]);
                                }
                            }}
                        >
                            {folder.name}
                        </div>
                    );
                })}

                {attemptedSubmit && selectedFolders.length === 0 && (
                    <div className="invalid-feedback d-block w-100">Select at least one folder.</div>
                )}
            </div>
            <Link href="Pazza/ManageClass/ManageFolders" className="mb-4 text-pazza-primary">Manage folders</Link>

            <div className="fw-bold mt-4 mb-2">Summary*</div>
            <input
                type="text"
                className={`form-control mb-4 ${attemptedSubmit && !summary.trim() ? "is-invalid" : ""}`}
                placeholder="Enter a one line summary, 100 characters or less"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                required
                aria-invalid={attemptedSubmit && !summary.trim()}
                maxLength={100}
            />

            <div className="fw-bold mt-4 mb-2">Details</div>
            <RichTextEditor value={details} onChange={setDetails} />

            <div className="fw-bold mt-4 mb-2">Show my name as</div>
            <select className="form-select mb-4" value={showNameAs} onChange={(e) => setShowNameAs(e.target.value)}>
                <option value="SHOW_NAME">{currentUser?.firstName} {currentUser?.lastName}</option>
                <option value="ANONYMOUS">Anonymous to Classmates</option>
            </select>

            <div className="mb-4">* Required fields</div>

            {errors.length > 0 && (
                <div className="alert alert-danger" role="alert">
                    {errors.map((error) => (<div key={error}>{error}</div>))}
                </div>
            )}

            <button className="btn btn-pazza-primary" onClick={handleSubmit}>Post My Question</button>
            <button className="btn btn-secondary ms-3" disabled>Save Draft</button>
            <button className="btn btn-secondary ms-3" onClick={() => setNewPost(false)}>Cancel</button>

        </div>
    );
}