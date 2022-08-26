import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { confirmationEmail } from "../store/slices/users/thunks";
import jwt from "jwt-decode";
import { useDispatch } from "react-redux";

function ConfirmationSingup() {
	let { token } = useParams();
	const dispatch = useDispatch();
  const navigate = useNavigate()
	token = token.replaceAll("'", ".");
	const userInfo = jwt(token);

	return (
		<div>
			<button
				onClick={() => {
					dispatch(confirmationEmail(userInfo));
         navigate("/")
				}}
			>
				Confirmacion
			</button>
		</div>
	);
}
export default ConfirmationSingup;
