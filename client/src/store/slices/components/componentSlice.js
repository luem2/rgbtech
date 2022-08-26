import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	modal: {
		login: false,
	},
	notification: {
		accountCreated: false,
		welcomeUser: false,
		errorLogin: false,
	},
};

const componentSlice = createSlice({
	name: "components",
	initialState,
	reducers: {
		setLoginTrue: (state) => {
			state.modal.login = true;
		},

		setLoginFalse: (state) => {
			state.modal.login = false;
		},

		setAccCreatedTrue: (state) => {
			state.notification.accountCreated = true;
		},

		setAccCreatedFalse: (state) => {
			state.notification.accountCreated = false;
		},

		setWelcomeUserTrue: (state) => {
			state.notification.welcomeUser = true;
		},

		setWelcomeUserFalse: (state) => {
			state.notification.welcomeUser = false;
		},

		setErrorLoginTrue: (state) => {
			state.errorLogin = true;
		},

		setErrorLoginFalse: (state) => {
			state.errorLogin = false;
		},
	},
});

export const {
	setLoginTrue,
	setLoginFalse,
	setAccCreatedTrue,
	setAccCreatedFalse,
	setWelcomeUserTrue,
	setWelcomeUserFalse,
} = componentSlice.actions;

export default componentSlice.reducer;
