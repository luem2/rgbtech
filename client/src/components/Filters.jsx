import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts, limpiarProductos } from '../store/slices/products/thunks'

export default function Filters() {

    
    const { tags } = useSelector((state) => state.products)
    const { brands } = useSelector((state) => state.products)
    const dispatch = useDispatch()
    

    const [state, setState] = useState(
        {
            brand: '',
            tag: '',
            price: ''
        }
    )

    useEffect(() => {
        console.log(tags);
        console.log(brands);
    }, [tags, brands])

    const handleClickBrand = (e) => {
		setState({
            ...state,
            brand: e.target.value
		});
        console.log(state);
	};

    const handleClickTag = (e) => {
		setState({
            ...state,
            tag: e.target.value
		});
        console.log(state);
	}

    const handleChangePrice = (e) => {
        	setState({
                ...state,
                price: e.target.value
        	});
            console.log(state);
        };

    let string = '?'

    function handleSubmit(e) {
        e.preventDefault();
        if(state.brand !== '' && state.tag !== '' && state.price !== ''){
            string = string + `brand=${state.brand}&tag=${state.tag}&price=${state.price}`
        } else if (state.brand !== ''){
            string = string + `brand=${state.brand}`
        } else if (state.tag !== '') {
          string = string + `tag=${state.tag}`
        } else if (state.price !== ''){
          string = string + `price=${state.price}`
        } else{
          string = ''
        }
        dispatch(limpiarProductos())
        dispatch(getAllProducts(1, string))
        console.log(string);
    }


  return (
    <div className="flex justify-center  w-40 ml-4">
    <form className='shadow-md'>
  <div>
    <h1 className='font-bold'>Brands</h1>
    <div className="form-check overflow-y-scroll h-52">
        {brands && brands.map((item) => (
            <div>
            <input className="appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" 
            type="radio" 
            name='brands'
            onClick={handleClickBrand} 
            value={item.id}/>
            <label className="form-check-label inline-block text-gray-800">
            {item.name}
          </label>
          </div>
        ))}
    </div>
      <div>
      <h1 className='font-bold'>Tags</h1>
      <div className="form-check overflow-y-scroll h-52">
        {tags && tags.map((item) => (
            <div>
            <input className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" 
            type="radio" 
            name='tags'
            onClick={handleClickTag}
            value={item.name}
            />
            <label className="form-check-label inline-block text-gray-800" >
            {item.name}
          </label>
          </div>
        ))}
    </div>
      </div>
      <div className="relative pt-1">
  <h2 className="font-bold">Price</h2>
  <label>{state.price}</label>
  <input
    type="range"
    id="vol" 
    name="vol" 
    min="0" 
    max="2500" 
    step='1'
    value={state.value} 
    onChange={handleChangePrice}
    className="
        form-range
        w-full
        h-6
        p-0
        bg-red
        focus:outline-none focus:ring-0 focus:shadow-none
    "
  />
</div>
  </div>
  <button onClick={handleSubmit}>Filtrar</button>
  </form>
</div>
  )
}