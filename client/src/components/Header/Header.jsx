import React from "react";
import HamburguerMenu from "./HamburguerMenu";
import SearchBar from "./Searchbar";
import UserSection from "./UserSection";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-dibujo-2.png";

export default function Index() {
	return (
		<div className="flex w-auto justify-between flex-row items-center p-2 m-3 shadow-2xl">
			<div>
				<Link to="/">
					<img className="w-24" src={logo} alt="logo-rgbtech" />
				</Link>
			</div>
			<HamburguerMenu />
			<SearchBar />
			<UserSection />
		</div>
	);
}
