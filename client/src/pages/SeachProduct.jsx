import React from "react";
import { useSelector } from "react-redux";

export default function SearchBar() {
    const { productsName } = useSelector((state) => state.products);

    return(
        <div>
            <h1>Productos</h1>
            {productsName?.map(item =>
            <div>
                <h3>{item.name}</h3>
                <h3>{item.price}</h3>
                <img src={item.image}/>
                </div>
            )}:<h1>No se encontraron produsctos</h1>
        </div>
    )
}