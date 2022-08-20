import React from "react";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header/Header.jsx";
import Login2 from "../components/Login2.jsx";
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
			<Logo />
			<br />
			<br />
			<Login2/>
			<br />
			<br />
			<Footer/>
		</div>
	);
};

export default Home;
