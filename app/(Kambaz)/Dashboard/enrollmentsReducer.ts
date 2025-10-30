import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
    enrollments: enrollments,
};

const enrollmentsSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        enroll(state, { payload: { course, user } }) {
            console.log("Enrolling", course, user);
            const enrollment = { _id: uuidv4(), course, user };
            state.enrollments.push(enrollment as any);
        },
        unenroll(state, { payload: { course, user } }) {
            console.log("Unenrolling", course, user);
            state.enrollments = state.enrollments.filter(
                (enrollment: any) => enrollment.course !== course || enrollment.user !== user
            );
        },
    },
});

export const { enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;