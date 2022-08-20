import React from "react";

const ModalMircha = ({ children, syncFunction }) => {
	const handleModalContainerClick = (e) => e.stopPropagation();

	return (
		<article onClick={syncFunction}>
			<div onClick={handleModalContainerClick}>{children}</div>
		</article>
	);
};

export default ModalMircha;
