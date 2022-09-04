import React from "react";
import css from "./Modal.module.css";

const Modal = ({ children, closeModal, tailwindCSS }) => {
	const handleModalContainerClick = (e) => e.stopPropagation();

	return (
		<article onClick={closeModal} className={css.modal}>
			<div
				className={`${css.container} ${tailwindCSS}`}
				onClick={handleModalContainerClick}
			>
				{children}
			</div>
		</article>
	);
};

export default Modal;
