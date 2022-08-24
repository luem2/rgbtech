import React from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { GrSubtractCircle, GrAddCircle } from "react-icons/gr";

const ShoppingCard = ({
	price,
	name,
	img,
	addProduct,
	subProduct,
	delProduct,
}) => {
	return (
		<div className="flex justify-start p-2">
			<div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
				<img
					className="bg-pink-700 w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
					src={img}
					alt=""
				/>
				<div className="p-6 flex flex-col justify-start">
					<h5 className="text-gray-900 text-xl font-medium mb-2">{name}</h5>
					<p className="text-gray-700 text-base mb-4">
						This is a special product of our RGBtech page for all our customers
					</p>
					<div className="flex justify-between items-center">
						<p className="text-gray-600 text-xl font-bold">${price}</p>
						<p className="text-lg font-semibold">Units: 2</p>
					</div>
					<p className="flex mt-4 gap-2 text-2xl">
						<GrAddCircle
							className="bg-green-500 rounded-full hover:text-green-600 cursor-pointer hover:scale-110 duration-300"
							onClick={addProduct}
						/>
						<GrSubtractCircle
							className="bg-red-500 rounded-full hover:text-green-600 cursor-pointer hover:scale-110 duration-300"
							onClick={subProduct}
						/>
						<BsFillTrashFill
							className="text-red-500 hover:text-red-600 cursor-pointer hover:scale-110 duration-300"
							onClick={delProduct}
						/>
					</p>
				</div>
			</div>
		</div>
	);
};

export default ShoppingCard;
