import React, { useEffect ,useState } from "react";
import jwt_decode from "jwt-decode";
import { getUserProfile, setCartShop,postUserGoogle} from "../../store/slices/users/thunks"
import { LoguinG } from "../../hooks/logGoogle"
import {useDispatch, useSelector} from "react-redux"
import { useNavigate } from "react-router-dom";
import { setFavorite } from "../../store/slices/products/productSlice"


 function  LoguinGoogle() {
	const navigate = useNavigate();
	const { cart } = useSelector((state) => state.guestShoppingCart);
	const cartsId = cart.map((product) => product.id)
	const [user, setUser] = useState({})
	const dispatch = useDispatch()
	function handleCallbackResponse (response) {
		
		const token = response.credential
		// console.log(" Encoded JWT ID token : " + token);
		const userObj = jwt_decode(token);
		setUser(userObj);
		document.getElementById("signInDiv").hidden = true;
		 let name = userObj.given_name +" "+ userObj.family_name
		 console.log(userObj);
			const postFinal = {
				user: name,
				mail: userObj.email,
				profilePhoto: userObj.picture,
				password: userObj.sub,
			};
		dispatch(postUserGoogle(postFinal));
		LoguinG(userObj)
		if(cart.length) {
			dispatch(setCartShop( cartsId))
			// dispatch(clearCart())
		}
		const token_jwt = window.localStorage.getItem("token");
		const perfil = jwt_decode(token_jwt);
		console.log(perfil.id,"id user") 
		dispatch(getUserProfile(perfil.id));
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
			
			{Object.keys(user).length != 0 && 
				<button onClick={(e) =>handleSignOut(e)}> Sign Out </button>
			}
			{user && (
				<div>
					<img src={user.picture} />
					<h3>{user.name}</h3>
				</div>
			)}
			
		</div>
	);
}

export default LoguinGoogle;
