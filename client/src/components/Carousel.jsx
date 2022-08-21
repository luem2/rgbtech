import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';
import logo from "../assets/logo-dibujo2.png"

const imagnaryProducts = [
	 logo,
    "https://www8.hp.com/my/en/images/02_hero_r1_700x500_tcm193_2638293_tcm193_2638346_tcm193-2638293.png",
    "https://th.bing.com/th/id/R.4896c93d881bb34581dc88f7f3201e88?rik=VDJiYq0VLTKefg&pid=ImgRaw&r=0",
    "https://th.bing.com/th/id/R.5de1e61a3db24af4bd4ad7dedc8da998?rik=Bi2LQWTh3yxseQ&pid=ImgRaw&r=0",
];

let count = 0;
let slideInterval;

function Carousel() {
	const [currentIndex, setCurrentIndex] = useState(0);

	const slideRef = useRef();

	const removeAnimation = () => {
		slideRef.current.classList.remove("fade-anim");
	};

	useEffect(() => {
		slideRef.current.addEventListener("animationend", removeAnimation);
		slideRef.current.addEventListener("mouseenter", pauseSlider);
		slideRef.current.addEventListener("mouseleave", startSlider);

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

	const pauseSlider = () => {
		clearInterval(slideInterval);
	};

	const handleOnNextClick = () => {
		count = (count + 1) % imagnaryProducts.length;
		setCurrentIndex(count);
		slideRef.current.classList.add("fade-anim");
	};
	const handleOnPrevClick = () => {
		const imgsLength = imagnaryProducts.length;
		count = (currentIndex + imgsLength - 1) % imgsLength;
		setCurrentIndex(count);
		slideRef.current.classList.add("fade-anim");
	};

	return (
		<div ref={slideRef} className="w-auto select-none">
			<div className="flex flex-wrap justify-center">
				<img
					className="pt-5 pb-20 cursor-pointer hover:scale-105 transition duration-300 ease-in-out"
					src={imagnaryProducts[currentIndex]}
					alt=""
				/>
			</div>

			<div className="flex flex-wrap justify-center">
				<button
					className="absolute bottom-80 flex items-center justify-center text-center hover:scale-110 left-0"
					onClick={handleOnPrevClick}
				>
					<IoMdArrowDropleft size={40} />
				</button>
				<button
					className="absolute bottom-80 flex items-center justify-center text-center hover:scale-110 right-0"
					onClick={handleOnNextClick}
				>
					<IoMdArrowDropright size={40} />
				</button>
			</div>
		</div>
	);
}

export default Carousel;