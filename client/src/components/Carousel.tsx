'use client'

import Image from 'next/image'
import { Autoplay, Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { carouselImages } from '@/utils/constants'

export default function Carousel() {
    return (
        <Swiper
            autoplay={{
                delay: 4000,
                disableOnInteraction: false,
            }}
            loop={true}
            modules={[Autoplay, Pagination, Navigation]}
            navigation={true}
            pagination={{
                clickable: true,
                type: 'bullets',
            }}
            slidesPerView={1}
            spaceBetween={30}
        >
            {carouselImages.map((image) => (
                <SwiperSlide key={image.name}>
                    <div className='flex place-content-center w-[100%]'>
                        <Image
                            alt={image.alt}
                            className='hidden select-none min-[550px]:flex'
                            src={image.src}
                        />
                        <Image
                            alt={`responsive-${image.alt}`}
                            className='select-none flex min-[550px]:hidden'
                            src={image.responsiveSrc}
                        />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
