import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';
import logo from "../assets/logo-dibujo2.png"

const imagnaryProducts = [
	logo,
    "https://c1.neweggimages.com/ProductImageCompressAll1280/34-156-088-V28.jpg",
    "https://c1.neweggimages.com/ProductImage/A1CZD21122112FMUM24.jpg",
    "https://th.bing.com/th/id/R.5de1e61a3db24af4bd4ad7dedc8da998?rik=Bi2LQWTh3yxseQ&pid=ImgRaw&r=0",
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
        // slideRef.current.addEventListener
        // ("mouseenter", pauseSlider)
        // slideRef.current.addEventListener
        // ("mouseleave", startSlider)
		
        // startSlider();
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
		<div ref={slideRef} className="w-auto select-none cursor-pointer">
			<div className="aspect-w-16 aspect-h-4">
				<img src={imagnaryProducts[currentIndex]} alt="" />
			</div>

			<div
				className="fixed w-full top-1/2 transform -translate-y-1/2 
            px-3 flex justify-between items-center"
			>
				<button className="absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
                 
                onClick={handleOnPrevClick}><IoMdArrowDropleft size={40}/>
                </button>
				<button className="absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
         
                onClick={handleOnNextClick}><IoMdArrowDropright size={40}/>
                </button>
			</div>
		</div>
	);
}

export default Carousel;