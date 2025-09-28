import { Button, ListGroup } from "react-bootstrap";
import Assignment from "./Assignment";
import { IoSearch } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";

export default function Assignments() {

    const Assignments = [
        { id: 1, title: "A1", modules: "Multiple Modules", available: "May 6 at 12:00am", due: "May 13 at 11:59pm", points: 100 },
        { id: 2, title: "A2", modules: "Multiple Modules", available: "May 13 at 12:00am", due: "May 20 at 11:59pm", points: 100 },
        { id: 3, title: "A3", modules: "Multiple Modules", available: "May 20 at 12:00am", due: "May 27 at 11:59pm", points: 100 },
    ]

    const AssignmentCategories = [
        { id: 1, title: "Assignments", weight: 40, items: Assignments },
        { id: 2, title: "Quizzes", weight: 20, items: [] },
        { id: 3, title: "Exams", weight: 30, items: [] },
        { id: 4, title: "Projects", weight: 10, items: [] },
    ]

    return (
        <div id="wd-assignments" className="p-4 d-flex flex-column gap-3">
            <AssignmentsControlButtons />
            <ListGroup id="wd-assignments-list" className="mt-3">
                {
                    AssignmentCategories.map((category) => (
                        <Assignment key={category.id} category={category} />
                    ))
                }
            </ListGroup>
        </div>
    );
}

function AssignmentsControlButtons() {
    return (
        <div id="wd-assignments-controls" className="text-nowrap">
            <div className="float-start d-flex align-items-center gap-2 border px-2 rounded-3 w-25">
                <IoSearch />
                <input type="text" placeholder="Search..." className="form-control border-0 shadow-none" />
            </div>
            <Button id="wd-add-assignment" variant="danger" className="float-end me-2"><FiPlus /> Assignment</Button>
            <Button id="wd-add-assignment-group" variant="secondary" className="float-end me-2"><FiPlus /> Group</Button>
        </div>
    );
}
