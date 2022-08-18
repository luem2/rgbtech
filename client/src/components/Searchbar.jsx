import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductByName } from '../store/slices/products/thunks';
import { GrSearch } from 'react-icons/gr';

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
        <div className='my-8 inline-block'>
        <button className="p-2.5 bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-l-full" onClick={(e) => onClickHandler(e)}>
        <GrSearch/>
        </button>
        <input  className="bg-pink-600 text-black font-bold h-8 rounded-r-full" value={value} onChange={onChange} />
        </div>
        
        <div>
            {products.filter(item => {
                const searchTerm = value.toLowerCase();
                const fullname = item.name.toLowerCase();

                return searchTerm && fullname.startsWith(searchTerm) && fullname !== searchTerm;
            })
            .map((item) => (
            <div key={item.id} onClick={() =>onSearch(item.name)}>{item.name}</div>
            ))}
        </div>
    </div>
  )
}


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