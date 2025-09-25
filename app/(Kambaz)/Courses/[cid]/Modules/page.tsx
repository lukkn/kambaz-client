import { FiChevronDown, FiPlus } from "react-icons/fi";
import { FaCircleCheck } from "react-icons/fa6";
import Module from "./Module";
import { ListGroup } from "react-bootstrap";

export default function Modules() {
    const modules = [
        { id: 1, title: "Week 1", lessons: ["Intro to Web Development", "Setting up your environment"] },
        { id: 2, title: "Week 2", lessons: ["HTML Basics", "CSS Fundamentals"] },
        { id: 3, title: "Week 3", lessons: ["Intro to Javascript", "Understanding Variables"] },
    ];
    return (
        <div className="p-4">
            <div id="wd-modules-buttons" className="d-flex justify-content-end gap-2 py-4">
                <button className="btn btn-secondary">Collapse All</button>
                <button className="btn btn-secondary">View Progress</button>
                <button className="btn btn-secondary"><FaCircleCheck fill="green" stroke="white" /> Publish All <FiChevronDown /></button>
                <button className="btn btn-danger"><FiPlus /> Module</button>
            </div>

            <ListGroup id="wd-modules">
                {modules.map((module) => (
                    <Module key={module.id} module={module} />
                ))}
            </ListGroup>
        </div>
    );
}
