import React from 'react'

export default function TarjetaShopping({name, totalPrice, month, year, amount, commented}) {
  return (
    <div class="lg:flex shadow rounded-lg border  border-gray-400">
      <div class="bg-blue-600 rounded-lg  py-4 block h-full shadow-inner">
        <div class="text-center h-20 w-20">
          <div class="text-white font-bold text-4xl">{month}</div>
          <div class="text-white font-normal text-2xl">{year}</div>
        </div>
      </div>
      <div class="w-full  lg:w-11/12 xl:w-full px-1 bg-white py-5 lg:px-2 lg:py-2 tracking-wide">
        <div class="flex flex-row lg:justify-start justify-center">
          <div class="text-gray-700 font-medium text-sm text-center lg:text-left px-2">
            <i class="far fa-clock"></i> 1:30 PM
          </div>
          <div class="text-gray-700 font-medium text-sm text-center lg:text-left px-2">
            RGBTech
          </div>
        </div>
        <div class="font-semibold text-gray-800 text-xl text-center lg:text-left px-2">
          {name}
        </div>
        <div class="text-gray-600 font-medium text-sm pt-1 text-center lg:text-left px-2">
          Amount: {amount}
        </div>
        <div class="text-gray-600 font-medium text-sm pt-1 text-center lg:text-left px-2">
          Total price: {totalPrice}
        </div>
      </div>
      {
        commented 
        ? <p> comentado</p>
        :<button className='bg-white '> no comentado</button>
       }
      <div class="flex flex-row items-center w-full lg:w-1/3 bg-white lg:justify-end justify-center px-2 py-4 lg:px-0">
        <span class="tracking-wider text-gray-600 bg-gray-200 px-2 text-sm rounded leading-loose mx-2 font-semibold">
          ✔
        </span>

      </div>
    </div>
  )
}

{/* <div className="flex justify-center  p-2">
			<div className="flex flex-col md:flex-row md:max-w-6xl rounded-lg bg-white shadow-lg">
				<div className="p-6 flex flex-col justify-start">
					<h5 className="text-gray-900 text-xl font-medium mb-2">{name}</h5>
					<p className="text-gray-700 text-base mb-4">
						{totalPrice} precio
					</p>
					<div className="flex justify-between items-center">
						<p className="text-gray-600 text-xl font-bold">
							{} 
						</p>
					</div>
                    <h2 className='text-black'>month: {month} year: {year}</h2>
                    <h2 className='text-black'>{amount}</h2>
                    


                    <div className="flex justify-between items-center">
						<p className="text-gray-600 text-xl font-bold">
							{} 
						</p>
					</div>
				</div>
			</div>
		</div> */}