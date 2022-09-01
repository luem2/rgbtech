import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dashBoard: [],
    products: [],
    tags: [],
    brands: [],
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        dashboardInfo: (state, action) => {
            state.dashBoard = action.payload;
        },
    }
});

export const {
    dashboardInfo
} = adminSlice.actions;

export default adminSlice.reducer;