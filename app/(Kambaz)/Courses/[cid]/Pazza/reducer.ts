import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [] as any[],
    folders: [] as any[],
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
    },
});

export const { setPosts, setFolders } = pazzaSlice.actions;
export default pazzaSlice.reducer;