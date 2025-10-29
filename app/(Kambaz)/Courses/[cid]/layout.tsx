"use client";

import { ReactNode, useState } from "react";
import CourseNavigation from "./Navigation";
import { FaAlignJustify, FaChevronRight } from "react-icons/fa";
import { useParams, usePathname } from "next/navigation";

import { useSelector } from "react-redux";

export default function CoursesLayout(
    { children }: Readonly<{ children: ReactNode }>) {
    const pathname = usePathname();

    const { cid } = useParams();
    const { courses } = useSelector((state: any) => state.coursesReducer);
    const course = courses.find((course: any) => course._id === cid);

    const [showNav, setShowNav] = useState(true);

    // Just in case course not found
    if (!course) {
        return <div>Course not found</div>;
    }

    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1" role="button" onClick={() => setShowNav(!showNav)}/>
                {course?.name}  <FaChevronRight size={20} />  {pathname.split("/").pop()}
            </h2>
            <hr />
            <main className="d-flex">
                {showNav && (
                    <div className="d-flex">
                        <div className="d-none d-md-block">
                            <CourseNavigation />
                        </div>
                    </div>
                )}
                <div className="flex-fill">
                    {children}
                </div>
            </main>
        </div>
    );
}

