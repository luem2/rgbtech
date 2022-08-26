import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	modal: {
		login: false,
	},
	notification: {
		accountCreated: false,
		welcomeUser: false,
		errorLogin: false,
		logout: false,
		productAdded: false,
		productRemoved: false,
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
			state.notification.errorLogin = true;
		},

		setErrorLoginFalse: (state) => {
			state.notification.errorLogin = false;
		},

		setLogoutTrue: (state) => {
			state.notification.logout = true;
		},

		setLogoutFalse: (state) => {
			state.notification.logout = false;
		},

		setProductAddedTrue: (state) => {
			state.notification.productAdded = true;
		},

		setProductAddedFalse: (state) => {
			state.notification.productAdded = false;
		},

		setproductRemovedTrue: (state) => {
			state.notification.productRemoved = true;
		},

		setproductRemovedFalse: (state) => {
			state.notification.productRemoved = false;
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
	setErrorLoginTrue,
	setErrorLoginFalse,
	setLogoutTrue,
	setLogoutFalse,
	setProductAddedTrue,
	setProductAddedFalse,
	setproductRemovedTrue,
	setproductRemovedFalse,
} = componentSlice.actions;

export default componentSlice.reducer;
