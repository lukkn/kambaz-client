import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaRegCircleUser } from "react-icons/fa6";
import { FiInbox } from "react-icons/fi";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";

export default function KambazNavigation() {
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

            <ListGroupItem className="border-0 bg-white text-center">
                <Link href="/Dashboard" id="wd-dashboard-link" className="text-danger text-decoration-none d-flex flex-column align-items-center">
                    <AiOutlineDashboard className="fs-1 text-danger" />
                    Dashboard
                </Link>
            </ListGroupItem>

            <ListGroupItem className="border-0 bg-black text-center">
                <Link href="/Dashboard" id="wd-course-link" className="text-white text-decoration-none d-flex flex-column align-items-center">
                    <LiaBookSolid className="fs-1 text-danger" />
                    Courses
                </Link>
            </ListGroupItem>

            <ListGroupItem className="border-0 bg-black text-center">
                <Link href="/Calendar" id="wd-calendar-link" className="text-white text-decoration-none d-flex flex-column align-items-center">
                    <IoCalendarOutline className="fs-1 text-danger" />
                    Calendar
                </Link>
            </ListGroupItem>

            <ListGroupItem className="border-0 bg-black text-center">
                <Link href="/Inbox" id="wd-inbox-link" className="text-white text-decoration-none  d-flex flex-column align-items-center">
                    <FiInbox className="fs-1 text-danger" />
                    Inbox
                </Link>
            </ListGroupItem>

            <ListGroupItem className="border-0 bg-black text-center">
                <Link href="/Labs" id="wd-labs-link" className="text-white text-decoration-none  d-flex flex-column align-items-center">
                    <LiaCogSolid className="fs-1 text-danger" />
                    Labs
                </Link>
            </ListGroupItem>

        </ListGroup>
    );
}