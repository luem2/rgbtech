import { FaUserAstronaut } from '@/components/icons'

export function AccessButton() {
    return (
        <button className='flex items-center h-11 justify-center select-none gap-2 rounded-md dark:bg-pink-700 bg-pink-600 px-4 py-2 text-gray-100 font-semibold hover:bg-pink-700 dark:hover:bg-pink-800'>
            <FaUserAstronaut size={20} />
            Sign in
        </button>
    )
}
