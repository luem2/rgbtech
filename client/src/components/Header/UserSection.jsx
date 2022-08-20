import React from "react";
import { IconContext } from "react-icons/lib";
import {
	AiOutlineUser,
	AiOutlineHeart,
	AiOutlineShoppingCart,
} from "react-icons/ai";

const UserSection = () => {
	return (
		<div className="flex gap-2">
		<IconContext.Provider
		value={{
			className: 'bg-pink-500 rounded-3xl py-0.5 p-1 cursor-pointer',
			style: {color: 'white'},
			size: '30px'
		}}
		>
			<AiOutlineUser
			className="hover:bg-red-500"
			/>

			<AiOutlineHeart
			className="hover:bg-red-500"
			/>

			<AiOutlineShoppingCart
			className="hover:bg-red-500"
			/>
		</IconContext.Provider>
		</div>
	);
};

export default UserSection;
