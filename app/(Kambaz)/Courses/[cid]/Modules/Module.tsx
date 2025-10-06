import { ListGroup, ListGroupItem } from "react-bootstrap";
import { FaCircleCheck } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { IoEllipsisVertical } from "react-icons/io5";
import { RxDragHandleDots2 } from "react-icons/rx";

export default function Module({ name, description, lessons } : { name: string; description: string; lessons: { _id: string; name: string; description: string; module: string; }[] }) {
    
    return (
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="p-3 bg-secondary d-flex justify-content-between align-items-center">
                <span className="wd-title d-flex gap-2 align-items-center"><RxDragHandleDots2 /> {name}</span>
                <ModuleControlButtons />
            </div>
            
            <ListGroup className="wd-lessons rounded-0">
                {lessons?.map((lesson) => (
                    <ListGroupItem className="wd-lesson p-3 d-flex justify-content-between align-items-center" key={lesson._id}>
                        <span><RxDragHandleDots2 /> {lesson.name}</span>
                        <LessonControlButtons />
                    </ListGroupItem>
                )) || null}
            </ListGroup>
        </ListGroupItem>
    );
}

function ModuleControlButtons() {
    return (
        <div className="d-flex gap-2">
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