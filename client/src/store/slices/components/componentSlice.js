import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	modal: {
		login: false,
	},
	notification: {
		accountCreated: false,
		welcomeUser: false,
		errorLoginBadData: false,
		errorLoginNotFound: false,
		confirmYourEmailError: false,
		loginIncomplete: false,
		logout: false,
		productAdded: false,
		productRemoved: false,
		emailConfirm: false,
		cartCleaned: false,
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

		setErrorLoginBadData: (state, action) => {
			state.notification.errorLoginBadData = action.payload;
		},

		setErrorLoginNotFound: (state, action) => {
			state.notification.errorLoginNotFound = action.payload;
		},

		setConfirmYourEmailError: (state, action) => {
			state.notification.confirmYourEmailError = action.payload;
		},

		setLoginIncomplete: (state, action) => {
			state.notification.loginIncomplete = action.payload;
		},

		setLogout: (state, action) => {
			state.notification.logout = action.payload;
		},

		setProductAdded: (state, action) => {
			state.notification.productAdded = action.payload;
		},

		setCartCleaned: (state, action) => {
			state.notification.cartCleaned = action.payload;
		},

		setproductRemoved: (state, action) => {
			state.notification.productRemoved = action.payload;
		},

		setEmailConfirm: (state, action) => {
			state.notification.emailConfirm = action.payload;
		},
	},
});

export const {
	setLogin,
	setAccCreated,
	setWelcomeUser,
	setErrorLoginBadData,
	setErrorLoginNotFound,
	setConfirmYourEmailError,
	setLoginIncomplete,
	setLogout,
	setProductAdded,
	setCartCleaned,
	setproductRemoved,
	setEmailConfirm,
} = componentSlice.actions;

export default componentSlice.reducer;
