export const hasJWT = () => {
	let flag = false;

	window.localStorage.getItem("token") ? (flag = true) : (flag = false);

	return flag;
};
