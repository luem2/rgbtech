import React from 'react'

function ProductsAdmin() {
	return (
		<>
			<table className="border-collapse w-[800px] mx-10">
				<thead>
					<tr>
						<th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
							Product
						</th>
						<th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
							Brand
						</th>
						<th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
							tag
						</th>
						<th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					<tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
						<td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
							<span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
								Product
							</span>
							K60 RGB Pro SE
						</td>
						<td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
							<span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
								Brand
							</span>
							Keyboard
						</td>
						<td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
							<span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
								Tag
							</span>
							<span className="rounded bg-red-400 py-1 px-3 text-xs font-bold">
								Corsair
							</span>
						</td>
						<td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
							<span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
								Actions
							</span>
							<a  className="text-blue-400 hover:text-blue-600 underline">
								Edit
							</a>
							<a
								
								className="text-blue-400 hover:text-blue-600 underline pl-6"
							>
								Remove
							</a>
						</td>
					</tr>
					<tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
						<td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
							<span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
								Product
							</span>
							Legion 4 Pro
						</td>
						<td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
							<span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
								Brand
							</span>
							Laptop
						</td>
						<td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
							<span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
								Tag
							</span>
							<span className="rounded bg-green-400 py-1 px-3 text-xs font-bold">
								Lenovo
							</span>
						</td>
						<td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
							<span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
								Actions
							</span>
							<a  className="text-blue-400 hover:text-blue-600 underline">
								Edit
							</a>
							<a
								
								className="text-blue-400 hover:text-blue-600 underline pl-6"
							>
								Remove
							</a>
						</td>
					</tr>
					<tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
						<td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
							<span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
								Product
							</span>
							Gaming Office Chair
						</td>
						<td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
							<span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
								Brand
							</span>
							Chairs
						</td>
						<td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
							<span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
								Tag
							</span>
							<span className="rounded bg-yellow-400 py-1 px-3 text-xs font-bold">
								Down x
							</span>
						</td>
						<td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
							<span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
								Actions
							</span>
							<a  className="text-blue-400 hover:text-blue-600 underline">
								Edit
							</a>
							<a
								
								className="text-blue-400 hover:text-blue-600 underline pl-6"
							>
								Remove
							</a>
						</td>
					</tr>
				</tbody>
			</table>
            </>
	);
}

export default ProductsAdmin