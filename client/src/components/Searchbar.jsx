import React from 'react'
import { useState } from 'react'

export default function SearchBar() {

    const [input, setInput] = useState('')

    const inputHandler = (e) => {
        setInput(e.target.value);
        console.log(input);
    }

  return (
    <div>
        <input
            type="text"
            placeholder="Search..."
            name='input'
            autoComplete='off'
            onChange={(e) => inputHandler(e)}
        />
    </div>
  )
}
