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
		setLogin: (state, action) => {
			state.modal.login = action.payload;
		},

		setAccCreated: (state, action) => {
			state.notification.accountCreated = action.payload;
		},

		setWelcomeUser: (state, action) => {
			state.notification.welcomeUser = action.payload;
		},

		setErrorLogin: (state, action) => {
			state.notification.errorLogin = action.payload;
		},

		setLogout: (state, action) => {
			state.notification.logout = action.payload;
		},

		setProductAdded: (state, action) => {
			state.notification.productAdded = action.payload;
		},

		setproductRemoved: (state, action) => {
			state.notification.productRemoved = action.payload;
		},
	},
});

export const {
	setLogin,
	setAccCreated,
	setWelcomeUser,
	setErrorLogin,
	setLogout,
	setProductAdded,
	setproductRemoved,
} = componentSlice.actions;

export default componentSlice.reducer;
