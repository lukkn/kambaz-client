"use client";

import { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { useParams } from "next/navigation";

import Module from "./Module";
import ModulesControls from "./ModulesControls";

import { addModule, updateModule, deleteModule, setModules } from "./reducer";
import { useSelector, useDispatch } from "react-redux";

import * as client from "../../client";
import { on } from "events";

export default function Modules() {
    const params = useParams();
    const cid = params.cid?.toString() || "";

    const { modules } = useSelector((state: any) => state.modulesReducer);
    const dispatch = useDispatch();

    const [moduleName, setModuleName] = useState("");

    const fetchModules = async () => {
        const modules = await client.findModulesForCourse(cid as string);
        dispatch(setModules(modules));
    };

    const onCreateModuleForCourse = async () => {
        if (!cid) return;
        const newModule = {
            name: moduleName,
            course: cid,
        };
        const module = await client.createModuleForCourse(cid, newModule);
        dispatch(setModules([...modules, module]));
    };

    const onRemoveModule = async (moduleId: string) => {
        await client.deleteModule(moduleId);
        dispatch(setModules(modules.filter((m: any) => m._id !== moduleId)));
    };

    const onUpdateModule = async (module: any) => {
        await client.updateModule(module);
        const newModules = modules.map((m: any) =>
            m._id === module._id ? module : m
        );
        dispatch(setModules(newModules));
    }

    useEffect(() => {
        fetchModules();
    }, [cid]);

    return (
        <div className="p-4 d-flex flex-column gap-3">
            <ModulesControls
                setModuleName={setModuleName}
                moduleName={moduleName}
                addModule={onCreateModuleForCourse}
            />

            <ListGroup id="wd-modules">
                {modules?.map((module: { _id: string; name: string; description: string; course: string; lessons: any[] }) => (
                    <Module
                        key={module._id}
                        module={module}
                        deleteModule={onRemoveModule}
                        updateModule={onUpdateModule}
                    />
                ))}
            </ListGroup>
        </div>
    );
}
