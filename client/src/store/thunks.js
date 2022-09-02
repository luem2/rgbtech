import decode from "jwt-decode";
const token = window.localStorage.getItem("token");

export const hasJWT = () => {
	let flag = false;

	window.localStorage.getItem("token") ? (flag = true) : (flag = false);

	return flag;
};

export const userProfileID = () => {
	const user = decode(token);
	return user.id;
};
