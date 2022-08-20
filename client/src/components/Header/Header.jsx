import React from "react";
import HamburguerMenu from "./HamburguerMenu";
import SearchBar from "./Searchbar";
import UserSection from "./UserSection";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-dibujo-2.png";

export default function Index() {
	return (
		<div className="flex w-auto justify-between flex-row items-center p-3 m-3 shadow-2xl">
			<HamburguerMenu />
			<div>
				<Link to="/">
					<img className="w-20" src={logo} alt="logo-rgbtech" />
				</Link>
			</div>
			<SearchBar />
			<UserSection />
		</div>
	);
}
