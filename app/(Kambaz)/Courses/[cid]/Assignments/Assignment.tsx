import { ListGroupItem, ListGroup } from "react-bootstrap";
import Link from "next/link";
import { RxDragHandleDots2 } from "react-icons/rx";
import { FaCircleCheck } from "react-icons/fa6";
import { FiPlus, FiEdit } from "react-icons/fi";
import { IoEllipsisVertical } from "react-icons/io5";
import { BiChevronDown } from "react-icons/bi";

export default function Assignment({ category }: { category: { id: number, title: string, weight: number, items: { id: number, title: string, modules: string, available: string, due: string, points: number }[] } }) {
    return (
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="p-3 bg-secondary d-flex justify-content-between align-items-center">
                <span className="wd-title d-flex gap-2 align-items-center">
                    <RxDragHandleDots2 />
                    <BiChevronDown />
                    <b>{category.title.toUpperCase()}</b>
                </span>
                <div className="d-flex gap-2 align-items-center">
                    <div className="text-muted border py-1 px-3 rounded-5 small">{category.weight}% of Total</div>
                    <FiPlus />
                    <IoEllipsisVertical />
                </div>
            </div>
            <ListGroup id="wd-assignment-list">
                {category.items.map((item) => (
                    <ListGroupItem key={item.id} className="wd-assignment-list-item p-3 d-flex align-items-center border-bottom justify-content-between gap-3">
                        <div className="wd-assignment-item d-flex gap-3 align-items-center">
                            <RxDragHandleDots2 className="flex-shrink-0" />
                            <FiEdit stroke="#128812" className="flex-shrink-0" />
                            <Link href={`/Courses/1234/Assignments/${item.id}`} className="wd-assignment-link text-decoration-none text-black">
                                <b>{item.title}</b>
                                <div className="text-muted small">
                                    <span className="text-danger">{item.modules}</span> |
                                    <span> <b>Not available until</b> {item.available}</span> |
                                    <span> <b>Due</b> {item.due}</span> |
                                    <span> {item.points} pts</span>
                                </div>
                            </Link>
                        </div>
                        <ItemControlButtons />
                    </ListGroupItem>
                ))}
            </ListGroup >
        </ListGroupItem>
    )
}


function ItemControlButtons() {
    return (
        <div className="d-flex gap-2">
            <FaCircleCheck fill="green" stroke="white" />
            <IoEllipsisVertical />
        </div>
    )
}