import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../store/slices/products/thunks";

function useProducts(page) {
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{
        setError(false)
        setLoading(true)
        dispatch(getAllProducts(page))
        setLoading(false)
        console.log("USE-EFFECT",page)
    }, [page])

    return {
        error,
        loading,    
    }
        
}

export default useProducts;
