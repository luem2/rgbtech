import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { sendPassword } from "../store/slices/users/thunks";
import jwt from 'jwt-decode';
export default function RecoverPassword() {
	const [input, setInput] = useState({
		nuevaContraseña: "",
		confirmacionDeContraseña: "",
	});
	const dispatch = useDispatch();
	function handlerChange(e) {
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
	}
  const navigate = useNavigate();
	let { token } = useParams();
	token = token.replaceAll("'", ".");
	const perfil = jwt(token);

	function handlerSubmit(e) {
		e.preventDefault();
		if (input.nuevaContraseña !== input.confirmacionDeContraseña) {
			return alert("la contraseñas no son iguales");
		}
		const contraseña = {
			nuevaContraseña: input.nuevaContraseña,
		};
		dispatch(sendPassword(perfil, contraseña));
		setInput({ nuevaContraseña: "", confirmacionDeContraseña: "" });
    navigate("/")
	}

	return (
		<div>
			<form onSubmit={(e) => handlerSubmit(e)}>
				<div>
					<h4>Nueva contraseña</h4>
					<input
						type="password"
						placeholder="Enter your password"
						value={input.nuevaContraseña}
						name="nuevaContraseña"
						onChange={(e) => handlerChange(e)}
					/>
				</div>
				<div>
					<h4>confirmar contraseña</h4>
					<input
						type="password"
						placeholder="Enter your password"
						value={input.confirmacionDeContraseña}
						name="confirmacionDeContraseña"
						onChange={(e) => handlerChange(e)}
					/>
				</div>
				<bottom type="submit" onClick={(e) => handlerSubmit(e)}>
					enviar
				</bottom>
			</form>
		</div>
	);
}
