import React from "react";
import { useNavigate } from "react-router-dom";

const CardProduct = ({ id, name, img, description, rating, stock }) => {
	const navigate = useNavigate();
	return (
		<div
			className="flex justify-start p-2 hover:cursor-pointer"
			onClick={() => navigate(`/productDetails/${id}`)}
		>
			<div className="flex flex-col w-screen md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
				<img
					className="bg-blue-400 w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
					src={img}
					alt=""
				/>
				<div className="p-6 flex flex-col justify-start">
					<h5 className="text-gray-900 text-xl font-medium mb-2">{name}</h5>
					<p className="text-gray-700 text-base mb-4">{description}</p>
					<div className="flex flex-col justify-start items-start">
						<p
							className={`flex font-semibold mb-2 ${
								stock < 100 ? "text-orange-500" : "text-green-500"
							}`}
						>
							Stock available: {stock}
						</p>
						<p className="text-gray-600 text-xl font-bold">
							Rating:{rating === null ? " 0⭐" : `${rating}⭐`}
						</p>
						<p className="text-lg font-semibold">Units:</p>
					</div>
					<div className="flex justify-between items-center"></div>
				</div>
			</div>
		</div>
	);
};

export default CardProduct;
