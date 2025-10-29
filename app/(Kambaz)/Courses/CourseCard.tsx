import { Card, CardBody, CardImg, CardText, CardTitle, Row, Col, Button } from "react-bootstrap";
import Link from "next/link";

export default function CourseCard(
    { course, deleteCourse, setCourse }:
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
            deleteCourse: (courseId: string) => any,
            setCourse: (course: any) => any
        }) {

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
                <div className="d-flex justify-content-end gap-2 p-2 mb-2 me-2">
                    <Button id="wd-edit-course-click"
                        onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                        }}
                        className="btn btn-warning float-end" >
                        Edit
                    </Button>
                    <Button onClick={(event) => {
                        event.preventDefault();
                        deleteCourse(course._id);
                    }} className="btn btn-danger"
                        id="wd-delete-course-click">
                        Delete
                    </Button>

                </div>
            </Card>
        </Col>
    );
}