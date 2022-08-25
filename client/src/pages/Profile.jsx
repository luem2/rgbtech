import React from "react";
import jwt from "jwt-decode";

const Profile = () => {
	const token = window.localStorage.getItem("token");
	const perfil = jwt(token);

	const handleSignOut = () => {
		window.localStorage.removeItem("token");
	};

	return (
		<div>
			<h1>{perfil.user}</h1>
			<button className="" onClick={handleSignOut}>
				Sign out
			</button>
		</div>
	);
};

export default Profile;
