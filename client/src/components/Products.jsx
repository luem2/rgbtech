import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../store/slices/products/thunks'

export default function Products() {

    const dispatch = useDispatch()
    const { products } = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getAllProducts())
    }, [])

  return (
    <div>
        {products && products.map((elem, i) => {
            return (
                <div key={i}>
                  <p>{elem.name}</p>
                </div>
            )
        })}
    </div>
  )
}
