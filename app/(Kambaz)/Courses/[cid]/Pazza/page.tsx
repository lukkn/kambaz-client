"use client";

import { useState } from "react";

import { FaArrowLeft, FaLink, FaRegBookmark, FaRegStar } from "react-icons/fa6";
import { CgNotes } from "react-icons/cg";
import { BiLike } from "react-icons/bi";
import { RiChat3Line } from "react-icons/ri";
import { FaRegUserCircle, FaCheck } from "react-icons/fa";

export default function Pazza() {
    return (
        <div className="">
            <div className="mb-4">
                <FaArrowLeft className="me-2 text-pazza-primary" size={20}/>
                <CgNotes className="me-2" size={20} />
                <span className="me-2 fw-bold">note</span>
                <span className="text-pazza-dark">@123</span>
            </div>
            <h2>Post Title</h2>
            <p className="text-pazza-dark">Updated 10 hours ago by user</p>
            <p>Here are some tips on using Pazza effectively. </p>
            <div className="wd-tags">
                <div className="bg-pazza-accent text-pazza-primary py-1 px-2 rounded-2" style={{width: "fit-content"}}>hw1</div>
            </div>

            <div className="text-pazza-primary m-2 py-2">
                <BiLike className="me-1" size={30} /> <span className="me-4">0</span>
                <FaRegBookmark className="me-4" size={30} />
                <FaRegStar className="me-4" size={30} />
                <FaLink className="me-4" size={30} />
                <span className="float-end">23 views</span>
            </div>

            <div>
                <h5 className="mb-3 border-bottom border-top p-3 fw-bold"><RiChat3Line className="me-3" size={25} />2 Followup Discussions</h5>
                <div className="p-3 border-bottom">
                    <div className="mb-2 align-items-center d-flex"><Switch /><span className="ms-2 fw-bold">Resolved</span></div> 
                    <FaRegUserCircle className="me-2" size={30} />
                    <span className="fw-bold">Username</span><span className="ms-3 text-pazza-dark">5 hours ago</span>
                    <p className="mt-2">This is a follow-up discussion on the post.</p>
                    <div className=""><BiLike className="me-2 text-pazza-primary" size={20} /> <span className="me-4 text-pazza-dark fw-bold">0</span></div>
                </div>
            </div>

        </div>
    );
}

function Switch() {
    const [isOn, setIsOn] = useState(false);
    
    return (
        <button
            onClick={() => setIsOn(!isOn)}
            className={`wd-switch ${isOn ? "wd-switch-on" : "wd-switch-off"}`}
            style={{
                display: "inline-block",
                position: "relative",
                width: "40px",
                height: "22px",
                backgroundColor: isOn ? "#0C5FAB" : "#ccc",
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
                    left: isOn ? "20px" : "2px",
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