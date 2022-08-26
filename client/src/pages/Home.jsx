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
	setAccCreatedFalse,
	setWelcomeUserFalse,
	setErrorLoginFalse,
	setLogoutFalse,
	setProductAddedFalse,
} from "../store/slices/components/componentSlice";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
	const dispatch = useDispatch();
	const { products } = useSelector((state) => state.products);
	const { accountCreated, welcomeUser, errorLogin, logout, productAdded } =
		useSelector((state) => state.components.notification);

	const accCreated = () => {
		toast.success("👨‍🚀 Account created successfully check your email ✉️!", {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
		dispatch(setAccCreatedFalse());
	};

	const welcomeUserFunction = () => {
		toast("🏠 Welcome User to RGBTech!", {
			position: "top-right",
			autoClose: 4000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
		dispatch(setWelcomeUserFalse());
	};

	const errLogin = () => {
		toast.error("❌ There are errors in the data", {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
		dispatch(setErrorLoginFalse());
	};

	const logoutFunction = () => {
		toast.success("🤗See you soon user!", {
			position: "top-right",
			autoClose: 4000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
		dispatch(setLogoutFalse());
	};

	const productAddedFunction = () => {
		toast.success("✅ Product added successfully!", {
			position: "bottom-right",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
		dispatch(setProductAddedFalse());
	};

	useEffect(() => {
		if (products.length) return;
		dispatch(getAllProducts(1));
	}, []);

	return (
		<div className="min-h-screen grid">
			{accountCreated && accCreated()}
			{welcomeUser && welcomeUserFunction()}
			{errorLogin && errLogin()}
			{logout && logoutFunction()}
			{productAdded && productAddedFunction()}
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
