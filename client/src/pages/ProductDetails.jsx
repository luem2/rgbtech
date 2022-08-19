import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../store/slices/products/thunks";
import { MdOutlineShoppingCart } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import Spinner from "../components/Spinner";
import Header from "../components/Header/Header";
import CircleButton from "../components/Buttons/CircleButton";
import SquareButton from "../components/Buttons/SquareButton";

const ProductDetails = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { productDetails } = useSelector((state) => state.products);
	const product = productDetails;

	useEffect(() => {
		dispatch(getProductById(id));
	}, []);

	return (
		<div>
			<Header />
			{!Object.keys(productDetails).length ? (
				<Spinner />
			) : (
				<div>
					{/* bg-gradient-to-r from-blue-900 to-pink-900 */}
					{/* bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 */}
					<div className="flex justify-around bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 mt-2 mx-4 rounded-xl text-3xl">
						<img
							className="w-96 mb-4 max-w-full rounded-lg "
							src={product.img}
							alt={product.name}
						/>
						<div className="flex flex-col m-4 gap-4 items-center">
							<h1>{product.name}</h1>
							<p>${product.price}</p>
							<p className="flex gap-2 items-center text-xl">
								<MdOutlineShoppingCart /> Available Stock: {product.stock}
							</p>
							<CircleButton className="flex gap-2 items-center">
								<MdOutlineShoppingCart />
								Agregar al Carrito
							</CircleButton>
							<SquareButton className="flex gap-2 items-center">
								<AiOutlineHeart />
								Agregar a Favoritos
							</SquareButton>
						</div>
					</div>

					<div className="bg-gradient-to-r from-blue-900 to-pink-900 p-2 mt-2 mx-4 rounded-xl flex flex-col justify-center items-center shadow-gray-700 shadow-md ">
						<div>
							<h2>Features:</h2>
							{Object.entries(productDetails.specifications[0]).map((e) => (
								<p>
									{e[0].charAt(0).toUpperCase() + e[0].slice(1)}: {e[1]}
								</p>
							))}
						</div>

						<div className="flex flex-col justify-center items-center mt-6 rounded-lg">
							<h2>Description:</h2>
							<p>{productDetails.description}</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductDetails;
