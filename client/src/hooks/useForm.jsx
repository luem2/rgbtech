import axios from "axios";
import { useState } from "react";
import jwt_decode from "jwt-decode";
import {
	setConfirmYourEmailError,
	setErrorLoginBadData,
	setErrorLoginNotFound,
	setLoginIncomplete,
	setLogin,
	setWelcomeUser,
} from "../store/slices/components/componentSlice";
import { getLoggedUser } from "../store/slices/users/userSlice";
import { useDispatch } from "react-redux";
import { setAuthToken } from "../store/slices/users/thunks";

export const useForm = (initalForm) => {
	const dispatch = useDispatch();
	const [form, setForm] = useState(initalForm);
	const [loading, setLoading] = useState(false);
	const [response, setResponse] = useState(null);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setForm({
			...form,
			[name]: value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setLoading(true);
		const requestBody = {
			user: form.user,
			password: form.password,
		};
		axios
			.post("/users/login", requestBody)
			.then((response) => {
				setResponse({ status: "success" });
				const token = response.data.token;
				window.localStorage.setItem("token", token);
				setAuthToken(token);
				const user = jwt_decode(token);
				dispatch(getLoggedUser(user));
				dispatch(setLogin(false));
				dispatch(setWelcomeUser(true));
				setForm(initalForm);
			})
			.catch((error) => {
				// no envian toda la información. User pero no la pass
				error.response.status === 400
					? dispatch(setLoginIncomplete(true))
					: null;

				// está creado, pero no verificó el correo
				error.response.status === 401
					? dispatch(setConfirmYourEmailError(true))
					: null;

				// no se encontró el usuario porque no existe
				error.response.status === 404
					? dispatch(setErrorLoginNotFound(true))
					: null;

				error.response.status === 403
					? dispatch(setErrorLoginBadData(true))
					: null;
			});
	};
	return {
		form,
		loading,
		response,
		handleChange,
		handleSubmit,
	};
};
