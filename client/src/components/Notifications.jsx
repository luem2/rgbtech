import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	setAccCreated,
	setWelcomeUser,
	setErrorLoginBadData,
	setErrorLoginNotFound,
	setLoginIncomplete,
	setConfirmYourEmailError,
	setLogout,
	setProductAdded,
	setEmailConfirm,
} from "../store/slices/components/componentSlice";
import { ToastContainer, toast } from "react-toastify";

const Notifications = () => {
	const dispatch = useDispatch();
	const {
		accountCreated,
		welcomeUser,
		errorLoginBadData,
		errorLoginNotFound,
		loginIncomplete,
		confirmYourEmailError,
		logout,
		productAdded,
		emailConfirmated,
	} = useSelector((state) => state.components.notification);

	const accCreated = () => {
		toast.success("👨‍🚀 Account created successfully check your email! ✉️", {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: undefined,
		});
		setTimeout(() => dispatch(setAccCreated(false)), 500);
	};

	const welcomeUserFunction = () => {
		toast("Welcome User to RGBTech! 🏠", {
			position: "top-right",
			autoClose: 4000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: undefined,
		});
		setTimeout(() => dispatch(setWelcomeUser(false)), 500);
	};

	const errLoginBadDataFunction = () => {
		toast.error("The data provided its wrong! ❌", {
			position: "top-right",
			autoClose: 4000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: undefined,
		});
		setTimeout(() => dispatch(setErrorLoginBadData(false)), 500);
	};

	const errLoginAccNotFound = () => {
		toast.error("The account not found 404 ❌", {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: undefined,
		});
		setTimeout(dispatch(setErrorLoginNotFound(false)), 500);
	};

	const errLoginIncompleteFunction = () => {
		toast.error("Please, complete the fields required ❌", {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: undefined,
		});
		setTimeout(dispatch(setLoginIncomplete(false)), 500);
	};

	const errLoginEmailNotConfirmed = () => {
		toast.info("You must confirm your email to log in! ✉️", {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: undefined,
		});
		setTimeout(dispatch(setConfirmYourEmailError(false)), 500);
	};

	const logoutFunction = () => {
		toast.success("See you soon user! 🤗", {
			position: "top-right",
			autoClose: 2000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: undefined,
		});
		setTimeout(dispatch(setLogout(false)), 500);
	};

	const productAddedFunction = () => {
		toast.success("Product added successfully! ✅", {
			position: "bottom-right",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: undefined,
		});
		setTimeout(dispatch(setProductAdded(false)), 500);
	};

	const emailConfirmatedFunction = () => {
		toast.success("Email confirmed successfully! ✅", {
			position: "top-right",
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: undefined,
		});
		setTimeout(dispatch(setEmailConfirm(false)), 500);
	};
	return (
		<div>
			{accountCreated && accCreated()}
			{welcomeUser && welcomeUserFunction()}
			{errorLoginBadData && errLoginBadDataFunction()}
			{errorLoginNotFound && errLoginAccNotFound()}
			{loginIncomplete && errLoginIncompleteFunction()}
			{confirmYourEmailError && errLoginEmailNotConfirmed()}
			{logout && logoutFunction()}
			{productAdded && productAddedFunction()}
			{emailConfirmated && emailConfirmatedFunction()}
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				false
			/>
		</div>
	);
};

export default Notifications;
