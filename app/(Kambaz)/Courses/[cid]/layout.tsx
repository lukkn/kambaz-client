"use client";

import { ReactNode, useState, useEffect } from "react";
import CourseNavigation from "./Navigation";
import { FaAlignJustify, FaChevronRight } from "react-icons/fa";
import { useParams, usePathname } from "next/navigation";

import { useSelector, useDispatch } from "react-redux";
import { setCourses } from "../reducer";

import * as client from "../client";

export default function CoursesLayout(
    { children }: Readonly<{ children: ReactNode }>) {
    const dispatch = useDispatch();
    const pathname = usePathname();

    const { cid } = useParams();
    const { courses } = useSelector((state: any) => state.coursesReducer);
    const course = courses.find((course: any) => course._id === cid);

    const [showNav, setShowNav] = useState(true);

    const fetchCourses = async () => {
        const fetchedCourses = await client.findMyCourses();
        dispatch(setCourses(fetchedCourses));
    }

    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <div id="wd-courses">{
            !course ? <h2 className="m-4">Course not found</h2> :
                <div>
                    <h2 className="text-danger">
                        <FaAlignJustify className="me-4 fs-4 mb-1" role="button" onClick={() => setShowNav(!showNav)} />
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
        }
        </div>
    );
}

