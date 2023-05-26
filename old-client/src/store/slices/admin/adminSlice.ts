import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dashboard: [],
    products: [],
    tagsAndBrands: [],
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
        productsTable: (state, action) => {
            state.products = action.payload;
        },
        tagsAndBrandsTable: (state, action) => {
            state.tagsAndBrands = action.payload;
        },
    }
});
        
        


export const {
    dashboardInfo,
    usersTable,
    productsTable,
    tagsTable,
    brandsTable,
    tagsAndBrandsTable
} = adminSlice.actions;

export default adminSlice.reducer;