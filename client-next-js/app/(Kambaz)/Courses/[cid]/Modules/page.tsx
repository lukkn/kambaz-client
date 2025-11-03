"use client";

import { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { useParams } from "next/navigation";

import Module from "./Module";
import ModulesControls from "./ModulesControls";

import { addModule, updateModule, deleteModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";


export default function Modules() {
    const params = useParams();
    const cid = params.cid?.toString() || "";

    const { modules } = useSelector((state: any) => state.modulesReducer);
    const dispatch = useDispatch();

    const filteredModules = modules?.filter((module: any) => module.course === cid);

    const [moduleName, setModuleName] = useState("");

    return (
        <div className="p-4 d-flex flex-column gap-3">
            <ModulesControls
                setModuleName={setModuleName}
                moduleName={moduleName}
                addModule={() => {
                    dispatch(addModule({ name: moduleName, course: cid }));
                    setModuleName("");
                }}
            />

            <ListGroup id="wd-modules">
                {filteredModules?.map((module: { _id: string; name: string; description: string; course: string; lessons: any[] }) => (
                    <Module
                        key={module._id}
                        module={module}
                        deleteModule={(id: string) => dispatch(deleteModule(id))}
                        updateModule={(id: string) => dispatch(updateModule(id))}
                    />
                ))}
            </ListGroup>
        </div>
    );
}
