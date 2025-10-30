import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
    assignments: assignments,
};
const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        addAssignment: (state, { payload: assignment }) => {
            console.log("Adding assignment:", assignment);
            const newAssignment: any = {
                _id: uuidv4(),
                title: assignment.title,
                course: assignment.course,
                modules: assignment.modules,
                available_from: assignment.available_from,
                available_until: assignment.available_until,
                due: assignment.due,
                points: assignment.points,
                description: assignment.description,
            };
            state.assignments = [...state.assignments, newAssignment] as any;
        },
        deleteAssignment: (state, { payload: assignmentId }) => {
            state.assignments = state.assignments.filter(
                (m: any) => m._id !== assignmentId);
        },
        updateAssignment: (state, { payload: { assignmentId, assignment } }) => {
            console.log("Updating assignment:", assignmentId, assignment);
            state.assignments = state.assignments.map((m: any) =>
                m._id === assignmentId ? { ...m, ...assignment } : m
            ) as any;
            console.log("Updated assignments:", state.assignments);
        },
        editAssignment: (state, { payload: assignmentId }) => {
            state.assignments = state.assignments.map((m: any) =>
                m._id === assignmentId ? { ...m, editing: true } : m
            ) as any;
        },
    },
});
export const { addAssignment, deleteAssignment, updateAssignment, editAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;