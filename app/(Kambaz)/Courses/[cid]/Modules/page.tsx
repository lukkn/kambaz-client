import { FiChevronDown, FiPlus } from "react-icons/fi";
import { FaCircleCheck } from "react-icons/fa6";
import { ListGroup } from "react-bootstrap";

import Module from "./Module";
import ModulesControls from "./ModulesControls";

export default function Modules() {
    const modules = [
        { id: 1, title: "Week 1", lessons: ["Intro to Web Development", "Setting up your environment"] },
        { id: 2, title: "Week 2", lessons: ["HTML Basics", "CSS Fundamentals"] },
        { id: 3, title: "Week 3", lessons: ["Intro to Javascript", "Understanding Variables"] },
    ];
    return (
        <div className="p-4 d-flex flex-column gap-3">
            <ModulesControls />

            <ListGroup id="wd-modules">
                {modules.map((module) => (
                    <Module key={module.id} module={module} />
                ))}
            </ListGroup>
        </div>
    );
}
