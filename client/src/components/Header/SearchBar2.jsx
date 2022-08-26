import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";
import {searchNameAction,} from "../../store/slices/products/thunks";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select"
import { useEffect } from "react";


export default function SearchBar2() {
	const [value, setValue] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { productsName } = useSelector((state) => state.products);

	const onChange = (value) => {
        dispatch(searchNameAction());
        navigate("/productDetails/" + value.value);
        setValue("");
        console.log(value)
	};

	const onSearch = () => {
		dispatch(searchNameAction(""));
		setValue("");
	};

	const onClickHandler = (e) => {
		e.preventDefault();
		setValue(e.target.value);
		navigate("/productDetails/" + value);
		setValue("");
	};
	
	useEffect(() => {
		dispatch(searchNameAction());
	}, [dispatch]);

	return (
		<div>
			<div className="w-90 mx-2 my-2">
                <h1 className="text-pink-500 ml-20 text-xl font-bold">🔎 Find it</h1>
				<Select
					className="text-blue w-80 bg-pink-300 rounded border-solid border-pink-400 pl-1 pt-1 pr-1 pb-1 font-bold"
					placeholder="Choose..."
					options={productsName}
					onChange={onChange}
				/>
			</div>

			{/* <div>
				{productsName?.map((item) => (
					<div
						className="flex justify-center"
						key={item.id}
						onClick={() => onSearch(item.name)}
					>
						<ul className="absolute bg-pink-500 mt-1 w-96 text-gray-900">
							<Link to={`/productDetails/${item.id}`}>
								<li className="px-6 py-2  text-black cursor-pointer w-full">
									{item.name}
								</li>
							</Link>
						</ul>
					</div>
				))}
			</div> */}
		</div>
	);
}