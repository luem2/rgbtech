import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { CgArrowLeftO, CgArrowRightO } from 'react-icons/cg';

const imagnaryProducts = [
    "https://www.acerstore.cl/files/imagenes/media/2022/08/nitro_red.png?size=1200x806&format=webp",
    "https://cl.buscafs.com/www.levelup.com/public/uploads/images/712970/712970.jpeg",
    "https://tienda.redcomputer.es/img/cms/promociones/landing-streamers/pc-pereira.png",
];

let count = 0;
let slideInterval;

function Carousel() {
	const [currentIndex, setCurrentIndex] = useState(0);

	const slideRef = useRef();

    const removeAnimation = ()=> {
        slideRef.current.classList.remove("fade-anim")
    };
   
	useEffect(() => {
        slideRef.current.addEventListener
        ("animationend", removeAnimation)
        slideRef.current.addEventListener
        ("mouseenter", pauseSlider)
        slideRef.current.addEventListener
        ("mouseleave", startSlider)
		
        startSlider();
        return () => {
            pauseSlider();
        };
    }, []);

	const startSlider = () => {
		slideInterval = setInterval(() => {
			handleOnNextClick();
		}, 3000);
	};

    const pauseSlider = ()=> {
        clearInterval(slideInterval);
    };

	const handleOnNextClick = () => {
		count = (count + 1) % imagnaryProducts.length;
		setCurrentIndex(count);
        slideRef.current.classList.add("fade-anim")
	};
	const handleOnPrevClick = () => {
		const imgsLength = imagnaryProducts.length;
		count = (currentIndex + imgsLength - 1) % imgsLength;
		setCurrentIndex(count);
        slideRef.current.classList.add("fade-anim")
	};

	return (
		<div ref={slideRef} className="w-full select-none relative">
			<div className="aspect-w-16 aspect-h-9">
				<img src={imagnaryProducts[currentIndex]} alt="" />
			</div>

			<div
				className="absolute w-full top-1/2 transform -translate-y-1/2 
            px-3 flex justify-between items-center"
			>
				<button
                 
                onClick={handleOnPrevClick}><CgArrowLeftO size={40}/>
                </button>
				<button 
         
                onClick={handleOnNextClick}><CgArrowRightO size={40}/>
                </button>
			</div>
		</div>
	);
}

export default Carousel;