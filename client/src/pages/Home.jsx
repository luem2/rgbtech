import React from "react";
import Carousel from "../components/Carousel.jsx";
import Header from "../components/Header/Header.jsx";
import Logo from "../components/Logo/Logo.jsx";
import Products from "../components/Products.jsx";

const Home = () => {
	return (
		<div className="min-h-screen grid place-content-center">
			<Header />
			<br />
			<br />
			<Products />
			<br />
			<Carousel/>
			<Logo />
		</div>
	);
};

export default Home;
