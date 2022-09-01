import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllProducts, limpiarProductos } from '../store/slices/products/thunks'


export default function Filters({setPage, page}) {

    
  const { tags } = useSelector((state) => state.products)
  const { brands } = useSelector((state) => state.products)
  const dispatch = useDispatch()
    

  const [state, setState] = useState(
    {
      brand: '',
      tag: '',
      price: '',
      column: ''
    }
  )
  

    const handleSelect = (e) => {
      const {value, name} = e.target
      setState({
        ...state,
        [name]: value
      })
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(limpiarProductos())
        let string = '?'
        const entries = Object.entries(state)
        const busqueda = entries.filter((entrie) => {return entrie[1] !== ""})
        busqueda.map((filtro, index) => {
          if(index === 0){
            string = `${string}${filtro[0]}=${filtro[1]}` 
          } else {
            string = `${string}&${filtro[0]}=${filtro[1]}`
          }
        })
        setPage(1)
		    dispatch(limpiarProductos())
        dispatch(getAllProducts(1, string))
    }

  return (
    <div className="flex justify-center  w-40 ml-4">
    <form className='shadow-md'>
  <div>
    <h1 className='font-bold'>Brands</h1>
    <div className="form-check overflow-y-scroll h-52">
      <select multiple name='brand' onChange={handleSelect}>
        <option value=''>All brands</option>
          {brands && brands.map((item)=> {
            return <option key ={item.id} value={item.id}>{item.name}</option>
          })}
      </select>
    </div>
      <div>
      <h1 className='font-bold'>Tags</h1>
      <div className="form-check overflow-y-scroll h-52">
      <select multiple name='tag' onChange={handleSelect}>
        <option value=''>All tags</option>
          {tags && tags.map((item)=> {
            return <option key ={item.name} value={item.name}>{item.name}</option>
          })}
      </select>
    </div>
      </div>
      <div className="relative pt-1">
  <h2 className="font-bold">Price</h2>
  <label>{state.price}</label>
  <input
    type="range"
    id="vol" 
    name="price" 
    min="0" 
    max="2500" 
    step='1'
    value={state.value} 
    onChange={handleSelect}
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
  <br />
  </form>
</div>
  )
}