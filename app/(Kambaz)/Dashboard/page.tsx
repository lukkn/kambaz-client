"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, updateCourse } from "../Courses/reducer";

import CourseCard from "../Courses/CourseCard";
import { Button, Form, FormControl, Row } from "react-bootstrap";

export default function Dashboard() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);

  const { courses } = useSelector((state: any) => state.coursesReducer);
  const dispatch = useDispatch();

  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "XX101",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const filteredCourses = courses.filter((course: any) =>
    enrollments.some(
      (enrollment: any) =>
        enrollment.user === currentUser?._id &&
        enrollment.course === course._id
    ))

  const [showAllCourses, setShowAllCourses] = useState(false);

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <main className="px-4 py-2">
        {currentUser?.role === "FACULTY" ? <NewCourse /> : <Enrollments />}
        {showAllCourses && <AllCourses />}
        <h2 id="wd-dashboard-published">Published Courses ({filteredCourses.length})</h2> <hr />
        <div id="wd-dashboard-courses">
          <Row xs={1} md={5} className="g-4 width-100">
            {filteredCourses.map((course: any) => (
              <CourseCard
                key={course._id}
                course={course}
                setCourse={setCourse} />
            ))}
          </Row>
        </div>
      </main>
    </div >
  );

  function NewCourse() {
    return (
      <div>
        <h5 className="mb-4">
          New Course
          <Button
            id="wd-add-new-course-click"
            className="btn btn-info float-end"
            onClick={() => dispatch(addNewCourse(course))}>
            Add
          </Button>
          <Button
            id="wd-update-course-click"
            className="btn btn-warning float-end me-2"
            onClick={() => dispatch(updateCourse(course))}>
            Update
          </Button>
          <br />
        </h5>

        <Form className="mb-4">
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })} />
          <FormControl
            value={course.description}
            as="textarea"
            rows={3}
            onChange={(e) => setCourse({ ...course, description: e.target.value })} />
        </Form>
      </div>
    )
  }

  function Enrollments() {
    return (
      <div className="mb-4 d-flex justify-content-end align-items-center">
        <Button className="btn btn-info" onClick={() => setShowAllCourses(!showAllCourses)}>Enrollments</Button>
      </div>
    )
  }

  function AllCourses() {
    return (
      <div className="mb-4">
        <div id="wd-dashboard-courses">
          <h2 id="wd-dashboard-published">All Courses ({courses.length})</h2> <hr />
          <Row xs={1} md={5} className="g-4 width-100">
            {courses.map((course: any) => (
              <CourseCard
                key={course._id}
                course={course}
                setCourse={setCourse}
                showEnrollments />
            ))}
          </Row>
        </div>
      </div>
    )
  }

}

