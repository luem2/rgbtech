import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsSearch } from 'react-icons/bs';
import { getProductByName } from '../../store/slices/products/thunks';

export default function SearchBar() {

    const [value, setValue] = useState('');
    const dispatch = useDispatch()
    const { products } = useSelector(state => state.products)


    const onChange = (e) => {
        setValue(e.target.value)
    }

    const onSearch = (SearchTerm) => {
        setValue(SearchTerm)
    }

    const onClickHandler = (e) => {
        e.preventDefault();
            setValue('')
            dispatch(getProductByName(value));
        } 

  return (
    <div>
        <div className='my-4 flex justify-center'>
        <button className="btn inline-block pr-4 pl-4 pt-2.5 pb-2.5  bg-pink-600 hover:bg-pink-700  text-white rounded-l-full" onClick={(e) => onClickHandler(e)}>
        <BsSearch/>
        </button>
        <input  className="bg-pink-600 text-black focus:outline-none pl-4 pt-2 pb-1 font-bold rounded-r-full" value={value} onChange={onChange} />
        </div>
        
        <div>
            {products.filter(item => {
                const searchTerm = value.toLowerCase();
                const fullname = item.name.toLowerCase();

                return searchTerm && fullname.startsWith(searchTerm) && fullname !== searchTerm;
            })
            .map((item) => (
            <div className='flex justify-center' key={item.id} onClick={() =>onSearch(item.name)}>
                <ul className='bg-pink-500 mt-1 w-96 text-gray-900'>
                    <li className='px-6 py-2  text-black cursor-pointer w-full'>
                    {item.name}
                    </li>
                </ul>
            </div>
            ))}
        </div>
    </div>
  )
}

/* */
 
/*
import React from 'react'
import Autosuggest from 'react-autosuggest';
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { getProducts } from '../store/slices/products/productSlice';
import { getProductByName } from '../store/slices/products/thunks';

export default function SearchBar() {

    const [input, setInput] = useState('')
    const dispatch = useDispatch()

    const inputHandler = (e) => {
        setInput(e.target.value);
        console.log(input);
    }

    const onClickHandler = (e) => {
        e.preventDefault();
            dispatch(getProductByName(input));
        } 

  return (
    <div>
         <button onClick={(e) => onClickHandler(e)} >Search</button>
        <input
        className='text-black'
            type="text"
            placeholder="Search..."
            name='input'
            autoComplete='off'
            onChange={(e) => inputHandler(e)}
        />
    </div>
  )
}

*/