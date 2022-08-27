import React, { useState } from "react";

const MyData = () => {
	const [user, setUser] = useState({
		user: "andres",
		mail: "pepe@pepe.com",
		profilePhoto: "https://holatelcel.com/wp-content/uploads/2020/09/instagram-foto-de-perfil-4.jpg",
	});


	return (
		<div>
			<h1>My data</h1>
		</div>
	);
};

export default MyData;
