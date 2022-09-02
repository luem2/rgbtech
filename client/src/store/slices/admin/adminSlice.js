import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dashboard: [],
    products: [],
    tags: [],
    brands: [],
    users: [],
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        dashboardInfo: (state, action) => {
            state.dashboard = action.payload;
        },
        usersTable: (state, action) => {
            state.users = action.payload;
        },

    }
});

export const {
    dashboardInfo,
    usersTable
} = adminSlice.actions;

export default adminSlice.reducer;