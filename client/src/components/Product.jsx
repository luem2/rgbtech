import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiOutlineSmallDash } from "react-icons/ai";
import { addProduct } from "../store/slices/guestShoppingCart/guestShoppingCartSlice";
import { useDispatch, useSelector } from "react-redux";
import jwt from "jwt-decode";
import {
	deleteProductFav,
	addProductsFav,
} from "../store/slices/products/productSlice";
import {
	updateFavoriteUser,
	deleteFavoriteUser,
	updateProductCart,
	getUserProfile,
} from "../store/slices/users/thunks";
import {
	productAddedNotification,
	youAreUnloggedProducts,
} from "./Notifications";
import { hasJWT } from "../store/thunks";

function Product({
	id,
	name,
	price,
	img,
	onDiscount,
	discountPercentage,
	freeShipping,
	stock,
}) {
	const { user } = useSelector((state) => state.user)
	const dispatch = useDispatch();
	let token_jwt
	let perfil
	if (hasJWT()) {
		token_jwt = window.localStorage.getItem("token");
		perfil = jwt(token_jwt);
	}
	let Fav = user.favorite

	const handleAddCart = () => {
		if (hasJWT()) {
			const cart = user.cartShop
			const handler = cart?.includes(id)
			if (!handler) {
				dispatch(updateProductCart([id]))
			}else{
				return;
			}
		}
		else {
			youAreUnloggedProducts();
		}

	}

	const discountFunction = (price, discount) => {
		let discPercentage = discount / 100;
		discPercentage = price * discPercentage;
		let result = Math.ceil(price - discPercentage);
		return result;
	};

	// const handleAddCartFav = () => {
	// 	if (favoriteId.includes(id)) return;
	// 	if (!hasJWT()) {
	// 		youAreUnloggedProducts();
	// 	} else {
	// 		dispatch(
	// 			addProductsFav({
	// 				id,
	// 				name,
	// 				price,
	// 				img,
	// 			})
	// 		);
	// 		console.log(id, "id en product");
	// 		dispatch(updateFavoriteUser({
	// 			id,
	// 			name,
	// 			price,
	// 			img,
	// 		}));
	// 		favoriteId.push(id);
	// 	}
	// };
	const handleAddCartFav = () => {
		let includes = []

		user.favorite ?
			includes = Fav?.filter(p => p == id) : includes = null;
		if (!includes) {
			hasJWT() ? dispatch(updateFavoriteUser({ id })) : youAreUnloggedProducts();
			dispatch(getUserProfile(perfil.id))
		}
	}
	const handleDeleteCartFav = () => {
		let includes = []

		user.favorite ?
			includes = Fav?.filter(p => p == id) : includes = null;
		if (includes) {
			favDelete = includes.filter((p) => p !== id);
			dispatch(deleteFavoriteUser(favDelete));
		}
	};

	return (
		<div className="flex flex-wrap justify-center p-7 mb-5 m-5">
			<div className="shadow-xl w-96 bg-white rounded-md">
				<Link to={`/productDetails/${id}`}>
					<img
						className="cursor-pointer rounded-t-lg shadow-2xl hover:opacity-80 hover:scale-105 transition duration-300 ease-in-out bg-pink-700"
						src={img}
						alt={name}
					/>
				</Link>
				<div className="place-content-center ml-2 px-5 pb-5">
					<h3 className="text-black font-semibold text-xl tracking-tight mt-3 flex flex-row justify-around">
						{name.slice(0, 17)} ...{" "}
						{onDiscount ? (
							<p className="text-red-600 text-base border border-red-600 rounded-sm px-1">
								{discountPercentage}% OFF
							</p>
						) : null}
					</h3>

					<div className="flex items-center mt-3 mb-5">
						{onDiscount ? (
							<span className="flex text-xl text-gray-900 dark:text-white justify-between">
								<p className="line-through text-gray-400 mr-1 text-2xl">
									${price}
								</p>

								<p className="text-black text-2xl ml-4">
									${discountFunction(price, discountPercentage)}
								</p>
							</span>
						) : (
							<p className="text-black text-2xl ml-4">${price}</p>
						)}
						{freeShipping ? (
							<p className="text-green-500 ml-2">( Free Shipping )</p>
						) : null}
					</div>
					<div className="flex items-center justify-between">
						<button
							onClick={handleAddCart}
							className="text-white bg-pink-400 hover:scale-95 shadow-xl hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-pink-400 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>
							Add to cart
						</button>
						{Fav && Fav.includes(id) ? (
							<button
								onClick={handleDeleteCartFav}
								className="cursor-pointer hover:scale-110 mr-2 px-2.5 py-0.5 ml-3 duration-300"
							>
								<AiOutlineHeart color="pink" size={35} />
							</button>
						) : (
							<button
								onClick={handleAddCartFav}
								className="cursor-pointer hover:scale-110 mr-2 px-2.5 py-0.5 ml-3"
							>
								<AiOutlineHeart size={25} />
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Product;
