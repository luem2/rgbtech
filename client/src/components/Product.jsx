import React from "react";
import { Link } from "react-router-dom";
// import { GiShoppingCart } from "react-icons/gi";
import { BsSuitHeart } from "react-icons/bs"
import { addProduct } from "../store/slices/guestShoppingCart/guestShoppingCartSlice";
import { useDispatch, useSelector } from "react-redux";
import { setProductAdded } from "../store/slices/components/componentSlice";

function Product({ id, name, price, img, onDiscount, discountPercentage, freeShipping }) {
	const { cart } = useSelector((state) => state.guestShoppingCart);
	const dispatch = useDispatch();

	const handleAddCart = () => {
		if (Boolean(cart.find((p) => p.id === id))) return;
		else {
			dispatch(
				addProduct({
					id,
					name,
					price,
					img,
				})
			);
			dispatch(setProductAdded(true));
		}
	};

	const discountFunction = (price, discount) => {
	 let discPercentage = discount / 100
	 discPercentage = price * discPercentage
	//  console.log("PORCENTAJE",discPercentage)
	 let result = Math.ceil(price - discPercentage)
	//  console.log("TOTAL",result)
	 return result
	}
	


	return (
		<div className="flex flex-wrap justify-center p-6">
			<div className="bg-white shadow-xl max-w-sm bg-white rounded-md">
			<Link to={`/productDetails/${id}`}>
				<a >
					<img
						className="cursor-pointer rounded-t-lg shadow-2xl hover:opacity-80 hover:scale-105 transition duration-300 ease-in-out bg-pink-700"
						src={img}
						alt={name}
					/>
				</a>
				</Link>
				<div className="place-content-center ml-2 px-5 pb-5">
					<a>
						<h3 className="text-black font-semibold text-xl tracking-tight mt-3">
							{name.slice(0,17)}...
						</h3>
					</a>
					<div className="flex items-center mt-2.5 mb-5">
						{ onDiscount ? <span className="flex text-xl font-bold text-gray-900 dark:text-white justify-between">
						<p className="line-through text-gray-400 mr-3 text-base">${price}</p>
						<p className="text-green-500 text-lg"> ${discountFunction(price, discountPercentage)} </p>
						</span> 
						: <p className="text-xl font-bold text-black text-base">${price}</p>
						} 
						{freeShipping ? <p className="text-green-500 ml-3">(Free Shipping)</p>
						: null
						}
					</div>
					<div className="flex items-center justify-between">
						<button onClick={handleAddCart} className="text-white bg-pink-400 hover:scale-95 shadow-xl hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-pink-400 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>
							Add to cart
						</button>
						<button className="text-red cursor-pointer hover:scale-110 text-xl font-semibold mr-2 px-2.5 py-0.5 ml-3">
							<BsSuitHeart size={30}/>
						</button>
					</div>
				</div>
			</div>
		</div>

		// <div classNameName="flex flex-wrap justify-center p-10">
		// 	<div classNameName="flex flex-wrap justify-center rounded-lg shadow-xl max-w-sm">
		// 		<Link to={`/productDetails/${id}`}>
		// 			<img
		// 				classNameName="shadow-xl hover:opacity-70 hover:scale-105 transition duration-300 ease-in-out bg-pink-700"
		// 				src={img}
		// 				alt={name}
		// 			/>
		// 		</Link>
		// 		<div classNameName="flex flex-col justify-center place-items-start p-3">
		// 			<div classNameName="flex flex-wrap items-baseline">
		// 				<h5 classNameName="w-full flex-none mb-3 text-2xl leading-none text-slate-900">
		// 					{name}
		// 				</h5>
		// 			</div>
		// 			<div classNameName="flex-auto text-lg font-medium text-slate-500 pb-1">
		// 				${price}
		// 			</div>
		// 			<div className="flex space-x-4 mb-5 text-sm font-medium">
		// 				<div classNameName="flex-auto flex space-x-4 pr-4">
		// 					<button
		// 						classNameName="flex-none h-12 rounded-3xl px-2 w-10 hover:scale-105 cursor-pointer tracking-wider bg-black text-2xl text-white"
		// 						type="submit"
		// 					>
		// 						<GiShoppingCart onClick={handleAddCart} />
		// 					</button>
		// 					<button
		// 						classNameName="flex-none w-1/2 h-12 hover:scale-105 text-xl"
		// 						type="button"
		// 					>
		// 						🖤
		// 					</button>
		// 				</div>
		// 			</div>
		// 		</div>
		// 	</div>
		// </div>
	);
}

export default Product;
