"use client";

import React, { useState } from "react";
import { Form, FormCheck, FormControl } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
        id: 1,
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10",
        completed: false,
        score: 0,
    })
    const [module, setModule] = useState({
        id: 2,
        name: "NodeJS Module",
        description: "Learn the basics of NodeJS and ExpressJS",
        course: "CS5610 Web Development",
    })

    const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
    const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;

    return (
        <div id="wd-working-with-objects">
            <h3>Working With Objects</h3>
            <h4>Modifying Properties</h4>
            <Form className="mb-4">
                <a id="wd-update-assignment-title"
                    className="btn btn-info float-end"
                    href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
                    Update Title </a>
                <FormControl className="w-75 mb-2" id="wd-assignment-title"
                    defaultValue={assignment.title} onChange={(e) =>
                        setAssignment({ ...assignment, title: e.target.value })} />

                <a id="wd-update-assignment-score"
                    className="btn btn-info float-end"
                    href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
                    Update Score </a>
                <FormControl className="w-75 mb-2" id="wd-assignment-score"
                    type="number"
                    defaultValue={assignment.score} onChange={(e) =>
                        setAssignment({ ...assignment, score: parseInt(e.target.value) })} />

                <a id="wd-update-assignment-completed"
                    className="btn btn-info float-end"
                    href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}>
                    Update Completed </a>
                <FormCheck className="w-75 mb-2" id="wd-assignment-completed"
                    type="checkbox"
                    label="Completed"
                    checked={assignment.completed} onChange={(e) =>
                        setAssignment({ ...assignment, completed: e.target.checked })} />
            </Form>
            <hr />

            <h4>Retrieving Objects</h4>
            <a id="wd-retrieve-assignments" className="btn btn-info"
                href={`${HTTP_SERVER}/lab5/assignment`}>
                Get Assignment
            </a><hr />

            <h4>Retrieving Properties</h4>
            <a id="wd-retrieve-assignment-title" className="btn btn-info"
                href={`${HTTP_SERVER}/lab5/assignment/title`}>
                Get Title
            </a><hr />

            <h4>Retrieving Module</h4>
            <a id="wd-retrieve-module" className="btn btn-info me-2"
                href={`${MODULE_API_URL}`}>
                Get Module
            </a>
            <a id="wd-retrieve-module-name" className="btn btn-info"
                href={`${MODULE_API_URL}/name`}>
                Get Module Name
            </a>
            <Form className="mt-3">
                <a id="wd-update-module-name"
                    className="btn btn-info float-end"
                    href={`${MODULE_API_URL}/name/${module.name}`}>
                    Update Module Name </a>
                <FormControl className="w-75" id="wd-module-name"
                    defaultValue={module.name} onChange={(e) =>
                        setModule({ ...module, name: e.target.value })} />
                <hr />
            </Form>
        </div>
    );
}

