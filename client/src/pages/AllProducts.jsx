import React, { useEffect, useRef } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getAllProducts,
	getEtiquetas,
	getMarcas,
} from "../store/slices/products/thunks";
import Tarjeta from "../components/Tarjeta";
// import { useEffect } from "react";
// import { getAllProducts } from "../store/slices/products/thunks";
// import  useProducts  from "../components/useProducts"
// import Header from "../components/Header/Header.jsx";
// import { useLocation } from "react-router-dom";
// import Filters from "../components/Filters";

export default function AllProducts({ setPage, page }) {
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);
	const { products } = useSelector((state) => state.products);
	const { response } = useSelector((state) => state.products);
	const observer = useRef();
	const lastProduct = useCallback((node) => {
		if (loading) return;
		if (observer.current) observer.current.disconnect();
		observer.current = new IntersectionObserver(
			(entries) => {
				console.log(entries);
				if (entries[0].isIntersecting) {
					if (response.pageNumbers > page) {
						setTimeout(() => {
							setPage(page + 1);
						}, 1000);
					}
				}
			},
			{
				threshold: 0,
			},
			[loading, response]
		);
		if (node) observer.current.observe(node);
	});

	useEffect(() => {
		dispatch(getEtiquetas());
		dispatch(getMarcas());
	}, []);

	useEffect(() => {
		console.log(page);
		setLoading(true);
		dispatch(getAllProducts(page, response?.nextPage));
		setLoading(false);
	}, [page]);

	return (
		<div>
			{products &&
				products.map((elem, i) => {
					if (products.length === i + 1) {
						return (
							<Tarjeta
								id={elem.id}
								key={elem.id}
								image={elem.img}
								name={elem.name}
								price={elem.price}
								lastProduct={lastProduct}
							/>
						);
					} else {
						return (
							<Tarjeta
								id={elem.id}
								key={elem.id}
								image={elem.img}
								name={elem.name}
								price={elem.price}
							/>
						);
					}
				})}
		</div>
	);
}
