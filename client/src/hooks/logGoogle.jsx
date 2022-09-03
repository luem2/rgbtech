import axios from "axios";
import jwt_decode from "jwt-decode";
import {
	setLoginIncomplete,
	setLogin,
	setWelcomeUser,
} from "../store/slices/components/componentSlice";
import { getUserProfile, setCartShop} from "../store/slices/users/thunks"
import { setAuthToken } from "../store/slices/users/thunks";
import { setFavorite } from "../store/slices/products/productSlice"

export const LoguinG = (userObj) => {

const requestBody = {
			mail: userObj.email,
		};
		axios
		.post("/users/loginGoogle",requestBody )
		.then((response) => {
			console.log(response,"reponse token de backen")
			// setResponse({ status: "success" });
			const token = response.data.token;
			window.localStorage.setItem("token", token);
			setAuthToken(token);
			const user = jwt_decode(token);
		})
		}