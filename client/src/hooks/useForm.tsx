import axios from "axios";
import { useState } from "react";
import jwt_decode from "jwt-decode";
import { getUserProfile, setCartShop } from "../store/slices/users/thunks";
import { useDispatch, useSelector } from "react-redux";
import { setAuthToken } from "../store/slices/users/thunks";
import { useNavigate } from "react-router-dom";
import { setFavorite } from "../store/slices/products/productSlice";
import {
	errLoginAccNotFoundNotification,
	errLoginBadDataNotification,
	errLoginEmailNotification,
	errLoginIncompleteNotification,
	welcomeUserNotification,
} from "../components/Notifications";

export const useForm = (initalForm, closeModal) => {
	const { cart } = useSelector((state) => state.guestShoppingCart);
	const cartsId = cart.map((product) => product.id);
	const dispatch = useDispatch();
	const navigate = useNavigate();
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
				if (cart.length) {
					dispatch(setCartShop(cartsId));
					// dispatch(clearCart())
				}
				dispatch(getUserProfile(user.id));

				if (user.favorite) {
					dispatch(setFavorite(user.favorite));
				}
				closeModal();
				welcomeUserNotification();
				setForm(initalForm);
				navigate("/");
			})
			.catch((error) => {
				// no envian toda la información. User pero no la pass
				error.response.status === 400 ? errLoginIncompleteNotification() : null;

				// está creado, pero no verificó el correo
				error.response.status === 401 ? errLoginEmailNotification() : null;

				// no se encontró el usuario porque no existe
				error.response.status === 404
					? errLoginAccNotFoundNotification()
					: null;

				// se está enviando mal la info del usuario
				error.response.status === 403 ? errLoginBadDataNotification() : null;
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
