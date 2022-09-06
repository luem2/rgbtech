import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { sendPassword } from "../store/slices/users/thunks";
import jwt from 'jwt-decode';

const validationPasswords = {
  password: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
};

function validation(input) {
  let errors = {};
	console.log(input);
  if (!validationPasswords.password.test(input.nuevaContraseña)) {
    errors.nuevaContraseña = "contraseña no valida, intente denuevo"
  }
  if (!validationPasswords.password.test(input.confirmacionDeContraseña)) {
    errors.confirmacionDeContraseña = "contraseña no valida, intente denuevo"
  }
  if (!input.nuevaContraseña === input.confirmacionDeContraseña) {
    errors.concidencia = "ambas contraseña tiene que se iguales"
  }
  return errors;
}



export default function RecoverPassword() {
	const [input, setInput] = useState({
		nuevaContraseña: "",
		confirmacionDeContraseña: "",
	});
  const [errors, setErrors] = useState({});

	const dispatch = useDispatch();
	function handlerChange(e) {
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
    setErrors(
      validation({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
	}
  const navigate = useNavigate();
	let { token } = useParams();
	token = token.replaceAll("'", ".");
	const perfil = jwt(token);

	function handlerSubmit(e) {
		e.preventDefault();
		if (!input.nuevaContraseña.length && !input.confirmacionDeContraseña.length) {
			return alert("estos campos no pueden estar vacios")
		} 
		
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
	<div className="mx-auto my-10 rounded-lg shadow p-10 max-w-lg">
	<form onSubmit={handlerSubmit}>
  <div onSubmit={handlerSubmit} className="mb-6">
    <label for="email" className="text-gray-700 font-medium">Nueva contraseña</label>
    <input value={input.nuevaContraseña} onChange={(e) => handlerChange(e)} name="nuevaContraseña"  type="password" placeholder="Enter your password" className="block rounded-md border border-gray-300 py-2 px-4 my-2 shadow-sm w-full"/>
  </div>
  {errors.nuevaContraseña && <p>{errors.nuevaContraseña}</p>}
  <div className="mb-6">
    <label for="password" className="text-gray-700 font-medium">Confirmar contraseña</label>
    <input value={input.confirmacionDeContraseña} onChange={(e) => handlerChange(e)} name="confirmacionDeContraseña" type="password" placeholder="Enter your password" className="block rounded-md border border-gray-300 py-2 px-4 my-2 shadow-sm w-full"/>
  </div>
  { errors.confirmacionDeContraseña && <p>{errors.confirmacionDeContraseña}</p>}
  <div className="flex justify-between items-center mb-3">
    <div className="mt-auto">
    </div>
  </div>
  <button type="submit" onClick={(e) => handlerSubmit(e)} className="bg-red-400 hover:bg-red-500 py-2 rounded text-white my-2 px-4 w-full">Continuar</button>
  </form>
  <br />
      <p>Minimo 8 caracteres</p>
      <p>Al menos una letra en mayúscula</p>
      <p>al menos una letra minúscula </p>
      <p>Al menos un número</p>
      <p>Puede contener un signo especial</p>
</div>
	);
}

{/* <div>
			<form onSubmit={handlerSubmit}>
				<div>
					<h4>Nueva contraseña</h4>
					<input
						type="password"
						placeholder="Enter your password"
						value={input.nuevaContraseña}
						name="nuevaContraseña"
						required
						onChange={(e) => handlerChange(e)}
					/>
      {errors.nuevaContraseña && <p>{errors.nuevaContraseña}</p>}  
				</div>
				<div>
					<h4>confirmar contraseña</h4>
					<input
						type="password"
						placeholder="Enter your password"
						value={input.confirmacionDeContraseña}
						name="confirmacionDeContraseña"
						required
						onChange={(e) => handlerChange(e)}
					/>
          { errors.confirmacionDeContraseña && <p>{errors.confirmacionDeContraseña}</p>}
				</div>
				<button type="submit" onClick={(e) => handlerSubmit(e)}>
					enviar
				</button>
			</form>
      <br />
      <p>Minimo 8 caracteres</p>
      <p>Al menos una letra en mayúscula</p>
      <p>al menos una letra minúscula </p>
      <p>Al menos un número</p>
      <p>Puede contener un signo especial</p>
		</div> */}