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
		<div >
			{!open ? (
				<button
					className="relative z-30 flex items-center cursor-pointer"
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
					className="w-80 h-full shadow-md bg-white px-5 absolute rounded-br-[120px]"
				>
					<button
						className="text-[30px] text-black font-bold mb-20px left-5 top-10"
						onClick={() => setOpen(!open)}
					>
						❌
					</button>
					<ul className="text-black relative">
						<h1 className="text-black text-2xl pb-7 pt-8 font-bold font-mono">
							Categorias
						</h1>
						{links.map((link) => (
							<li className="text-black p-3 ml-3 font-mono">
								<a className="flex items-center 
								text-sm py-4 px-6 h-12 
								overflow-hidden text-gray-700 
								text-ellipsis whitespace-nowrap 
								rounded hover:text-gray-900 hover:bg-gray-100 
								transition duration-300 ease-in-out" 
								href={link.link}>{link.name}</a>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}

export default HamburguerMenu;
