import { useState } from "react";

import { Card, CardBody, CardImg, CardText, CardTitle, Row, Col, Button } from "react-bootstrap";
import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";
import { setCourses, deleteCourse, enroll, unenroll } from "../Courses/reducer";
import * as client from "../Courses/client";

export default function CourseCard(
    { course, showEnrollments = false, enrolled, setCourse, deleteCourse }:
        {
            course: {
                _id: string,
                name: string,
                number: string,
                startDate: string,
                endDate: string,
                department?: string,
                description: string,
                image: string,
                author?: string
            }
            showEnrollments?: boolean,
            enrolled?: boolean,
            setCourse: (course: any) => any,
            deleteCourse?: (id: string) => any
        }) {

    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    return (
        <Col className="wd-dashboard-course" style={{ width: "270px" }}>
            <Card>
                <Link href={`/Courses/${course._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                    <CardImg variant="top" src={course.image} width="100%" height={160} />
                    <CardBody>
                        <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden text-black">{course.number} {course.name}</CardTitle>
                        <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                            {course.description}
                        </CardText>
                    </CardBody>
                </Link>
                {showEnrollments ? <EnrollmentButtons /> : (currentUser?.role === "FACULTY" && <EditButtons />)}
            </Card>
        </Col>
    );

    function EditButtons() {
        return (

            <div className="d-flex justify-content-end gap-2 p-2 mb-2 me-2">
                <Button id="wd-edit-course-click"
                    onClick={(event) => {
                        event.preventDefault();
                        setCourse(course);
                    }}
                    className="btn btn-warning float-end" >
                    Edit
                </Button>
                {deleteCourse && (
                    <Button onClick={(event) => {
                        event.preventDefault();
                        deleteCourse(course._id);
                    }} className="btn btn-danger"
                        id="wd-delete-course-click">
                        Delete
                    </Button>
                )}
            </div>
        )
    }

    function EnrollmentButtons() {
        const [loading, setLoading] = useState(false);
        return (
            <div className="d-flex justify-content-end gap-2 p-2 mb-2 me-2">
                <Button id="wd-enroll-course-click"
                    onClick={async (event) => {
                        event.preventDefault();
                        setLoading(true);
                        if (enrolled) {
                            await client.unenrollFromCourse(course._id);
                            dispatch(setCourses(await client.findMyCourses()));
                        } else {
                            await client.enrollInCourse(course._id);
                            dispatch(setCourses(await client.findMyCourses()));
                        }
                        setLoading(false);
                    }}
                    className={`btn ${enrolled ? "btn-danger" : "btn-success"} float-end`}>
                    {loading ? "Loading..." : (enrolled ? "Unenroll" : "Enroll")}
                </Button>
            </div>
        )
    }
}