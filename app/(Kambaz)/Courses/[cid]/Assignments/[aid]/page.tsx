"use client";

import { Button, Form, FormLabel, FormControl, FormSelect, FormCheck, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";

import { useParams } from "next/navigation";
import Link from "next/link";

import { addAssignment, updateAssignment, setAssignments } from "../reducer";
import { useDispatch, useSelector } from "react-redux";

import * as client from "../../../client";

export default function AssignmentEditor() {
    const dispatch = useDispatch();

    const { cid, aid } = useParams();
    const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);
    const assignment = assignments.find((assignment: any) => assignment._id === aid && assignment.course === cid);

    const [title, setTitle] = useState(assignment?.title || "");
    const [description, setDescription] = useState(assignment?.description || "");
    const [points, setPoints] = useState(assignment?.points || 0);
    const [due, setDue] = useState(assignment?.due || "");
    const [availableFrom, setAvailableFrom] = useState(assignment?.available_from || "");
    const [availableUntil, setAvailableUntil] = useState(assignment?.available_until || "");

    
    const onAddAssignment = async (newAssignment: any) => {
        if (!cid) return;
        await client.createAssignment(cid as string, newAssignment);
    }

    const onUpdateAssignment = async (assignment: any) => {
        await client.updateAssignment(aid as string, assignment);
        const newAssignments = assignments.map((a: any) =>
            a._id === aid ? assignment : a
        );
    }

    return (
        <div id="wd-assignments-editor">
            <Form className="p-4">
                <Container>
                    <Row><Col><FormLabel htmlFor="wd-name">Assignment Name</FormLabel></Col></Row>
                    <Row className="mb-4"><Col><FormControl id="wd-name" type="text" placeholder="Enter assignment name" value={title} onChange={(e) => setTitle(e.target.value)} /></Col></Row>

                    <Row className="mb-4"><Col><FormControl id="wd-description" as="textarea" rows={5} placeholder="Enter assignment description" value={description} onChange={(e) => setDescription(e.target.value)} /></Col></Row>

                    <Row className="mb-4">
                        <Col xs={2} className="text-end pt-1"><FormLabel htmlFor="wd-points">Points</FormLabel></Col>
                        <Col><FormControl id="wd-points" type="number" placeholder="Enter assignment points" value={points} onChange={(e) => setPoints(Number(e.target.value))} /></Col>
                    </Row>

                    <Row className="mb-4">
                        <Col xs={2} className="text-end pt-1"><FormLabel htmlFor="wd-group">Group</FormLabel></Col>
                        <Col><FormSelect id="wd-group" value="assignments" onChange={() => { }}>
                            <option value="assignments">ASSIGNMENTS</option>
                            <option value="quizzes">QUIZZES</option>
                            <option value="exams">EXAMS</option>
                            <option value="projects">PROJECTS</option>
                        </FormSelect>
                        </Col>
                    </Row>

                    <Row className="mb-4">
                        <Col xs={2} className="text-end pt-1"><FormLabel htmlFor="wd-display-grade-as">Display Grade as</FormLabel></Col>
                        <Col><FormSelect id="wd-display-grade-as">
                            <option value="percentage">Percentage</option>
                            <option value="points">Points</option>
                        </FormSelect></Col>
                    </Row>

                    <Row className="mb-4">
                        <Col xs={2} className="text-end pt-1"><FormLabel htmlFor="wd-submission-type">Submission Type</FormLabel></Col>
                        <Col>
                            <div className="border rounded p-3 d-flex flex-column gap-4">
                                <FormSelect id="wd-submission-type">
                                    <option value="online">Online</option>
                                    <option value="on-paper">On Paper</option>
                                    <option value="external-tool">External Tool</option>
                                    <option value="no-submission">No Submission</option>
                                </FormSelect>

                                <div className="d-flex flex-column gap-2">
                                    <FormLabel htmlFor="wd-online-entry-options" className="fw-bold">Online Entry Options</FormLabel>
                                    <FormCheck id="wd-online-entry-options-text" type="checkbox" label="Text Entry" />
                                    <FormCheck id="wd-online-entry-options-url" type="checkbox" label="Website URL" />
                                    <FormCheck id="wd-online-entry-options-media" type="checkbox" label="Media Recording" />
                                    <FormCheck id="wd-online-entry-options-student-annotation" type="checkbox" label="Student Annotation" />
                                    <FormCheck id="wd-online-entry-options-file" type="checkbox" label="File Upload" />
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row className="mb-4">
                        <Col xs={2} className="text-end pt-1">Assign</Col>
                        <Col>
                            <div className="border rounded p-3 d-flex flex-column gap-3">
                                <div>
                                    <FormLabel htmlFor="wd-assign-to" className="fw-bold">Assign To</FormLabel>
                                    <FormSelect id="wd-assign-to">
                                        <option value="everyone">Everyone</option>
                                        <option value="section-1">Section 1</option>
                                        <option value="section-2">Section 2</option>
                                    </FormSelect>
                                </div>
                                <div>
                                    <FormLabel htmlFor="wd-due" className="fw-bold">Due</FormLabel>
                                    <FormControl id="wd-due" type="datetime-local" value={due} onChange={(e) => setDue(e.target.value)} />
                                </div>
                                <div className="d-flex gap-2">
                                    <div className="flex-grow-1">
                                        <FormLabel htmlFor="wd-available-from" className="fw-bold">Available From</FormLabel>
                                        <FormControl id="wd-available-from" type="datetime-local" value={availableFrom} onChange={(e) => setAvailableFrom(e.target.value)} />
                                    </div>
                                    <div className="flex-grow-1">
                                        <FormLabel htmlFor="wd-available-until" className="fw-bold">Until</FormLabel>
                                        <FormControl
                                            id="wd-available-until"
                                            type="datetime-local"
                                            value={availableUntil}
                                            onChange={(e) => setAvailableUntil(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <div className="d-flex justify-content-end">
                        <Button variant="secondary" type="submit" className="me-2">
                            <Link href={`/Courses/${cid}/Assignments`} className="text-black text-decoration-none">Cancel</Link>
                        </Button>

                        <Link href={`/Courses/${cid}/Assignments`} className="text-white text-decoration-none">
                            <Button variant="danger" type="submit" onClick={() => {
                                const newAssignment = {
                                    title: title,
                                    course: cid,
                                    modules: "Multiple Modules",
                                    available_from: availableFrom,
                                    available_until: availableUntil,
                                    due: due,
                                    points: points,
                                    description: description,
                                };
                                if (aid === "newAssignment") {
                                    onAddAssignment(newAssignment);
                                } else {
                                    console.log("Dispatching update for assignment ID:", aid);
                                    const updatedAssignment = { _id: aid, ...newAssignment};
                                    onUpdateAssignment(updatedAssignment);
                                }
                            }}>
                                Save
                            </Button>
                        </Link>
                    </div>
                </Container>
            </Form>
        </div>
    );
}