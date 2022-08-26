import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";
import {searchNameAction,} from "../../store/slices/products/thunks";
import { Link, useNavigate } from "react-router-dom";

export default function SearchBar() {
	const [value, setValue] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { productsName } = useSelector((state) => state.products);
	const largo = Object.keys(productsName).length

	const onChange = (e) => {
		setValue(e.target.value);
		dispatch(searchNameAction(e.target.value));
	};

	const onSearch = () => {
		dispatch(searchNameAction(""));
		setValue("");
	};

	const onClickHandler = (e) => {
		e.preventDefault();
		navigate("/Search")
		setValue("");
	};
	
	useEffect(()=>{
        console.log(largo)
    }, [largo])


	return (
		<div>
			<div className="flex justify-center">
				<input
					className="bg-pink-500 w-80 text-blue-800 pl-4 pt-2 pb-1 mr-4 font-bold "
					value={value}
					type="text"
					onChange={onChange}
				/>
				<button
					className="btn inline-block pr-4 pl-4 pt-2.5 pb-2.5 bg-pink-500 hover:bg-blue-400 hover:scale-110 shadow-xl text-white rounded-r-xl"
					onClick={(e) => onClickHandler(e)}
				>
					<BsSearch />
				</button>
			</div>

			<div>
				{productsName?.map((item) => (
					<div
						className="flex justify-center"
						key={item.value}
						onClick={() => onSearch(item.label)}
					>
						<ul className="z-40 overflow-y-scroll h-60 bg-blue-400 mt-1 w-96 text-gray-900">
							<Link to={`/productDetails/${item.value}`}>
								<li className="px-6 py-2 text-black cursor-pointer w-full">
									{item.label}
								</li>
							</Link>
						</ul>
					</div>
				))}
			</div>
		</div>
	);
}

/* */

/*
import React from 'react'
import Autosuggest from 'react-autosuggest';
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { getProducts } from '../store/slices/products/productSlice';
import { getProductByName } from '../store/slices/products/thunks';

export default function SearchBar() {

    const [input, setInput] = useState('')
    const dispatch = useDispatch()

    const inputHandler = (e) => {
        setInput(e.target.value);
        console.log(input);
    }

    const onClickHandler = (e) => {
        e.preventDefault();
            dispatch(getProductByName(input));
        } 

  return (
    <div>
         <button onClick={(e) => onClickHandler(e)} >Search</button>
        <input
        className='text-black'
            type="text"
            placeholder="Search..."
            name='input'
            autoComplete='off'
            onChange={(e) => inputHandler(e)}
        />
    </div>
  )
}

*/
