import React from "react";
import logo from "../assets/logo-dibujo-2.png";





function SideNavAdmin() {
	return (
		<div className="grid grid-rows-6 grid-flow-col gap-2 w-60 h-full shadow-md bg-gray-800 absolute">
			<div className="pt-4 pb- px-6 ">
				<a>
					<div className="flex items-center">
						<div>
							<img src={logo} className="rounded-full w-10" alt="Logo" />
						</div>
						<div className="grow ml-3">
							<p className="text-2xl font-semibold text-pink-700"> RGBTech </p>
						</div>
					</div>
				</a>
			</div>
			<div className="grid justify-spaceBetween">
				<div className="relative px-1">
					<div className="relative">
						<a className="flex items-center text-xl py-4 px-6 h-12 overflow-hidden text-white text-ellipsis whitespace-nowrap rounded hover:text-pink-700 hover:bg-gray-500 transition duration-300 ease-in-out cursor-pointer">
							<span>Users</span>
						</a>
					</div>
					<div className="relative">
						<a className="flex items-center text-xl py-4 px-6 h-12 overflow-hidden text-white text-ellipsis whitespace-nowrap rounded hover:text-pink-700 hover:bg-gray-500 transition duration-300 ease-in-out cursor-pointer">
							<span>Statistics</span>
						</a>
					</div>
				</div>
				<div className="relative px-1 mb-10">
					<div className="relative">
						<a className="flex items-center text-xl py-4 px-6 h-12 overflow-hidden text-white text-ellipsis whitespace-nowrap rounded hover:text-pink-700 hover:bg-gray-500 transition duration-300 ease-in-out cursor-pointer">
							<span>Products</span>
						</a>
					</div>
					<div className="relative">
						<a className="flex items-center text-xl py-4 px-6 h-12 overflow-hidden text-white text-ellipsis whitespace-nowrap rounded hover:text-pink-700 hover:bg-gray-500 transition duration-300 ease-in-out cursor-pointer">
							<span>Otra Cosa</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SideNavAdmin;