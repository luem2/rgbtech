import React from "react";
import { BsTrash2 } from "react-icons/bs";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const ShoppingCard = ({
	name,
	img,
	units,
	addUnits,
	subUnits,
	delProduct,
	price,
	totalProductPrice,
	onDiscount,
}) => {

	return (
		<div className="flex justify-start p-4 border-b-2">
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
						{!onDiscount ? (
					<div className="flex justify-between items-center">
						<span className="flex text-xl text-gray-900 dark:text-white justify-between">
						<p className="line-through text-gray-400 mr-1 text-2xl">
							${totalProductPrice}
						</p>

						<p className="text-black text-2xl ml-4">
							${price}
							{console.log(price)}
						</p>
					</span>
						<p className="text-lg font-semibold">Units: {units}</p>
					</div>
						) : null}
					<p className="flex mt-4 gap-2 text-2xl">
						<AiOutlinePlus
							className="cursor-pointer hover:scale-110"
							onClick={addUnits}
						/>
						<AiOutlineMinus
							className="cursor-pointer hover:scale-110 "
							onClick={subUnits}
						/>
						<BsTrash2
							className="cursor-pointer hover:scale-110 duration-300"
							onClick={delProduct}
						/>
					</p>
				</div>
			</div>
		</div>
	);
};

export default ShoppingCard;
