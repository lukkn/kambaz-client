"use client";

import { Button, ListGroup } from "react-bootstrap";
import { useParams } from "next/navigation";
import Link from "next/link";

import Assignment from "./Assignment";
import { IoSearch } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";

import { useSelector, useDispatch } from "react-redux";
import { setAssignments } from "./reducer";


import * as client from "../../client";
import { useEffect } from "react";

export default function Assignments() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const { cid } = useParams();
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);

    const dispatch = useDispatch();

    const assignmentCategories = [
        { id: 1, title: "Assignments", weight: 40, items: assignments },
        { id: 2, title: "Quizzes", weight: 20, items: [] },
        { id: 3, title: "Exams", weight: 30, items: [] },
        { id: 4, title: "Projects", weight: 10, items: [] },
    ]

    const fetchAssignments = async () => {
        console.log("Fetching assignments for course:", cid);
        const assignments = await client.findAssignmentsForCourse(cid as string);
        console.log("fetched assignments:", assignments)
        dispatch(setAssignments(assignments));
    }

    const onDeleteAssignment = async (assignmentId: string) => {
        console.log("Deleting assignment with ID:", assignmentId);
        await client.deleteAssignment(assignmentId);
        dispatch(setAssignments(assignments.filter((a: any) => a._id !== assignmentId)));
    }

    useEffect(() => {
        fetchAssignments();
    }, []);

    return (
        <div id="wd-assignments" className="p-4 d-flex flex-column gap-3">
            <AssignmentsControlButtons />
            <ListGroup id="wd-assignments-list" className="mt-3">
                {
                    assignmentCategories.map((category) => (
                        <Assignment key={category.id} category={category} deleteAssignment={onDeleteAssignment} />
                    ))
                }
            </ListGroup>
        </div>
    );

    function AssignmentsControlButtons() {
        return (
            <div id="wd-assignments-controls" className="text-nowrap" style={{ display: currentUser?.role === "FACULTY" ? "block" : "none" }}>
                <div className="float-start d-flex align-items-center gap-2 border px-2 rounded-3 w-25">
                    <IoSearch />
                    <input type="text" placeholder="Search..." className="form-control border-0 shadow-none" />
                </div>
                <Button id="wd-add-assignment" variant="danger" className="float-end me-2">
                    <Link href={`/Courses/${cid}/Assignments/newAssignment`} className="text-white text-decoration-none">
                        <FiPlus /> Assignment
                    </Link>
                </Button>
                <Button id="wd-add-assignment-group" variant="secondary" className="float-end me-2" onClick={() => { }}>
                    <FiPlus /> Group
                </Button>
            </div >
        );
    }
}


