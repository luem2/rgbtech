import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import Header from "../components/Header/Header";
import FavoriteCard from "../components/TarjetaFav";
import { MdFavorite} from 'react-icons/md';
import { getUserProfile } from "../store/slices/users/thunks";
import { setFavorite } from "../store/slices/products/productSlice";
import jwt from "jwt-decode";

const Favorites = () => {
	const { favorito } = useSelector((state) => state.products);
	const user = JSON.parse(window.localStorage.getItem("user"));
	const disptach = useDispatch()
	

	console.log(user.favorite);
	// useEffect(() => {
	// 	if(favorito?.length == 0){
	// 		console.log('entro')
	// 		const token = window.localStorage.getItem("token");
	//         const perfil = jwt(token);
	// 		disptach(getUserProfile(perfil.id))
	//         disptach(setFavorite(user.favorite))
	// 	}
	// }, [])

	return (
		<div>
			<Header />
			<div className="flex justify-around  items-center rounded-3xl text-white ">
				<div className="flex flex-col justify-center items-center rounded-3xl  p-4 text-xl text-black">
					<h1 className="flex gap-2 text-4xl">
						<MdFavorite/>
						My Favorites:
					</h1>
					<div className="flex flex-col gap-4 mt-2">
						{favorito?.length === 0 && (
					<h2 className="text-2xl mt-6">Your favorites its empty! 😥</h2>
				)}
					</div>
					<div>
					{
						favorito?.map((item,i) => {
							return(
								<FavoriteCard
								key={i}
								id={item.id}
								name= {item.name}
								img={item.img}
								price= {item.price}
								/>
							)
						})
					}
				</div>
				</div>
			</div>
			<Footer/>
		</div>
	);
};

export default Favorites;