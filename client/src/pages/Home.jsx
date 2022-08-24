import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../store/slices/products/thunks.js";
import Carousel from "../components/Carousel.jsx";
import Header from "../components/Header/Header.jsx";
import CategoriesCarousel from "../components/CategoriesSection/CategoriesSection.jsx";
import Footer from "../components/Footer.jsx";


const Home = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		// dispatch(getAllProducts());
	}, []);

	return (
		<div className="min-h-screen grid">
			<Header />
			<Carousel />
			<div className="flex justify-center">
				<CategoriesCarousel />
			</div>
			<Footer />
		</div>
	);
};

export default Home;
