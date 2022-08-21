import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../store/slices/products/thunks";
// import { Link } from "react-router-dom";

function AllProducts() {
	const dispatch = useDispatch();
	const { products } = useSelector((state) => state.products);

	useEffect(() => {
		dispatch(getAllProducts());
	}, []);

	return (
		<div>
			{products &&
				products.map((elem, i) => {
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

/*

*/