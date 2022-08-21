import React from "react";
import HamburguerMenu from "./HamburguerMenu";
import SearchBar from "./Searchbar";
import UserSection from "./UserSection";


export default function Index() {
	return (
		<div className="flex w-auto justify-between flex-row items-center p-3 m-3 shadow-md">
			<HamburguerMenu />
			
			<SearchBar />
			<UserSection />
		</div>
	);
}
