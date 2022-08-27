import React from 'react'

export default function Tarjeta(props) {
console.log(props, 'jhads');
  return (
    <div ref={props.lastProduct || null} className="flex p-6 font-mono">
								<div className="flex rounded-xl justify-center shadow-2xl bg-pink-600 w-48 h-[230px] relative z-10 w-full before:h-full ">
									<img
										src={props.img}
										alt=""
										className="absolute z-10 inset-0 pt-5 w-full h-full object-cover rounded-lg"
										loading="lazy"
									/>
								</div>
								<form className="flex-auto pl-6">
								<div className="relative flex flex-wrap items-baseline pb-6 before:bg-white shadow-xl before:absolute before:-top-6 before:bottom-0 before:-left-60 before:-right-6">
										<h1 className="relative w-full flex-none mb-2 text-2xl font-semibold text-pink-600">
										{props.name}
										</h1>
										<div className="relative text-lg text-black shadow-xl rounded-2xl">${props.price}</div>
										<div className="relative uppercase text-pink-600 ml-10 shadow-xl">
											In stock
										</div>
									</div>
									<div className="flex space-x-2 mb-4 text-sm font-medium">
										<div className="flex space-x-4">
											<button
												className="px-6 h-12 uppercase font-semibold tracking-wider border-2 border-black bg-blue-400 hover:bg-pink-600 text-black"
												type="submit"
											>
												Buy now
											</button>
											<button
												className="px-6 h-12 uppercase font-semibold tracking-wider border border-slate-200 text-slate-900"
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
												fill="currentColor"
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
								</form>
							</div>
						);
						}
				
