import { AiOutlineHome, AiOutlineStop } from "react-icons/ai";
import { FaChartSimple, FaCircleCheck, FaRegBell } from "react-icons/fa6";
import { GrAnnounce } from "react-icons/gr";
import { LuImport } from "react-icons/lu";
import { TbFileImport } from "react-icons/tb"
import { Button } from "react-bootstrap";

export default function CourseStatus() {
    return (
        <div id="wd-course-status" className="d-flex flex-column gap-2 py-4">
            <h3>Course Status</h3>
            <div className="d-flex gap-2 mb-2">
                <Button variant="secondary" className="d-flex gap-2 align-items-center"><AiOutlineStop/> Unpublish</Button>
                <Button variant="success" className="d-flex gap-2 align-items-center"><FaCircleCheck /> Publish</Button>
            </div>
            <StatusButton icon={<LuImport />} text="Import Existing Content" />
            <StatusButton icon={<TbFileImport />} text="Import from Commons" />
            <StatusButton icon={<AiOutlineHome />} text="Choose Home Page" />
            <StatusButton icon={<FaChartSimple />} text="View Course Stream" />
            <StatusButton icon={<GrAnnounce />} text="New Announcement" />
            <StatusButton icon={<FaChartSimple />} text="New Analytics" />
            <StatusButton icon={<FaRegBell />} text="View Course Notifications" />
        </div>);
}

interface StatusButtonProps {
    icon: React.ReactNode;
    text: string;
}

function StatusButton({ icon, text }: StatusButtonProps) {
    return (
        <Button variant="secondary" className="d-flex justify-content-start align-items-center gap-2 overflow-hidden text-truncate">
            {icon} {text}
        </Button>
    )
}