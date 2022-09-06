import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardProduct from "./CardProduct";
import jwt from "jwt-decode";
import axios from "axios";


const ShoppingHistory = () => {
	const [products, setProducts] = useState([])
	const user = useSelector((state) => state.user)

	useEffect(() => {
		const token = window.localStorage.getItem("token");
		const perfil = jwt(token);
		axios.get(`users/getShoppingHistory/${perfil.id}`)
			.then(response => {
				console.log(response)
				console.log(response.data)
				const respuesta = response.data
				setProducts(respuesta)
				console.log(respuesta)
			})
		return;
	}, [user])


	return (
		<div className="ml-14">
			<h1 className="text-5xl font-extrabold text-white-600 drop-shadow-lg shadow-black text-center mb-6">
				Shopping history:
			</h1>
			{products?.map((p, i) => (
				<CardProduct
					key={i}
					id={p.id}
					name={p.name}
					description={p.totalPrice}
					rating={p.rating}
					stock={p.stock}
				/>
			))}
		</div>
	);
};

export default ShoppingHistory;
