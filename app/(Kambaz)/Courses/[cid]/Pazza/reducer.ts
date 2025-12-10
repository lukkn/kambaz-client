import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [] as any[],
    folders: [] as any[],
    followUps: [] as any[],
};

const pazzaSlice = createSlice({
    name: "pazza",
    initialState,
    reducers: {
        setPosts: (state, { payload: posts }) => {
            state.posts = posts;
        },
        setFolders: (state, { payload: folders }) => {
            state.folders = folders;
        },
        setFollowUps: (state, { payload: followUps }) => {
            state.followUps = followUps;
        },
    },
});

export const { setPosts, setFolders, setFollowUps } = pazzaSlice.actions;
export default pazzaSlice.reducer;