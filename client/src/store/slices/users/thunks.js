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
			const user = await axios.post("users", userCreated);
			return user;
		} catch (e) {
			console.error(e);
		}
	};
};
