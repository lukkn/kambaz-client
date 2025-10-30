"use client";

import { RxDragHandleDots2 } from "react-icons/rx";
import { FaCircleCheck } from "react-icons/fa6";
import { FiPlus, FiEdit } from "react-icons/fi";
import { IoEllipsisVertical } from "react-icons/io5";
import { BiChevronDown } from "react-icons/bi";

import { ListGroupItem, ListGroup } from "react-bootstrap";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function Assignment({ category }:
    {
        category: {
            id: number, title: string, weight: number,
            items: {
                _id: string,
                title: string,
                modules: string,
                available_from: string,
                available_until: string,
                due: string,
                points: number,
                description: string
            }[]
        }
    }) {

    const { cid } = useParams();

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
                    <ListGroupItem key={item._id} className="wd-assignment-list-item p-3 d-flex align-items-center border-bottom justify-content-between gap-3">
                        <div className="wd-assignment-item d-flex gap-3 align-items-center">
                            <RxDragHandleDots2 className="flex-shrink-0" />
                            <FiEdit stroke="#128812" className="flex-shrink-0" />
                            <Link href={`/Courses/${cid}/Assignments/${item._id}`} className="wd-assignment-link text-decoration-none text-black">
                                <b>{item.title}</b>
                                <div className="text-muted small">
                                    <span className="text-danger">{item.modules}</span> |
                                    <span> <b>Not available until</b> {formatDate(item.available_from)}</span> |
                                    <span> <b>Due</b> {formatDate(item.due)}</span> |
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

function formatDate(dateString: string) {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    };
    const formatted = date.toLocaleString("en-US", options);
    // Convert "PM"/"AM" to "pm"/"am"
    return formatted.replace(/([AP]M)/, (m) => m.toLowerCase()).replace(",", " at");
}