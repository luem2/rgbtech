import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	products: [],
	tags: [],
	brands: [],
};

const adminSlice = createSlice ({
    name: "admin",
	initialState,
	reducers: {
        
    }
})