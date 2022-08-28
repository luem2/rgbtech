import React from 'react'

export default function Tarjeta({key, image, name, price, lastProduct}){
    return (
        <div ref={lastProduct || null} key={key} className="flex bg-white p-10 font-mono border-b-2">
								<div className="flex rounded justify-center shadow-2xl bg-pink-600 h-60 relative z-10 w-30 before:h-full ">
									<img
										src={image}
										alt=""
										className="z-3 w-auto h-full object-cover rounded"
					
									/>
									
								</div>
								<div className="flex-auto pb-2 pl-6">
								<div className="flex w-[830px] rounded flex-wrap items-baseline mb-4 pb-4 before:bg-white shadow-xl">
										<h1 className="relative w-full flex-none mb-2 text-2xl font-semibold text-pink-600 pl-6">
										{name}
										</h1>
										<div className="relative text-lg text-black p-2 rounded-2xl">${price}</div>
										<div className="relative uppercase text-pink-600 ml-10 ">
											In stock
										</div>
									</div>
									<div className="flex space-x-2 mb-4 text-sm font-medium">
										<div className="flex space-x-4">
											<button
												className="px-6 h-12 font-semibold tracking-wider border-2 border-blue-400 hover:scale-95 text-black"
												type="submit"
											>
												Buy now
											</button>
											<button
												className="px-6 h-12 rounded font-semibold border border-blue-400 hover:scale-95 text-slate-900"
												type="button"
											>
												Add to cart
											</button>
										</div>
										<button
											className="flex-none flex items-center justify-center w-12 h-12 text-black"
											type="button"
											aria-label="Like"
										>
											<svg
												width="20"
												height="20"
												fill="red"
												aria-hidden="true"
											>
												<path
													fillRule="evenodd"
													clipRule="evenodd"
													d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
												/>
											</svg>
										</button>
									</div>
									<p className="text-xs leading-6 text-slate-500">
									Earn points by shopping at RGBtech
									</p>
								</div>
							</div>
    )
}
				
