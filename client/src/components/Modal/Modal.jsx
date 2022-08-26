import React from "react";
import { useDispatch } from "react-redux";
import css from "./Modal.module.css";

const Modal = ({ children, functionModal, syncFunction }) => {
	const dispatch = useDispatch();
	const handleModalContainerClick = (e) => e.stopPropagation();

	const closeModalFunction = () => {
		dispatch(functionModal());
	};

	return (
		<article onClick={syncFunction || closeModalFunction} className={css.modal}>
			<div className={css.container} onClick={handleModalContainerClick}>
				{children}
			</div>
		</article>
	);
};

export default Modal;
