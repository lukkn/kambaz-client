"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, updateCourse, setCourses } from "../Courses/reducer";

import CourseCard from "../Courses/CourseCard";
import { Button, Form, FormControl, Row } from "react-bootstrap";

import * as client from "../Courses/client";

export default function Dashboard() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const { courses } = useSelector((state: any) => state.coursesReducer);
  const dispatch = useDispatch();

  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "XX101",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/default-placeholder.png",
    description: "New Description",
  });

  const [showAllCourses, setShowAllCourses] = useState(false);

  const fetchUserCourses = async () => {
    try {
      const courses = await client.findMyCourses();
      dispatch(setCourses(courses));
    } catch (error) {
      console.error(error);
    }
  };

  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };

  const onDeleteCourse = async (courseId: string) => {
    const status = await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((course: any) => course._id !== courseId)));
  };

  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(setCourses(courses.map((c: any) => (c._id === course._id ? course : c))));
  };


  useEffect(() => {
    fetchUserCourses();
  }, [currentUser]);


  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <main className="px-4 py-2">
        <Enrollments onToggle={() => setShowAllCourses(!showAllCourses)} />
        {showAllCourses && (
          <AllCourses
            setCourse={setCourse}
            userCourses={courses}
          />
        )}

        {currentUser?.role === "FACULTY"
          && (
            <NewCourse
              course={course}
              setCourse={setCourse}
              onAdd={onAddNewCourse}
              onUpdate={onUpdateCourse}
            />
          )}

        <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
        <div id="wd-dashboard-courses">
          <Row xs={1} md={5} className="g-4 width-100">
            {courses.map((course: any) => (
              <CourseCard
                key={course._id}
                course={course}
                setCourse={setCourse}
                deleteCourse={onDeleteCourse} />
            ))}
          </Row>
        </div>
      </main>
    </div >
  );

}

type CourseType = any;

function NewCourse({
  course,
  setCourse,
  onAdd,
  onUpdate,
}: {
  course: CourseType;
  setCourse: (c: CourseType) => void;
  onAdd: () => void;
  onUpdate: () => void;
}) {
  return (
    <div>
      <h5 className="mb-4">
        New Course
        <Button
          id="wd-add-new-course-click"
          className="btn btn-info float-end"
          onClick={onAdd}>
          Add
        </Button>
        <Button
          id="wd-update-course-click"
          className="btn btn-warning float-end me-2"
          onClick={onUpdate}>
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
  );
}

function Enrollments({ onToggle }: { onToggle: () => void }) {
  return (
    <div className="mb-4 d-flex justify-content-end align-items-center">
      <Button className="btn btn-info" onClick={onToggle}>Enrollments</Button>
    </div>
  );
}

function AllCourses({ setCourse, userCourses }: { setCourse: (c: CourseType) => void; userCourses: CourseType[] }) {
  
  const [courses, setCourses] = useState<CourseType[]>([]);

  const fetchAllCourses = async () => {
    try {
      const courses = await client.fetchAllCourses();
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };

    useEffect(() => {
    fetchAllCourses();
  }, []);

  return (
    <div className="mb-4">
      <div id="wd-dashboard-courses">
        <h2 id="wd-dashboard-published">All Courses ({courses.length})</h2> <hr />
        <Row xs={1} md={5} className="g-4 width-100">
          {courses ?
          courses.map((course: any) => (
            <CourseCard
              key={course._id}
              course={course}
              setCourse={setCourse}
              showEnrollments
              enrolled={userCourses.some((c) => c._id === course._id)}
               />
          )) : <p>Loading...</p>}
        </Row>
      </div>
    </div>
  );
}

