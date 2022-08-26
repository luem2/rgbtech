import React from "react";
import HamburguerMenu from "./HamburguerMenu";
import SearchBar from "./SearchBar";
import UserSection from "./UserSection";

export default function Index() {
	return (
		<div className="flex justify-between flex-row items-center p-3 m-3 shadow-md">
			<HamburguerMenu />

			<SearchBar />
			<UserSection />
		</div>
	);
}
