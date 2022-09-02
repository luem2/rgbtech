import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeRoleAction, usersTableAction } from "../../store/slices/admin/thunk";

import Swal from "sweetalert2"

function Users() {
	const { users } = useSelector((state) => state.admin);
	const dispatch = useDispatch();

	const theAlert = (id, isAdmin) =>
    Swal.fire({
        title: 'Are you sure?',
        text: "You will be able to revert this!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, change it!'
      }).then((result) => {
        if (result.isConfirmed) {
		dispatch(changeRoleAction({id, isAdmin}))
          Swal.fire(
            'Change!',
            'Updated successfully.',
            'success'
          )
        }
      })

	useEffect(() => {
		dispatch(usersTableAction());
	}, []);

	const makeAdmin = (id, isAdmin) => {
		theAlert(id, isAdmin)
		
		
	};

	return (
		<>
			<table className="border-collapse w-[800px] mx-10">
				<thead>
					<tr>
						<th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
							Name
						</th>
						<th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
							Mail
						</th>
						<th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
							Verificated
						</th>
						<th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
							Is-Admin
						</th>
						<th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
							Make-Admin
						</th>
					</tr>
				</thead>
				<tbody>
					{users
						? users.rows?.map((element) => (
								<tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
									<td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
										<span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
											Name
										</span>
										{element.user}
									</td>
									<td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
										<span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
											Mail
										</span>
										{element.mail}
									</td>
									<td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
										<span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
											Is-Verificated
										</span>
										<span>
											{element.userVerificate === true ? (
												<p className="text-green-600">Yes</p>
											) : (
												<p className="text-red-600">No</p>
											)}
										</span>
									</td>
									<td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
										<span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
											Is-Admin
										</span>
										{element.isAdmin === true ? (
											<p className="text-green-600">Yes</p>
										) : (
											<p className="text-red-600">No</p>
										)}
									</td>
									<td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
										{element.isAdmin ? 
										<>
										<span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
											Remove admin
										</span>
										<button className="text-blue-500 font-bold hover:underline w-full h-full hover:scale-110" onClick={() => makeAdmin(element.id, element.isAdmin)}>
											Remove admin
										</button>

										</> : 
										<>
										<span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
											Make Admin
										</span>
										<button className="text-blue-500 font-bold hover:underline w-full h-full hover:scale-110" onClick={() => makeAdmin(element.id, element.isAdmin)}>
											Make Admin
										</button>
										</>} 
									</td>
								</tr>
						  ))
						: null}
				</tbody>
			</table>
		</>

		/*
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
		 
		 */
		// <div>
		// 	<table className="min-w-full table-auto">
		// 		<thead className="justify-between">
		// 			<tr className="bg-gray-800">
		// 				<th className="px-16 py-2">
		// 					<span className="text-gray-300"></span>
		// 				</th>
		// 				<th className="px-10 py-5">
		// 					<span className="text-gray-300">Name</span>
		// 				</th>
		// 				<th className="px-16 py-2">
		// 					<span className="text-gray-300">Admin</span>
		// 				</th>
		// 				<th className="px-16 py-2">
		// 					<span className="text-gray-300">Mail</span>
		// 				</th>

		// 				<th className="px-16 py-2">
		// 					<span className="text-gray-300">Status</span>
		// 				</th>
		// 			</tr>
		// 		</thead>
		// 		<tbody className="bg-gray-200">
		// 			<tr className="bg-white border-4 border-gray-200">
		// 				<td className="px-16 py-2 flex flex-row items-center">
		// 					<FaUserAstronaut
		// 						className="h-8 w-8 mt-5 rounded-full object-cover text-pink-700"

		// 					/>
		// 				</td>
		// 				<td>
		// 					<span className="text-center ml-2 font-semibold">Dean Lynch</span>
		// 				</td>
		// 				<td className="px-16 py-2">
		// 					<button className="bg-pink-700 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black ">
		// 						Make Admin
		// 					</button>
		// 				</td>
		// 				<td className="px-16 py-2">
		// 					<span>pepe@gmail.com</span>
		// 				</td>

		// 				<td className="px-16 py-2">
		// 					<span className="text-green-500">
		// 						Admin
		// 					</span>
		// 				</td>
		// 			</tr>
		// 			<tr className="bg-white border-4 border-gray-200">
		// 				<td className="px-16 py-2 flex flex-row items-center">
		//                 <FaUserAstronaut
		// 						className="h-8 w-8 mt-5 rounded-full object-cover text-pink-700"

		// 					/>
		// 				</td>
		// 				<td>
		// 					<span className="text-center ml-2 font-semibold">Ralph Barnes</span>
		// 				</td>
		// 				<td className="px-16 py-2">
		// 					<button className="bg-pink-700 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black ">
		//                     Make Admin
		// 					</button>
		// 				</td>
		// 				<td className="px-16 py-2">
		// 					<span>05/06/2020</span>
		// 				</td>

		// 				<td className="px-16 py-2">
		// 					<span className="text-yellow-500">
		// 						User
		// 					</span>
		// 				</td>
		// 			</tr>
		// 			<tr className="bg-white border-4 border-gray-200">
		// 				<td className="px-16 py-2 flex flex-row items-center">
		//                 <FaUserAstronaut
		// 						className="h-8 w-8 mt-5 rounded-full object-cover text-pink-700"

		// 					/>
		// 				</td>
		// 				<td>
		// 					<span className="text-center ml-2 font-semibold">Brett Castillo</span>
		// 				</td>
		// 				<td className="px-16 py-2">
		// 					<button className="bg-pink-700 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black ">
		//                     Make Admin
		// 					</button>
		// 				</td>
		// 				<td className="px-16 py-2">
		// 					<span>05/06/2020</span>
		// 				</td>

		// 				<td className="px-16 py-2">
		// 					<span className="text-yellow-500">
		// 						User
		// 					</span>
		// 				</td>
		// 			</tr>
		// 		</tbody>
		// 	</table>
		// </div>
	);
}

export default Users;
