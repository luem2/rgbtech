import React from "react";
import Carousel from "../components/Carousel.jsx";
import Header from "../components/Header/Header.jsx";
import Products from "../components/Products.jsx";
import CategoriesCarousel from "../components/CategoriesSection/CategoriesSection.jsx";

const Home = () => {
	return (
		<div className="min-h-screen grid">
			<Header />
			<Carousel />
			<div className="flex justify-center">
				<Products />
				<CategoriesCarousel />
			</div>
		</div>
	);
};

export default Home;
