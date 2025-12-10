"use client";

import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { FaChevronDown } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";

export default function PazzaNavigation() {
    const { cid } = useParams();
    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);

    return (
        <div className="bg-pazza-primary text-white py-2 px-3 d-flex align-items-center gap-4">
            <div className="fs-4">pazza</div>
            <div className="fs-6">{cid}<FaChevronDown className="ms-2" /></div>
            <div className="ms-auto">
                <FaRegUserCircle className="me-2" size={25} />
                {currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Guest'}
            </div>
        </div>
    );
}