import React from "react";
import logo from "../../assets/logo-dibujo-2.png";
import {Link} from "react-router-dom"

function HeaderAdmin() {
    return ( 
        <div className="bg-gray-200 w-full py-6 items-center  flex px-10">
            <div className="items-start w-10 justify-start flex text-pink-700">
                
            <Link to="/"> 
               <img src={logo} alt={logo} /> 
            </Link>
            </div>
            <p>RGBtech Admin</p>
        </div>
     );
}

export default HeaderAdmin;