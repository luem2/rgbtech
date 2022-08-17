import React from "react";
import {
	AiOutlineUser,
	AiOutlineHeart,
	AiOutlineShoppingCart,
} from "react-icons/ai";

const UserSection = () => {
	return (
		<div className="flex gap-2">
			<AiOutlineHeart className="bg-slate-600 rounded-lg py-0.5" />
			<AiOutlineUser className="bg-slate-600 rounded-lg py-0.5" />
			<AiOutlineShoppingCart className="bg-slate-600 rounded-lg py-0.5" />
		</div>
	);
};

export default UserSection;
