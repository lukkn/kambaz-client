"use client";

import { ReactNode } from "react";
import CourseNavigation from "./Navigation";
import { FaAlignJustify, FaChevronRight } from "react-icons/fa";
import { courses } from "../../Database";
import { useParams, usePathname } from "next/navigation";

export default function CoursesLayout(
    { children }: Readonly<{ children: ReactNode }>) {
    const { cid } = useParams();
    const pathname = usePathname();
    const course = courses.find((course) => course._id === cid);

    // Just in case course not found
    if (!course) {
        return <div>Course not found</div>;
    }

    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1" />
                {course?.name}  <FaChevronRight size={20} />  {pathname.split("/").pop()}
            </h2>
            <hr />
            <main className="d-flex">
                <div className="d-flex">
                    <div className="d-none d-md-block">
                        <CourseNavigation />
                    </div>
                </div>
                <div className="flex-fill">
                    {children}
                </div>
            </main>
        </div>
    );
}

