import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: {},
	modifyUserModal: false,
};

const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		getLoggedUser: (state, action) => {
			state.user = action.payload;
			window.localStorage.setItem("user", JSON.stringify(action.payload));
		},

		clearUser: (state) => {
			state.user = {};
		},

		modifyProfile: (state, action) => {
			state.modifyUserModal = action.payload;
		},
	},
});

export const { getLoggedUser, clearUser, modifyProfile } = userSlice.actions;

export default userSlice.reducer;
