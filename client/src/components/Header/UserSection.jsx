import React from "react";
import {
	AiOutlineUser,
	AiOutlineHeart,
	AiOutlineShoppingCart,
} from "react-icons/ai";
import { BsGoogle } from 'react-icons/bs';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useModal } from "../../hooks/useModal";

const UserSection = () => {

	const [openModalLogin] = useModal(false)

	return (
		<div className="flex gap-2">
			<AiOutlineHeart
				size="30px"
				className="bg-pink-500 rounded-2xl py-0.5 p-1"
			/>

			<button>
			<AiOutlineUser
				size="30px"
				className="bg-pink-500 rounded-2xl py-0.5 p-1"
			/>
			</button>




			<AiOutlineShoppingCart
				size="30px"
				className="bg-pink-500 rounded-2xl py-0.5 p-1"
			/>
		</div>
	);
};

export default UserSection;
