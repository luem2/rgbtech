import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../store/slices/products/thunks";
import { Link } from "react-router-dom";

export default function Product() {
	const dispatch = useDispatch();
	const { products } = useSelector((state) => state.products);

	useEffect(() => {
		dispatch(getAllProducts());
	}, []); 

	return (
		<div>
			{products &&
				products.map((elem, i) => {
					return (
						<Link key={i} to={`/productDetails/${elem.id}`}>
							<div>
								<p>{elem.name}</p>
							</div>
						</Link>
					);
				})}
		</div>
	);
}
