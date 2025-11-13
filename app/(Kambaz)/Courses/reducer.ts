import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

// Single source of truth: keep courses and enrollments in ONE slice
const initialState = {
  courses: [],
  enrollments: [],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addNewCourse: (state, { payload: { course, user } }) => {
      const newCourse = { ...course, _id: uuidv4() };
      state.courses = [...state.courses, newCourse] as any;
    },
    deleteCourse: (state, { payload: courseId }) => {
      state.courses = state.courses.filter((course: any) => course._id !== courseId);
    },
    updateCourse: (state, { payload: course }) => {
      state.courses = state.courses.map((c: any) => (c._id === course._id ? course : c)) as any;
    },
    setCourses: (state, { payload: courses }) => {
      state.courses = courses;
    },
    enroll: (state, { payload: { course, user } }) => {
      const already = state.enrollments.some(
        (e: any) => e.course === course && e.user === user
      );
      if (!already) {
        const enrollment = { _id: uuidv4(), course, user };
        state.enrollments.push(enrollment as any);
      }
    },
    unenroll: (state, { payload: { course, user } }) => {
      state.enrollments = state.enrollments.filter(
        (enrollment: any) => enrollment.course !== course || enrollment.user !== user
      );
    },
  },
});

export const { addNewCourse, deleteCourse, updateCourse, setCourses, enroll, unenroll } =
  coursesSlice.actions;
export default coursesSlice.reducer;