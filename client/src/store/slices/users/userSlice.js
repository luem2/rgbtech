import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: {},
};

const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		getLoggedUser : (state, action) => {
			state.user = action.payload
		}
	},
});

export const {getLoggedUser} = userSlice.actions;

export default userSlice.reducer;
