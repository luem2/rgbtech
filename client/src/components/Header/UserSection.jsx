import React, { useState } from "react";
import { IconContext } from "react-icons/lib";
import {
	AiOutlineUser,
	AiOutlineHeart,
	AiOutlineShoppingCart,
} from "react-icons/ai";
import ModalMircha from "../ModalMircha/ModalMircha";
import Login from "../Login";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserSection = () => {
	const [modal, setModal] = useState(false);
	const navigate = useNavigate();
	const { cart } = useSelector((state) => state.guestShoppingCart);

	function handleOpenModal() {
		setModal(true);
	}

	function handleCloseModal() {
		setModal(false);
	}
	return (
		<div className="flex gap-2">
			{modal && (
				<ModalMircha syncFunction={handleCloseModal}>
					<Login closeModal={handleCloseModal} />
				</ModalMircha>
			)}
			<IconContext.Provider
				value={{
					className: "bg-pink-500 rounded-3xl py-0.5 p-1 cursor-pointer",
					style: { color: "white" },
					size: "30px",
				}}
			>
				<AiOutlineUser className="hover:bg-red-500" onClick={handleOpenModal} />

				<AiOutlineHeart className="hover:bg-red-500" />

				<div>
					{cart.length > 0 && (
						<span className="flex absolute top-8 right-5 bg-teal-500 p-1 items-center rounded-full text-white text-sm h-5">
							{cart.length}
						</span>
					)}
					<AiOutlineShoppingCart
						className="hover:bg-red-500"
						onClick={() => navigate("/shoppingCart")}
					/>
				</div>
			</IconContext.Provider>
		</div>
	);
};

export default UserSection;
