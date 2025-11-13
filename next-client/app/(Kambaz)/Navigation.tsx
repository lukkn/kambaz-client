"use client";

import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaRegCircleUser } from "react-icons/fa6";
import { FiInbox } from "react-icons/fi";

import { ListGroup, ListGroupItem } from "react-bootstrap";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function KambazNavigation() {
    const pathname = usePathname();
    const links = [
        { label: "Dashboard", path: "/Dashboard", icon: <AiOutlineDashboard className="fs-1 text-danger" /> },
        { label: "Courses", path: "/Courses", icon: <LiaBookSolid className="fs-1 text-danger" /> },
        { label: "Calendar", path: "/Calendar", icon: <IoCalendarOutline className="fs-1 text-danger" /> },
        { label: "Inbox", path: "/Inbox", icon: <FiInbox className="fs-1 text-danger" /> },
        { label: "Labs", path: "/Labs", icon: <LiaCogSolid className="fs-1 text-danger" /> },
    ]
    return (
        <ListGroup className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-flex gap-2 bg-black z-2" style={{ width: 110 }}
            id="wd-kambaz-navigation">
            <ListGroupItem className="bg-black border-0 text-center py-4" as="a"
                target="_blank" href="https://www.northeastern.edu/" id="wd-neu-link">
                <img src="/images/NEU.svg" width="75px" alt="Northeastern University" />
            </ListGroupItem>

            <ListGroupItem className="border-0 bg-black text-center">
                <Link href="/Account" id="wd-account-link" className="text-white text-decoration-none d-flex flex-column align-items-center">
                    <FaRegCircleUser className="fs-1 text-white" />
                    Account
                </Link>
            </ListGroupItem>
            {links.map((link) => (
                <ListGroupItem
                    key={link.path}
                    className={`border-0 bg-black text-center ${pathname.includes(link.label) ? "bg-white" : ""}`}
                >
                    <Link
                        href={link.path}
                        id={`wd-${link.label.toLowerCase()}-link`}
                        className={`text-decoration-none d-flex flex-column align-items-center ${pathname.includes(link.label) ? "text-danger" : "text-white"}`}
                    >
                        {link.icon}
                        {link.label}
                    </Link>
                </ListGroupItem>
            ))}
        </ListGroup>
    );
}

