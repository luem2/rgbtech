import React, { useState } from "react";
import { useSelector } from "react-redux";
import Product from "../Product.jsx";
import css from "./CategoriesSection.module.css";

const CategoriesCarousel = () => {
	const { products } = useSelector((state) => state.products);
	const [section, setSection] = useState({
		activeSection: "null",
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
			return `text-pink-100 text-lg font-medium text-white p-2 rounded-xl hover:cursor-pointer ${css.active}`;
		} else {
			return `text-white text-lg font-medium p-2 rounded-xl hover:cursor-pointer ${css.inactive}`;
		}
	};
	return (
		<div className="bg-gray-200 rounded-3xl mb-10">
			<div className="flex flex-col m-2 pt-4">
				<ul className="flex flex-row gap-5 mb-4 justify-center items-center">
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
				{/* grid-cols-5 o grid-cols-4 */}
				<div className="grid grid-cols-4 rounded-2xl m-2">
					{products.map((p, i) => (
						<Product
							key={i}
							id={p.id}
							name={p.name}
							img={p.img}
							price={p.price}
						></Product>
					))}
				</div>
			</div>
		</div>
	);
};

export default CategoriesCarousel;
