import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getAllProducts } from "../store/slices/products/thunks";

function useProducts(page) {
    const dispatch = useDispatch();
    const { search } =  useLocation()
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{
        setError(false)
        setLoading(true)
        dispatch(getAllProducts(page, search))
        setLoading(false)
        console.log("USE-EFFECT",page)
    }, [page])

    return {
        error,
        loading,    
    }
        
}

export default useProducts;
