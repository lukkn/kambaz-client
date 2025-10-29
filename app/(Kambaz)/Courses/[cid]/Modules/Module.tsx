import { useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { FaCircleCheck, FaTrash, FaPencil } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { IoEllipsisVertical } from "react-icons/io5";
import { RxDragHandleDots2 } from "react-icons/rx";

import { FormControl } from "react-bootstrap";

export default function Module({ module, deleteModule, updateModule }:
    {
        module: {
            _id: string;
            name: string;
            description: string;
            lessons: { _id: string; name: string; description: string; module: string; }[]
        };
        deleteModule: (id: string) => void;
        updateModule: (module: any) => void;
    }) {

    const [editing, setEditing] = useState(false);


    return (
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="p-3 bg-secondary d-flex justify-content-between align-items-center">
                <span className="wd-title d-flex gap-2 align-items-center">
                    <RxDragHandleDots2 />
                    {!editing && module.name}
                    {editing && (
                        <FormControl className="w-50 d-inline-block"
                            onChange={(e) => updateModule({ ...module, name: e.target.value })}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    updateModule(module);
                                    setEditing(false);
                                }
                            }}
                            defaultValue={module.name} />
                    )}
                </span>
                <ModuleControlButtons/>
            </div>

            <ListGroup className="wd-lessons rounded-0">
                {module?.lessons?.map((lesson) => (
                    <ListGroupItem className="wd-lesson p-3 d-flex justify-content-between align-items-center" key={lesson._id}>
                        <span><RxDragHandleDots2 /> {lesson.name}</span>
                        <LessonControlButtons />
                    </ListGroupItem>
                )) || null}
            </ListGroup>
        </ListGroupItem>
    );


    function ModuleControlButtons() {
        return (
            <div className="d-flex gap-2">
                <FaPencil className="me-1 text-info" role="button" onClick={() => setEditing(true)} />
                <FaTrash className="me-1 text-danger" role="button" onClick={() => deleteModule(module._id)} />
                <FaCircleCheck fill="green" stroke="white" />
                <FiPlus />
                <IoEllipsisVertical />
            </div>
        )
    }

    function LessonControlButtons() {
        return (
            <div className="d-flex gap-2">
                <FaCircleCheck fill="green" stroke="white" />
                <IoEllipsisVertical />
            </div>
        )
    }
}
