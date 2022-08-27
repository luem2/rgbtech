import React from 'react'
import AllProducts from './AllProducts'
import Header from '../components/Header/Header'
import Filters from '../components/Filters'
import Footer from '../components/Footer'

export default function AllProductsD2() {
  return (
    <div>
        <div>
            <Header/>
        </div>
        <div className=''>
        <div className=' w-44'>
            <Filters/>
        </div>
        <div className='ml-48  absolute left-0 top-20 border-solid'>
            <AllProducts/>
        </div>
        </div>
    </div>
  )
}
