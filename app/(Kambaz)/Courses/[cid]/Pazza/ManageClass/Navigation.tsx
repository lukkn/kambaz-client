"use client";

import { Nav, NavItem, NavLink } from "react-bootstrap";
import { useParams, usePathname } from "next/navigation";

export default function ManageClassNavigation() {
    const { cid } = useParams();
    const pathname = usePathname();

    return (
        <Nav className="bg-pazza-light d-flex justify-content-center gap-2" style={{ textDecoration: 'none' }}>
            <NavLink
                href={`/Courses/${cid}/Pazza/ManageClass/GeneralSettings`}
                className={`text-black fw-bolder py-3 ${pathname.includes("/Pazza/ManageClass/GeneralSettings") ? "bg-white" : ""}`}>
                General Settings
            </NavLink>


            <NavLink
                href={`/Courses/${cid}/Pazza/ManageClass/ManageFolders`}
                className={`text-black fw-bolder py-3 ${pathname.includes("/Pazza/ManageClass/ManageFolders") ? "bg-white" : ""}`}>
                Manage Folders
            </NavLink>

        </Nav>
    )
}