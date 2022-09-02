import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user:{},
	check:[],
};

const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		getLoggedUser: (state, action) => {
			state.user.push(action.payload)
		},
		clearUser: (state) => {
			state.user = {};
		},
		checkMailGoogle: (state, action) => {
			state.check = action.payload
		},
	},
});

export const { getLoggedUser, clearUser,checkMailGoogle } = userSlice.actions;

export default userSlice.reducer;
