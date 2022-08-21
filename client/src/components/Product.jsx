import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { GiShoppingCart } from "react-icons/gi";

function Product({ id, name, price, img }) {
	return (
		<div className="flex flex-wrap justify-center p-10">
			<div className="flex flex-wrap justify-center rounded-lg shadow-xl max-w-sm">
				<img className="shadow-xl hover:opacity-60 transition duration-300 ease-in-out bg-pink-700" 
				src={img} 
				alt={name} />

				<div className="flex flex-col justify-between p-6">
					<h5 className="text-gray-900 text-xl font-medium mb-2">{name}</h5>
					<p className="text-gray-700 text-base mb-4">${price}</p>
					<Link className="flex flex-row bg-pink justify-between gap-5" to={`/productDetails/${id}`}>
						<button>
						<GiShoppingCart className="bg-white-600 rounded-2xl py-0.5 p-1 w-8 h-8 hover:scale-110 "/>
						</button>
						<button>
						<AiOutlineHeart className="bg-pink-600 rounded-2xl py-0.5 p-1 w-7 h-7 hover:scale-110"/>
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Product;
