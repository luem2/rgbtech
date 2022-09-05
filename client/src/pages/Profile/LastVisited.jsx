import React from "react";
import CardProduct from "./CardProduct";

const LastVisited = () => {
	const lastVisited = JSON.parse(window.localStorage.getItem("lastVisited"));

	return (
		<div className="flex flex-col justify-start items-center ml-14 h-screen overflow-auto mt-10">
			<h1 className="text-5xl font-extrabold text-white-600 drop-shadow-lg shadow-black text-center mb-6">
				Last visited:
			</h1>
			{lastVisited?.map((p, i) => (
				<CardProduct
					key={i}
					id={p.id}
					name={p.name}
					img={p.img}
					description={p.description?.substring(0, 35) + "..."}
					rating={p.rating}
					stock={p.stock}
				/>
			))}
		</div>
	);
};

export default LastVisited;
