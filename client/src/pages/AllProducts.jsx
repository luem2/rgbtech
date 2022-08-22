import React, { useRef } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../store/slices/products/thunks";
import  useProducts  from "../components/useProducts"
// import { Link } from "react-router-dom";



function AllProducts() {

	// const dispatch = useDispatch();
	const { products } = useSelector((state) => state.products);
	const [page, setPage] = useState(1)
	const response = useSelector(state => state.response);
	const observer = useRef();
	const {loading, error} = useProducts(page)
	console.log(response?.pageNumbers);
	response ? console.log(response) : undefined
	const lastProduct = useCallback(node => {
		if(loading)return 
		if(observer.current) observer.current.disconnect()
		observer.current = new IntersectionObserver(entries => {
		  if(entries[0].isIntersecting) {
			console.log("VISIBLE")
			if(5 > page){
			  setPage(page + 1)
			  console.log(page)
			}
		  }
		},{
		  threshold : 0
		}, [loading, response?.nextPage])
		if(node) observer.current.observe(node)
	  })



	// useEffect(() => {
	// 	dispatch(getAllProducts(page));
	// }, []);

	return (
		<div>
			<h1>{page}</h1>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			{products &&
				products.map((elem, i) => {
					if(products.length === i+1){
						return(
							<div key={i} ref={lastProduct} className="flex justify-start p-2">
							<div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
								<img
									className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
									src={elem.img}
									alt=""
								/>
								<div className="p-6 flex flex-col justify-start">
									<h5 className="text-gray-900 text-xl font-medium mb-2">
										{elem.name}
									</h5>
									<p className="text-gray-700 text-base mb-4">
                                    This is a special product of our RGBtech page for all our customers
									</p>
									<p className="text-gray-600 text-x">${elem.price}</p>
								</div>
							</div>
						</div>
						)
					}
					return (
						<div key={i} className="flex justify-start p-2">
							<div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
								<img
									className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
									src={elem.img}
									alt=""
								/>
								<div className="p-6 flex flex-col justify-start">
									<h5 className="text-gray-900 text-xl font-medium mb-2">
										{elem.name}
									</h5>
									<p className="text-gray-700 text-base mb-4">
                                    This is a special product of our RGBtech page for all our customers
									</p>
									<p className="text-gray-600 text-x">${elem.price}</p>
								</div>
							</div>
						</div>
					);
				})}
		</div>
	);
}

export default AllProducts;

