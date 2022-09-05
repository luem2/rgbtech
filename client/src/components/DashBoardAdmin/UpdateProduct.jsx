import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProductAction } from "../../store/slices/admin/thunk";


export default function UpdateProduct() {
	const [form, setForm] = useState({});
	const { products } = useSelector((state) => state.admin);
	const dispatch = useDispatch();

    const handleOnChange = (e)=> {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    };

    const setDiscount = () => {
       return !products.onDiscount
    }

	// const [form, setForm] = useState({
	//     id: props.id,
	//     name: props.name,
	//     price: props.price,
	//     description: props.description,
	//     img: props.img,
	//     stock: props.stock,
	//     onDiscount: props.onDiscount,
	//     discountPercentage: props.discountPercentage,
	//     freeShipping: props.freeShipping
	// })

    const handleSelect = (e) => {
        const {value} = e.target
        const product = products.find((element) => element.id === value)
        setForm(product)
    }

    const handleOnSubmit = (e) => {
		e.preventDefault();
        dispatch(editProductAction(form));
		setForm({
            name: value,
        });
    }
    
    useEffect(() => {
       console.log("actualizado");
    }, [form]);

	return (
		<div>
            <select onChange={handleSelect} name="products">
                {products
						? products?.map((element) => (
                <option value={element.id}>
                    {element.name}
                </option>
                        )) 
                        : null}
            </select>
			<div className=" flex justify-center ">
				<div className="flex space-y-8">
					<div className="w-full ">
						<form onSubmit={handleOnSubmit} className="bg-white rounded-md p-5">
                        <div >
							<h1 className="text-gray-800 font-bold text-2xl mb-1">
								Update product
							</h1>
							<br />
                                <label> Name  </label>
							<div className="flex items-center border-2 mb-2 py-2 px-3 rounded-2xl">
								<input
									className=" pl-2 w-full outline-none border-none"
									onChange={handleOnChange}
                                    name="name"
                                    value={form.name}
									type="text"
									placeholder={form.name}
								/>
                               
							</div>
                            <label> Price  </label>
							<div className="flex items-center border-2 mb-2 py-2 px-3 rounded-2xl ">
								<input
									className="pl-2 w-full outline-none border-none"
                                    name="price"
									value={form.price}
									type="number"
									placeholder={form.price}
								/>
							</div>
                            <label> Description  </label>
							<div className="flex items-center border-2 mb-2 py-2 px-3 rounded-2xl ">
								<textarea
									className="pl-2 w-full outline-none border-none"
									cols="30"
									rows="10"
                                    name="description"
									value={form.description}
									placeholder={form.description}
								></textarea>
							</div>
							<div className="flex items-center border-2 mb-2 py-2 px-3 rounded-2xl">
								<input
									className=" pl-2 w-full outline-none border-none"
                                    name="img"
									value={form.img}
									type="text"
									placeholder={form.img}
								/>
							</div>
                            <label>Stock</label>
							<div className="flex items-center border-2 mb-2 py-2 px-3 rounded-2xl ">
								<input
									className="pl-2 w-full outline-none border-none"
									type="number"
                                    name="stock"
									value={form.stock}
									placeholder={form.stock}
								/>
							</div>
                            <label>Discount</label>
							<div className="flex items-center border-2 mb-2 py-2 px-3 rounded-2xl ">
								<input
									className="ml-24"
									type="checkbox"
									placeholder="Discount"
									
								/>
								<h1 className="ml-2 text-gray-400">
									<small onClick={() => setForm(...form, (form.onDiscount = true))}>Si</small>
								</h1>
                                {form.onDiscount ? 
								<h1 className="ml-2 text-gray-400">{form.onDiscount}</h1>
                                    : null}
								<input
									className="ml-12"
									type="checkbox"
									placeholder="Descuento"
									
								/>
								<h1 className="ml-2 text-gray-400">
									<small onClick={() => setForm(...form, (form.onDiscount = false))}>No</small>
								</h1>
							</div>
							<div className="flex items-center border-2 mb-2 py-2 px-3 rounded-2xl ">
								<input
									className="pl-2 w-full outline-none border-none"
									type="text"
                                    name="discountPercentage"
									value={form.discountPercentage}
									placeholder={form.discountPercentage}
								/>
							</div>
							<div className="flex items-center border-2 mb-2 py-2 px-3 rounded-2xl ">
								<h1 className="ml-2 text-gray-400">Free Shipping</h1>
								<input
									className="ml-24"
									type="checkbox"
									placeholder="Envio gratis"
									onClick={() => setForm(...form, (form.freeShipping = true))}
								/>
								<h1 className="ml-2 text-gray-400">
									<small>Si</small>
								</h1>
								<input
									className="ml-12"
									type="checkbox"
									placeholder="Envio gratis"
									onClick={() => setForm(...form, (form.freeShipping = false))}
								/>
								<h1 className="ml-2 text-gray-400">
									<small>No</small>
								</h1>
							</div>
                            </div>
							<button
                                
								type="submit"
								className="block w-full bg-zinc-600 mt-5 py-2 rounded-2xl hover:bg-zinc-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
                                >
								Updated
							</button>
						</form >
					</div>
				</div>
			</div>
		</div>
	);
}
