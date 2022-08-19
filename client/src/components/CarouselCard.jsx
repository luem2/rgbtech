import React from "react";

function CarouselCard({ img }) {
	return (
		<div className="
                    flex
                    justify-center
                    text-3xl md:text-7xl
                    p-6 w-50 h50 bg-slate-300 md:p-10 md:w-60 md:h-60 md:bg-300
                    items-center
                    drop-shadow-md
                    rounded-md"
		>
            <div className="text-black">
                {img}
            </div>
        </div>
	);
}

export default CarouselCard;{prop}