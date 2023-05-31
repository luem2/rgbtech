import Link from 'next/link'

import { Carousel, SecondaryCarousel } from '@/components/'
import { BiLinkExternal, BsFillPeopleFill } from '@/components/icons'

export default function Home() {
    return (
        <main>
            <Carousel />

            {/* <SecondaryCarousel /> */}

            <footer className='flex absolute bottom-0 left-0 right-0 w-screen items-center bg-gray-100 dark:bg-zinc-900 justify-around gap-5 text-gray-500 min:justify-center'>
                <section className='sm:my-6'>
                    <h6 className='flex justify-center uppercase font-semibold mb-4'>
                        Support
                    </h6>
                    {/* Modal simple con metodos de pago Paypal y Stripe (linkeados a su web) */}
                    <span className='hover:cursor-pointer'>
                        Paymenth Methods
                    </span>
                </section>
                <section className='sm:my-6'>
                    <h6 className='flex items-center justify-center uppercase font-semibold mb-4'>
                        Contact
                    </h6>
                    <Link
                        className='flex items-center gap-1 dark:text-pink-600 text-pink-600 text-base font-semibold hover:text-blue-600/100 w-fit dark:hover:text-blue-600 hover:scale-105 duration-300 hover:cursor-pointer'
                        href='/about'
                    >
                        <BsFillPeopleFill /> About Team
                    </Link>
                </section>
                <section className='sm:my-6'>
                    <h6 className='flex justify-center items-center uppercase font-semibold mb-4'>
                        Final Proyect
                    </h6>
                    <Link
                        className='flex gap-1 justify-center items-center'
                        href='https://www.soyhenry.com/'
                        rel='noopener noreferrer'
                        target='_blank'
                    >
                        <BiLinkExternal /> Henry Bootcamp
                    </Link>
                </section>
            </footer>
        </main>
    )
}
