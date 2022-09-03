import React, { useEffect ,useState } from "react";
import jwt_decode from "jwt-decode";
import { getUserProfile, setCartShop} from "../../store/slices/users/thunks"
import { LoguinG } from "../../hooks/logGoogle"
import {useDispatch, useSelector} from "react-redux"
import { useNavigate } from "react-router-dom";
import { setFavorite } from "../../store/slices/products/productSlice"
import axios from "axios";
import {
	setConfirmYourEmailError,
	setErrorLoginBadData,
	setErrorLoginNotFound,
	setLoginIncomplete,
	setLogin,
	setWelcomeUser,
} from "../store/slices/components/componentSlice";
import { setAuthToken } from "../store/slices/users/thunks";
import { useNavigate } from "react-router-dom";
import { setFavorite } from "../store/slices/products/productSlice";


 function  LoguinGoogle() {
	const navigate = useNavigate();
	const { cart } = useSelector((state) => state.guestShoppingCart);
	const cartsId = cart.map((product) => product.id)
	const dispatch = useDispatch()
	function handleCallbackResponse (response) {
		
		const token = response.credential
		// console.log(" Encoded JWT ID token : " + token);
		const {email, picture, given_name, family_name} = jwt_decode(token);

		document.getElementById("signInDiv").hidden = true;
		const bodyPost = {
			user: `${given_name} ${family_name}`,
			mail: email,
			profilePhoto: picture,
		};
		axios.post("/users/registerGoogle", bodyPost)
		.then(response => {
			const token = response.data.token;
			window.localStorage.setItem("token", token);
			setAuthToken(token);
			const user = jwt_decode(token);
			if (cart.length) {
				dispatch(setCartShop(cartsId));
			}
			dispatch(getUserProfile(user.id));

			if (user.favorite) {
				dispatch(setFavorite(user.favorite));
			}
			dispatch(setLogin(false));
			dispatch(setWelcomeUser(true));
			navigate("/");
		})
		.catch(error => {
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

			// se está enviando mal la info del usuario
			error.response.status === 403
				? dispatch(setErrorLoginBadData(true))
				: null;
		})


		dispatch(postUserGoogle(bodyPost));
		LoguinG(userObj)
		if(cart.length) {
			dispatch(setCartShop( cartsId))
			// dispatch(clearCart())
		}
		const token_jwt = window.localStorage.getItem("token");
		const perfil = jwt_decode(token_jwt);
		console.log 
		dispatch(getUserProfile());
		if(user.favorite){
		dispatch(setFavorite(user.favorite))
		}
		navigate("/");
	}
	
	


	function handleSignOut(event){
	setUser({});
	document.getElementById("signInDiv").hidden = false};

	function onSignIn(googleUser) {
		var id_token = googleUser.getAuthResponse().id_token;
		console.log(id_token)
		
	  }

	useEffect(() => {
		/*global google*/
		google.accounts.id.initialize({
			client_id:"319669614492-i7e6o766ctapimibesbnj4g2c9fkvk80.apps.googleusercontent.com",
			callback: handleCallbackResponse,
		});
		google.accounts.id.renderButton(document.getElementById("signInDiv"), {
			theme: "outline",
			size: "large",
		});
		google.accounts.id.prompt ( ) ;
	}, []);

	return (
		<div>
			<div div id="signInDiv"></div>
		</div>
	);
}

export default LoguinGoogle;
