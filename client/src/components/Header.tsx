import Image from 'next/image'
import Link from 'next/link'

import { UserMenu } from './UserMenu'

import { Searchbar } from '@/components'
import logo from '@/assets/logo-rgbtech.svg'

export function Header() {
    return (
        <header className='flex flex-row bg-white dark:bg-zinc-800 sticky top-0 right-0 left-0 justify-around items-center shadow-md z-40 mb-5'>
            <section>
                <Link href='/'>
                    <Image
                        priority
                        alt='logo-rgbtech'
                        className='w-16 ml-16 sm:ml-0 hover:scale-105 duration-150'
                        src={logo}
                    />
                </Link>
            </section>
            <Searchbar />
            <UserMenu />
        </header>
    )
}
