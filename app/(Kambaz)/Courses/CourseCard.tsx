import { Card, CardBody, CardImg, CardText, CardTitle, Row, Col } from "react-bootstrap";
import Link from "next/link";

export default function CourseCard({ _id, name, description, image } : { _id: string, name: string, description: string, image: string }) {
    return (

        <Col className="wd-dashboard-course" style={{ width: "270px" }}>
            <Card>
                <Link href={`/Courses/${_id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                    <CardImg variant="top" src={image} width="100%" height={160} />
                    <CardBody>
                        <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">{_id} {name}</CardTitle>
                        <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                            {description}
                        </CardText>
                    </CardBody>
                </Link>
            </Card>
        </Col>
    );
}