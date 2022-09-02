import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tagsAndBrandsAction, editBrandAction } from "../../store/slices/admin/thunk";

export default function ModalTags() {
	const { tagsAndBrands } = useSelector((state) => state.admin);
    const [input, setInput] = useState({
        name: "",
    });
	const dispatch = useDispatch();

    const handleOnChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };

    const handleOnSubmit = (e, id, name) => {
        e.preventdefault()
        dispatch(editBrandAction(id, name));
        setInput({
            name: name,
        });
    }

	useEffect(() => {
		dispatch(tagsAndBrandsAction());
	}, []);

	return (
        
		<div className="justify-center">
			<div className="justify-center">
				<form className="bg-white rounded-md shadow-2xl p-5">
					<h1 className="text-gray-800 font-bold text-2xl mb-1">Update brand</h1>
                {tagsAndBrands
                ? tagsAndBrands.brands?.map((element) => (
					<p className="text-sm font-normal text-gray-600 mb-8">
						{element.name}
					</p>
                    )) : null
                    }

				    <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
						<input
							className=" pl-2 w-full outline-none border-none"
							type="text"
                            onChange={handleOnChange}
						/>
					</div>
					<button onSubmit={() => handleOnSubmit()}
						type="submit"
						className="block w-full bg-zinc-600 mt-5 py-2 rounded-2xl hover:bg-zinc-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
					>
						Updated
					</button>
				</form>
			</div>
		</div>
	);
}
