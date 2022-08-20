import React, { useState } from "react";
import { useSelector } from "react-redux";
import Product from "../Product.jsx";
import css from "./CategoriesSection.module.css";

const CategoriesCarousel = () => {
	const { products } = useSelector((state) => state.products);
	const [section, setSection] = useState({
		activeSection: null,
		objects: [
			{ id: 1, name: "OutStanding" },
			{ id: 2, name: "High Rating" },
			{ id: 3, name: "Discount Available" },
			{ id: 4, name: "Free Shipping" },
		],
	});

	const toggleActive = (i) => {
		setSection({
			...section,
			activeSection: section.objects[i],
		});
	};

	const toggleActiveStyle = (i) => {
		if (section.objects[i] === section.activeSection) {
			return `text-pink-100 text-lg font-medium text-white p-2 rounded-xl ${css.active}`;
		} else {
			return `text-white text-lg font-medium p-2 rounded-xl ${css.inactive}`;
		}
	};
	return (
		<div>
			<ul className="flex flex-row gap-3 mb-4">
				{section.objects.map((e, i) => (
					<li
						key={i}
						className={toggleActiveStyle(i)}
						onClick={() => {
							toggleActive(i);
						}}
					>
						{e.name}
					</li>
				))}
			</ul>
			<div className="flex flex-wrap gap-1 bg-gray-200 rounded-2xl m-2">
				{products.map((p, i) => (
					<Product key={i} name={p.name} img={p.img} price={p.price}></Product>
				))}
			</div>
		</div>
	);
};

export default CategoriesCarousel;
