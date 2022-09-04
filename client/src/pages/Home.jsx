import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../store/slices/products/thunks.js";
import Carousel from "../components/Carousel.jsx";
import Header from "../components/Header/Header.jsx";
import CategoriesCarousel from "../components/CategoriesCarousel/CategoriesCarousel.jsx";
import Footer from "../components/Footer.jsx";
import Notifications from "../components/Notifications.jsx";
import "react-toastify/dist/ReactToastify.css";
import ModalHome from "../components/ModalHome.jsx";

const Home = () => {
	const dispatch = useDispatch();
	const { products } = useSelector((state) => state.products);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		if (products.length) return;
		dispatch(getAllProducts(1));
		setShowModal(true)
	}, []);

	return (
		<div className="w-full ">
			<Notifications />
			<Header />
			<ModalHome showModal={showModal} setShowModal={setShowModal}/>
			<Carousel />
			<CategoriesCarousel />
			<Footer />
		</div>
	);
};

export default Home;
