import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-dibujo-2.png";

function HamburguerMenu() {
	const [open, setOpen] = useState(false);
	let links = [
		{ name: "All products", link: "./products" },
		{ name: "Equipos y notebooks", link: "./" },
		{ name: "Consolas de videojuegos", link: "./" },
		{ name: "Procesadores y coolers cpus", link: "./" },
		{ name: "Memorias ram", link: "./" },
		{ name: "Almacenamiento", link: "./" },
		{ name: "Monitores y tvs", link: "./" },
		{ name: "Teclados y mouses", link: "./" },
		{ name: "Audio, parlantes, etc.", link: "./" },
	];
	return (
		<div className="z-50 flex flex-row gap-5 ">
			{!open ? (
				<button
					className="relative flex cursor-pointer ml-6 mt-5"
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
					className="w-100 pt-0 h-[640px] shadow-md bg-white px-8 absolute rounded-br-[120px] shadow-l shadow-blue-600/100"
				>
					<button
						className="text-[30px] font-bold mt-4"
						onClick={() => setOpen(!open)}
					>
						❌
					</button>
					<ul className="text-black font-bold relative pr-3">
						<h1 className="text-black text-2xl pb-2 pt-6 font-bold font-mono">
							Categorias
						</h1>
						{links.map((link, i) => (
							<li key={i} className="text-black p-2 ml-1 font-mono">
								<a className="flex items-center 
								text-black py-5 px-6 h-10 
								overflow-hidden text-gray-700 
								text-ellipsis whitespace-nowrap 
								rounded hover:text-blue-600/100 hover:bg-gray-100 
								transition duration-300 ease-in-out" 
								href={link.link}>{link.name}</a>
							</li>
						))}
					</ul>
				</div>
			)}
			<div>
				<Link to="/">
					<img className="w-20" src={logo} alt="logo-rgbtech" />
				</Link>
			</div>
		</div>
	);
}

export default HamburguerMenu;
