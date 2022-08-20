import React from "react";
import Carousel from "../components/Carousel.jsx";
import Header from "../components/Header/Header.jsx";
import Products from "../components/Products.jsx";
import CategoriesCarousel from "../components/CategoriesSection/CategoriesSection.jsx";
import Footer from "../components/Footer.jsx";
import Login2 from "../components/Login2.jsx";

const Home = () => {
	return (
		<div className="min-h-screen grid">
			<Header />
			<Carousel />
			<div className="flex justify-center">
				<Products />
				<CategoriesCarousel />
				
			</div>
			<Footer/>
		</div>
	);
};

export default Home;
