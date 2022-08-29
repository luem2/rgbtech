import React from 'react';
import { FaUserAstronaut } from 'react-icons/fa';

function Users() {
  return (
		<div>
			<table className="min-w-full table-auto">
				<thead className="justify-between">
					<tr className="bg-gray-800">
						<th className="px-16 py-2">
							<span className="text-gray-300"></span>
						</th>
						<th className="px-10 py-5">
							<span className="text-gray-300">Name</span>
						</th>
						<th className="px-16 py-2">
							<span className="text-gray-300">Admin</span>
						</th>
						<th className="px-16 py-2">
							<span className="text-gray-300">Mail</span>
						</th>

						<th className="px-16 py-2">
							<span className="text-gray-300">Status</span>
						</th>
					</tr>
				</thead>
				<tbody className="bg-gray-200">
					<tr className="bg-white border-4 border-gray-200">
						<td className="px-16 py-2 flex flex-row items-center">
							<FaUserAstronaut
								className="h-8 w-8 mt-5 rounded-full object-cover text-pink-700"
								
							/>
						</td>
						<td>
							<span className="text-center ml-2 font-semibold">Dean Lynch</span>
						</td>
						<td className="px-16 py-2">
							<button className="bg-pink-700 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black ">
								Make Admin
							</button>
						</td>
						<td className="px-16 py-2">
							<span>pepe@gmail.com</span>
						</td>
						

						<td className="px-16 py-2">
							<span className="text-green-500">
								Admin
							</span>
						</td>
					</tr>
					<tr className="bg-white border-4 border-gray-200">
						<td className="px-16 py-2 flex flex-row items-center">
                        <FaUserAstronaut
								className="h-8 w-8 mt-5 rounded-full object-cover text-pink-700"
								
							/>
						</td>
						<td>
							<span className="text-center ml-2 font-semibold">Ralph Barnes</span>
						</td>
						<td className="px-16 py-2">
							<button className="bg-pink-700 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black ">
                            Make Admin
							</button>
						</td>
						<td className="px-16 py-2">
							<span>05/06/2020</span>
						</td>
						

						<td className="px-16 py-2">
							<span className="text-yellow-500">
								User
							</span>
						</td>
					</tr>
					<tr className="bg-white border-4 border-gray-200">
						<td className="px-16 py-2 flex flex-row items-center">
                        <FaUserAstronaut
								className="h-8 w-8 mt-5 rounded-full object-cover text-pink-700"
								
							/>
						</td>
						<td>
							<span className="text-center ml-2 font-semibold">Brett Castillo</span>
						</td>
						<td className="px-16 py-2">
							<button className="bg-pink-700 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black ">
                            Make Admin
							</button>
						</td>
						<td className="px-16 py-2">
							<span>05/06/2020</span>
						</td>
						

						<td className="px-16 py-2">
							<span className="text-yellow-500">
								User
							</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default Users