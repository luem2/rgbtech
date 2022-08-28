import React, { useEffect, useRef } from "react";
import { useCallback } from "react";
// import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getAllProducts } from "../store/slices/products/thunks";
import  useProducts  from "../components/useProducts"
import Header from "../components/Header/Header.jsx";
import { useLocation } from "react-router-dom";
import { getAllProducts,getEtiquetas, getMarcas } from "../store/slices/products/thunks";
import Filters from "../components/Filters";
import Tarjeta from "../components/Tarjeta";

export default function AllProducts() {

	const dispatch = useDispatch()
		
	
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

		  useEffect(() => {
			dispatch(getEtiquetas())
			dispatch(getMarcas())
		}, [])

		useEffect(() => {
		}, [products])

  return (
	<div>
		{
			products &&
			products.map((elem, i) => {
				if(products.length === i+1){
					return(
						<Tarjeta
					key={elem.id}
					image={elem.img}
					name={elem.name}
					price={elem.price}
					lastProduct={lastProduct}
					/>
					)
				} else {
					return (
					<Tarjeta
					key={elem.id}
					image={elem.img}
					name={elem.name}
					price={elem.price}
					/>
					)
					
				}
			})
		}
	</div>
  )
}










