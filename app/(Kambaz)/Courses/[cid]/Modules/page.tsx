"use client";

import { useState } from "react";

import { ListGroup } from "react-bootstrap";

import Module from "./Module";
import ModulesControls from "./ModulesControls";

import { useParams } from "next/navigation";

import * as db from "../../../Database";

import { v4 as uuidv4 } from "uuid";

export default function Modules() {
    const params = useParams();
    const cid = params.cid?.toString() || "";

    const [modules, setModules] = useState(db.modules.filter((module) => module.course === cid));
    const [moduleName, setModuleName] = useState("");

    const addModule = () => {
        setModules([...modules, { _id: uuidv4(), name: moduleName, description: "", course: cid, lessons: [] }]);
        setModuleName("");
    };
    const deleteModule = (moduleId: string) => {
        setModules(modules.filter((m) => m._id !== moduleId));
    };
    const updateModule = (module: any) => {
        setModules(modules.map((m) => (m._id === module._id ? module : m)));
    };


    return (
        <div className="p-4 d-flex flex-column gap-3">
            <ModulesControls setModuleName={setModuleName} moduleName={moduleName} addModule={addModule} />

            <ListGroup id="wd-modules">
                {modules.map((module) => (
                    <Module
                        key={module._id}
                        module={module}
                        deleteModule={deleteModule}
                        updateModule={updateModule}
                    />
                ))}
            </ListGroup>
        </div>
    );
}
