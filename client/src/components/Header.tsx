import Image from 'next/image'
import Link from 'next/link'

import { UserMenu } from '@/components/'
import { Searchbar } from '@/components'
import logo from '@/assets/logo-rgbtech.svg'

export default function Header() {
    return (
        <header className='flex flex-col bg-white dark:bg-zinc-900 sticky gap-4 top-0 right-0 left-0 justify-around items-center shadow-md z-40 mb-5 sm:flex-row sm:gap-0'>
            <Link href='/'>
                <Image
                    priority
                    alt='logo-rgbtech'
                    className='w-16 sm:ml-0 hover:scale-105 duration-150 select-none'
                    src={logo}
                />
            </Link>
            <Searchbar />
            <UserMenu />
        </header>
    )
}
