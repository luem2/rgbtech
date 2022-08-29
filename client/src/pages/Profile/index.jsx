import React, { useState } from "react";
import jwt from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "../../store/slices/components/componentSlice";
import Header from "../../components/Header/Header";
import { clearUser } from "../../store/slices/users/userSlice";
import { RiLogoutBoxFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { RiHistoryLine } from "react-icons/ri";
import defaultImage from "../../assets/defaultImage.png";

const Profile = () => {
	const token = window.localStorage.getItem("token");
	const [section, setSection] = useState("Profile");
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const perfil = jwt(token);
	console.log("perfil info", perfil);

	const handleSignOut = () => {
		window.localStorage.removeItem("token");
		dispatch(setLogout(true));
		dispatch(clearUser());
		navigate("/");
	};

	return (
		<div>
			<Header />
			{/* bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 */}
			{/* bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 */}
			<div className="flex items-center mx-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl shadow-2xl text-white font-semibold">
				<div className="flex flex-col bg-transparent justify-center items-center rounded-3xl mx-10 my-10 p-4 text-3xl font-extrabold text-white-600 drop-shadow-lg shadow-black">
					<h1>{perfil.isAdmin ? "👨‍💼Admin:" : "👨‍🚀User:"}</h1>
					<p className="mb-4">{perfil.user}Jorge Perez</p>
					<img
						className="rounded-full my-4 h-32 w-32 shadow-lg"
						src={
							"https://i.mkt.lu/cont/2271213/800/701/jorge-perez.jpg"
							// perfil.profilePhoto === "Image_Default"
							// 	? defaultImage
							// 	: perfil.profilePhoto
						}
						alt={`profilePhoto-${perfil.user}`}
					/>
					<div className="shadow-2xl p-3 rounded-3xl drop-shadow-2xl">
						<div className="flex flex-col justify-start items-start gap-5">
							<button
								type="button"
								className="flex gap-2 justify-center items-center px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-48"
								onClick={() => setSection("Profile")}
							>
								<CgProfile /> Modify profile
							</button>
							<button
								type="button"
								className="flex gap-2 justify-center items-center px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-48"
							>
								<HiOutlineShoppingCart /> Shopping history
							</button>
							<button
								type="button"
								className="flex gap-2 justify-center items-center px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-48"
							>
								<button />
								<RiHistoryLine /> Last visited
							</button>
							<button
								type="button"
								className="flex gap-2 justify-center items-center px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out w-48"
								onClick={handleSignOut}
							>
								<RiLogoutBoxFill /> Sign Out
							</button>
						</div>
					</div>
				</div>
				<div className="flex flex-col shadow-2xl p-3 rounded-3xl drop-shadow-2xl overflow-y-auto h-72">
					<div className="font-bold mx-32">
						<p className="flex gap-2 text-3xl font-extrabold text-white-600 drop-shadow-lg shadow-black">
							<CgProfile />
							{section}:
						</p>
						<div>
							<p className="mt-4">👦Username: Juan Carlos</p>
							<p>🔒Password: ************** </p>
							<p>✉️Email: juancarlitos@gmail.com</p>
							<p>
								🪙RGBTech Points: <b>4000</b>{" "}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
