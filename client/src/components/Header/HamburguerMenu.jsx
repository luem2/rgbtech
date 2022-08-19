import React, { useState } from "react";

function HamburguerMenu() {
	const [open, setOpen] = useState(false);
	let links = [
		{ name: "Equipos y notebooks", link: "./" },
		{ name: "Consolas de videojuegos", link: "./" },
		{ name: "Procesadores y coolers cpus", link: "./" },
		{ name: "Memorias ram", link: "./" },
		{ name: "Almacenamiento", link: "./" },
		{ name: "Monitores y tvs", link: "./" },
		{ name: "Teclados y mouses", link: "./" },
		{ name: "Audio, parlantes, audiculares, y mic", link: "./" },
	];
	return (
		<div className="bg-gray-900">
			{!open ? (
				<button
					className="fixed z-30 flex items-center cursor-pointer left-10 top-3"
					onClick={() => setOpen(!open)}
				>
					<svg fill="#ff127e" viewBox="0 0 100 80" width="40" height="40">
						<rect width="100" height="10"></rect>
						<rect y="30" width="100" height="10"></rect>
						<rect y="60" width="100" height="10"></rect>
					</svg>
				</button>
			) : (
				<div
					className="top-0 left-0 bg-white fixed h-[630px] p-12 rounded-br-[120px]  
         "
				>
					<button
						className="text-[30px] text-black font-bold fixed left-10 top-2"
						onClick={() => setOpen(!open)}
					>
						❌
					</button>
					<ul className="text-black">
						<h1 className="text-black text-2xl pb-7 pt-10 font-bold font-mono">
							Categorias
						</h1>
						{links.map((link) => (
							<li className="text-black p-3 ml-3 font-mono">
								<a href={link.link}>{link.name}</a>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}

export default HamburguerMenu;
