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
	const largo = Object.keys(productsName).length

	const onChange = (value) => {
        dispatch(searchNameAction());
        navigate("/productDetails/" + value.value);
        setValue("");
        console.log(value)
	};

	// const onSearch = () => {
	// 	dispatch(searchNameAction(""));
	// 	setValue("");
	// };

	// const onClickHandler = (e) => {
	// 	e.preventDefault();
	// 	setValue(e.target.value);
	// 	navigate("/productDetails/" + value);
	// 	setValue("");
	// };
	
	useEffect(() => {
		dispatch(searchNameAction());
	}, [dispatch]);

	const customStyles = {
		option: (provided, state) => ({
		  ...provided,
		  borderBottom: '2px solid pink',
		  color: state.isSelected ? 'pink' : 'black',
		  padding: 20,
		  cursor:'pointer',
		  
		}),
		control: () => ({
			width:2000,
			cursor:'pointer',
			
		})
	  };
	  const colourStyles = {
		control: styles => ({ ...styles, 
			width:300,
			backgroundColor:'#FF69B4',
			cursor:'pointer',
			borderRadius: 10,
			borderColor:'white',
		}),
		option: (styles, { data, isDisabled, isFocused, isSelected }) => {
		  return {
			...styles,
			borderRadius: 5,
			backgroundColor: isSelected ? 'red' : '#FF1493', 
			color: 'black',
			cursor:'pointer',
			padding:10,
			margin: 1
		  };
		},
		
	  };

	return (
		<div>
			<div className="flex">
                
				<Select className="flex rounded pl-1 pt-1 pr-1 pb-2 font-bold"
					placeholder=" 🔎 Look for it..."
					styles={colourStyles}
					options={productsName}
					onChange={onChange}
				/>
			</div>
		</div>
	);
}