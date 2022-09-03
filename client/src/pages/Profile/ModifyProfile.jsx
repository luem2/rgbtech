import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/Modal/Modal";

const ModifyProfile = () => {
	// const dispatch = useDispatch();
	// const {user} = useSelector(state => state.user)
	const [input, setInput] = useState({
		user: "",
		password: "",
		mail: "",
		profilePhoto: "",
	});

	function handleChange(e) {
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
	}

	const userData = JSON.parse(window.localStorage.getItem("user"));
	console.log("userData", userData);

	return (
		<Modal syncFunction={() => console.log("hola")}>
			<div className="flex flex-col gap-4">
				<label className="font-semibold" htmlFor="">
					Username:
					<input
						name="user"
						className="ml-2 rounded-xl text-back gap-2 mx-2"
						placeholder={userData.user}
						value={input.user}
						onChange={handleChange}
					/>
				</label>
				<button
					type="submit"
					className="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
				>
					Accept Changes
				</button>
				<button
					type="button"
					className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
				>
					Cancel Changes
				</button>
			</div>
		</Modal>
	);
};

export default ModifyProfile;
