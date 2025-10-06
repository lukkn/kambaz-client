"use client";

import { ListGroup } from "react-bootstrap";

import Module from "./Module";
import ModulesControls from "./ModulesControls";

import { useParams } from "next/navigation";

import * as db from "../../../Database";

export default function Modules() {
    const params = useParams();
    const cid = params.cid;

    const modules = db.modules.filter((module) => module.course === cid);
    
    return (
        <div className="p-4 d-flex flex-column gap-3">
            <ModulesControls />

            <ListGroup id="wd-modules">
                {modules.map((module) => (
                    <Module key={module._id} name={module.name} description={module.description} lessons={module.lessons} />
                ))}
            </ListGroup>
        </div>
    );
}
