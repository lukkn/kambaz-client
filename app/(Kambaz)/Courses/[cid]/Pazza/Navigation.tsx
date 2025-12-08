"use client";

import { useParams } from "next/navigation";
import { FaChevronDown } from "react-icons/fa6";

export default function PazzaNavigation() { 
    const { cid } = useParams();

    return (
        <div className="bg-pazza-primary text-white py-2 px-3 d-flex align-items-center gap-4">
            <div className="fs-4">pazza</div>
            <div className="fs-6">{cid}<FaChevronDown className="ms-2" /></div>
        </div>
    );
}