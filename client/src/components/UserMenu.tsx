import { LoginInButton } from '@/components/buttons'
import { DarkMode } from '@/components'

// import {
//     BsFillSuitHeartFill,
//     BsFillCartFill,
//     FaUser,
// } from '@/components/icons/'

export default function UserMenu() {
    return (
        <section className='flex items-center gap-2'>
            <DarkMode />

            {/* When user is not logged */}
            <LoginInButton />

            {/* When user is logged */}
            {/* <div className='flex items-center gap-2'>
                <BsFillCartFill className='text-pink-700' size={26} />
                <BsFillSuitHeartFill className='text-pink-700' size={26} />
                <FaUser className='text-pink-700' size={26} />
            </div> */}
        </section>
    )
}
