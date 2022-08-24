import axios from "axios";

export const AuthUserLogin = (user) => {
	return async (dispatch) => {
		try {
			const login = await axios.post("login", user);
			console.log(login);
		} catch (e) {
			console.error(e);
		}
	};
};

export const postUser = (userCreated) => {
	return async () => {
		try {
			await axios.post("users", userCreated);
		} catch (e) {
			console.error(e);
		}
	};
};
