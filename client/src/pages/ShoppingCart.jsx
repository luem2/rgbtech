import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header/Header";
import { BsFillCartCheckFill } from "react-icons/bs";
import ShoppingCard from "../components/ShoppingCard";

const ShoppingCart = () => {
	const { cart } = useSelector((state) => state.guestShoppingCart);
	const pricesCart = cart?.map((p) => p.price);
	const totalPrice = pricesCart?.reduce((prev, act) => prev + act, 0);
	return (
		<div>
			<Header />
			<div className="flex items-center justify-center gap-2">
				<h1 className="flex gap-2 text-3xl">
					<BsFillCartCheckFill />
					Your Shopping Cart:
				</h1>
			</div>
			<div className="flex flex-row justify-around items-start ">
				<section className="flex flex-row justify-around items-center">
					<div className="mt-4">
						{cart.map((p) => (
							<ShoppingCard
								key={p.id}
								name={p.name}
								img={p.img}
								price={p.price}
							/>
						))}
					</div>
				</section>
				{cart.length > 0 && (
					<div className="flex flex-col justify-center gap-5 mt-4 items-center text-2xl font-bold">
						<button
							type="button"
							className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
						>
							Clear Cart
						</button>
						<button
							type="button"
							className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
						>
							Continue buying
						</button>
						<h2>
							Total Price:{" "}
							<span className="text-green-500 underline">${totalPrice}</span>
						</h2>
					</div>
				)}
			</div>
		</div>
	);
};

export default ShoppingCart;
