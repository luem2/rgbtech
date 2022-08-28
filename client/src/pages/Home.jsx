import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../store/slices/products/thunks.js";
import Carousel from "../components/Carousel.jsx";
import Header from "../components/Header/Header.jsx";
import CategoriesCarousel from "../components/CategoriesSection/CategoriesSection.jsx";
import Footer from "../components/Footer.jsx";
import { ToastContainer, toast } from "react-toastify";
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
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
	const dispatch = useDispatch();
	const { products } = useSelector((state) => state.products);
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
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
		dispatch(setAccCreated(false));
	};

	const welcomeUserFunction = () => {
		toast("Welcome User to RGBTech! 🏠", {
			position: "top-right",
			autoClose: 4000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
		dispatch(setWelcomeUser(false));
	};

	const errLoginBadDataFunction = () => {
		toast.error("The data provided its wrong! ❌", {
			position: "top-right",
			autoClose: 4000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
		dispatch(setErrorLoginBadData(false));
	};

	const errLoginAccNotFound = () => {
		toast.error("The account not found 404 ❌", {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
		//no existe el usuario
		dispatch(setErrorLoginNotFound(false));
	};

	const errLoginIncompleteFunction = () => {
		toast.error("Please, complete the fields required ❌", {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
		// el usuario puso datos erroneos
		dispatch(setLoginIncomplete(false));
	};

	const errLoginEmailNotConfirmed = () => {
		toast.info("You must confirm your email to log in! ✉️", {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
		dispatch(setConfirmYourEmailError(false));
	};

	const logoutFunction = () => {
		toast.success("See you soon user! 🤗", {
			position: "top-right",
			autoClose: 2000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
		dispatch(setLogout(false));
	};

	const productAddedFunction = () => {
		toast.success("Product added successfully! ✅", {
			position: "bottom-right",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
		dispatch(setProductAdded(false));
	};

	const emailConfirmatedFunction = () => {
		toast.success("Email confirmed successfully! ✅", {
			position: "top-right",
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
		dispatch(setEmailConfirm(false));
	};

	useEffect(() => {
		if (products.length) return;
		dispatch(getAllProducts(1));
	}, []);

	return (
		<div className="min-h-screen">
			{accountCreated && accCreated()}
			{welcomeUser && welcomeUserFunction()}
			{errorLoginBadData && errLoginBadDataFunction()}
			{errorLoginNotFound && errLoginAccNotFound()}
			{loginIncomplete && errLoginIncompleteFunction()}
			{confirmYourEmailError && errLoginEmailNotConfirmed()}
			{logout && logoutFunction()}
			{productAdded && productAddedFunction()}
			{emailConfirmated && emailConfirmatedFunction()}
			<Header />
			<Carousel />
			<div className="flex justify-center">
				<CategoriesCarousel />
			</div>
			<Footer />
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
			/>
		</div>
	);
};

export default Home;
