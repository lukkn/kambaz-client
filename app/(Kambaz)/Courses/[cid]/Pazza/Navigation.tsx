"use client";

import { useSelector } from "react-redux";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

import { FaRegUserCircle } from "react-icons/fa";

export default function PazzaNavigation() {
    const { cid } = useParams();
    const pathname = usePathname();

    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);


    return (
        <div className="bg-pazza-primary text-white py-2 px-3 d-flex align-items-center gap-4">
            <div className="fs-4">
                <Link href={`/Courses/${cid}/Pazza`} style={{ color: 'white', textDecoration: 'none' }}>Pazza</Link>
            </div>
            <div className="fs-6 ms-4">{cid}</div>

            <div className="ms-auto me-2" role="button">
                <Link href={`/Courses/${cid}/Pazza`} style={{ color: 'white', textDecoration: pathname === `/Courses/${cid}/Pazza` ? 'underline' : 'none' }}>Q&A</Link>
            </div>
            <div className="me-2" role="button">
                <Link href={`/Courses/${cid}/Pazza/ManageClass`} style={{ color: 'white', textDecoration: pathname === `/Courses/${cid}/Pazza/ManageClass` ? 'underline' : 'none' }}>Manage Class</Link></div>
            <div className="me-2">
                <FaRegUserCircle className="me-2" size={25} />
                {currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Guest'}
            </div>
        </div>
    );
}