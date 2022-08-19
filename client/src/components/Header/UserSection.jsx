import React from "react";
import {
	AiOutlineUser,
	AiOutlineHeart,
	AiOutlineShoppingCart,
} from "react-icons/ai";

const UserSection = () => {
	return (
		<div className="flex gap-2">
			<AiOutlineHeart
				size="30px"
				className="bg-pink-500 rounded-2xl py-0.5 p-1"
			/>
			<AiOutlineUser
				size="30px"
				className="bg-pink-500 rounded-2xl py-0.5 p-1"
			/>
			<AiOutlineShoppingCart
				size="30px"
				className="bg-pink-500 rounded-2xl py-0.5 p-1"
			/>
		</div>
	);
};

export default UserSection;
