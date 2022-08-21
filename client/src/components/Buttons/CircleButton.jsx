import React from "react";

const Button = ({ className, type, onClick, children }) => {
	return (
		<div className="flex space-x-2 justify-center">
			<button
				type={type || "button"}
				className={`inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out ${className}`}
				onClick={onClick}
			>
				{children}
			</button>
		</div>
	);
};

export default Button;
