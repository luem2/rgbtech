import React, { useState } from "react";
import { IconContext } from "react-icons/lib";
import {
	AiOutlineUser,
	AiOutlineHeart,
	AiOutlineShoppingCart,
} from "react-icons/ai";
import ModalMircha from "../ModalMircha/ModalMircha";
import Login from "../Login";

const UserSection = () => {
	const [modal, setModal] = useState(false);

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

				<AiOutlineShoppingCart className="hover:bg-red-500" />
			</IconContext.Provider>
		</div>
	);
};

export default UserSection;
