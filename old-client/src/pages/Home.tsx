import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../store/slices/products/thunks.js'
import Carousel from '../components/Carousel.js'
import Header from '../components/Header/Header.js'
import CategoriesCarousel from '../components/CategoriesCarousel/CategoriesCarousel.js'
import Footer from '../components/Footer.js'
import ModalHome from '../components/ModalHome.js'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Home = () => {
    const dispatch = useDispatch()
    const { products } = useSelector((state) => state.products)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if (products.length) return
        // dispatch(getAllProducts(1));
        setShowModal(true)
    }, [])

    return (
        <div className='flex flex-col min-h-screen h-full'>
            <Header />
            <Carousel />
            <CategoriesCarousel />
            <Footer />
            <ToastContainer
                position='top-right'
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                false
            />
        </div>
    )
}

export default Home
