import { DarkMode } from './DarkMode'
import { AccessButton } from './buttons'

import {
    BsFillSuitHeartFill,
    BsFillCartFill,
    FaUser,
} from '@/components/icons/'

export function UserMenu() {
    return (
        <section className='flex items-center gap-4'>
            <DarkMode />

            {/* When user is not logged */}
            <AccessButton />

            {/* When user is logged */}
            {/* <div className='flex items-center gap-2'>
                <BsFillCartFill className='text-pink-700' size={26} />
                <BsFillSuitHeartFill className='text-pink-700' size={26} />
                <FaUser className='text-pink-700' size={26} />
            </div> */}
        </section>
    )
}
