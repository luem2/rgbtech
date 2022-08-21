import React from "react";
import css from "./ModalMircha.module.css";

const ModalMircha = ({ children, syncFunction }) => {
	const handleModalContainerClick = (e) => e.stopPropagation();

	return (
		<article onClick={syncFunction} className={css.modal}>
			<div className={css.container} onClick={handleModalContainerClick}>
				{children}
			</div>
		</article>
	);
};

export default ModalMircha;
