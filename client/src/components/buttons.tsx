import { BiLogIn } from '@/components/icons'

export function LoginInButton() {
    return (
        <button className='flex items-center text-sm h-9 w-[5.5rem] justify-center select-none gap-2 rounded-md dark:bg-pink-700 bg-pink-600 text-gray-100 font-semibold hover:bg-pink-700 dark:hover:bg-pink-800'>
            <BiLogIn size={20} />
            Log In
        </button>
    )
}
