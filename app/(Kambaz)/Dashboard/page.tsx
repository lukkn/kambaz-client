import CourseCard from "../Courses/CourseCard";
import { Row } from "react-bootstrap";

import * as db from "../Database";

export default function Dashboard() {

  const courses = db.courses;

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <main className="px-4 py-2">
        <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
        <div id="wd-dashboard-courses">
          <Row xs={1} md={5} className="g-4 width-100">
            {courses.map((course) => (
              <CourseCard key={course._id} _id={course._id} name={course.name} description={course.description} image={course.image} />
            ))}
          </Row>
        </div>
      </main>
    </div >
  );
}
