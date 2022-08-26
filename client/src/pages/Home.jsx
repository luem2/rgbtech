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
} from "../store/slices/components/componentSlice";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
	const dispatch = useDispatch();
	const { products } = useSelector((state) => state.products);
	const notificationCreated = useSelector(
		(state) => state.components.notification.accountCreatedSuccessfully
	);
	const notificationWelcome = useSelector(
		(state) => state.components.notification.welcomeUser
	);

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

	const welcomeUser = () => {
		toast("🏠 Welcome User to RGBTech!", {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
		dispatch(setWelcomeUserFalse());
	};

	useEffect(() => {
		if (products.length) return;
		dispatch(getAllProducts(1));
	}, []);

	return (
		<div className="min-h-screen grid">
			{notificationCreated && accCreated()}
			{notificationWelcome && welcomeUser()}
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
