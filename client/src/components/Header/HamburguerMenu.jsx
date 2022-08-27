import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-dibujo-2.png";

function HamburguerMenu() {
	const [open, setOpen] = useState(false);

// 	"Wireless",
// "Gaming",
// "Wired",
// "Mouse",
// "Keyboard",
// "Monitor",
// "Optical",
// "Furniture",
// "Laptops",
// "Mobile",
// "Audio",
// "Microphone",
// "RGB",
// "Curveds"

	const url = 'http://127.0.0.1:5173/products'
	
	let tags = [
		{ name: "All products", tag: "" },
		{ name: "Monitors", tag: "?tag=Monitor" },
		{ name: "Laptops", tag: "?tag=Laptops" },
		{ name: "Keyboards", tag: "?tag=Keyboard" },
		{ name: "mouses", tag: "?tag=Mouse" },
		{ name: "Chairs and gaming desk", tag: "?tag=Furniture" },
		{ name: "Audio, speakers, etc.", tag: "?tag=Audio" },
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
					className="w-100 pt-0 h-[550px] shadow-md bg-white px-8 absolute rounded-br-[120px] shadow-l shadow-blue-600/100"
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
						{tags.map((tag, i) => (
							<li key={i} className="text-black p-2 ml-1 font-mono">
								<Link className="flex items-center 
								text-black py-5 px-6 h-10 
								overflow-hidden 
								text-ellipsis whitespace-nowrap 
								rounded hover:text-blue-600/100 hover:bg-gray-100 
								transition duration-300 ease-in-out" 
								href={url + tag.tag}>{tag.name}</Link>
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
