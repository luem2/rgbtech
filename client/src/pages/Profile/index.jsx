import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "../../store/slices/components/componentSlice";
import Header from "../../components/Header/Header";
import { clearUser, modifyProfile } from "../../store/slices/users/userSlice";
import ShoppingHistory from "./ShoppingHistory";
import { clearFavorite } from "../../store/slices/products/productSlice";
import LastVisited from "./LastVisited";
import ModifyProfile from "./ModifyProfile";
import { RiLogoutBoxFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { RiHistoryLine } from "react-icons/ri";
import defaultImage from "../../assets/defaultImage.png";

const Profile = () => {
	const [section, setSection] = useState("shoppingHistory");
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const user = JSON.parse(window.localStorage.getItem("user"));

	const handleSignOut = () => {
		window.localStorage.removeItem("token");
		window.localStorage.removeItem("user");
		dispatch(setLogout(true));
		dispatch(clearUser());
		dispatch(clearFavorite());
		navigate("/");
	};

	return (
		<div>
			<Header />
			<div className="flex justify-between items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl shadow-2xl text-white mx-10 p-5">
				<div className="shadow-2xl rounded-3xl p-2 w-80">
					<div className="flex flex-col justify-center items-center shadow-xl p-3 rounded-3xl drop-shadow-2xl">
						<h1 className="font-extrabold text-3xl">
							{user.isAdmin ? "👨‍💼Admin:" : "👨‍🚀User:"}
						</h1>
						<img
							className="rounded-full my-4 h-32 w-32 shadow-lg"
							src={
								user.profilePhoto === null ? defaultImage : user.profilePhoto
							}
							alt={`profilePhoto-${user.user}`}
						/>
						<p className="flex font-extrabold gap-2 text-xl text-white-600">
							Profile:
						</p>
						<p className="font-semibold mt-4">Username: {user.user}</p>
						<p className="font-semibold">Email: {user.mail}</p>
						<p className="font-semibold">
							RGBTech Points: <b>4000🪙</b>{" "}
						</p>
						<p className="font-semibold">
							Administrator: {user.isAdmin ? "✅" : "❌"}
						</p>
					</div>
					<div className="flex flex-col justify-center items-center mt-4 gap-5">
						<button
							type="button"
							className="flex gap-2 justify-center items-center mt-3 px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-48"
							onClick={() => setSection("Profile")}
						>
							<CgProfile onClick={() => dispatch(modifyProfile(true))} /> Modify
							profile
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
							<RiHistoryLine /> Last visited
						</button>
						<button
							type="button"
							className="flex gap-2 justify-center items-center mb-3 px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out w-48"
							onClick={handleSignOut}
						>
							<RiLogoutBoxFill /> Sign Out
						</button>
					</div>
				</div>
				{modifyProfile && <ModifyProfile />}
				{section === "shoppingHistory" ? <ShoppingHistory /> : <LastVisited />}
			</div>
		</div>
	);
};

export default Profile;
