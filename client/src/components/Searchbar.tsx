import { FaSearch } from '@/components/icons'

export function Searchbar() {
    return (
        <form className='flex w-80 h-10 font-semibold text-sm bg-transparent rounded-full items-center border-pink-600 border-[3px] hover:border-gray-400'>
            <input
                className='w-80 h-10 bg-transparent focus:bg-transparent  focus:outline-none ml-4 font-medium placeholder:font-semibold'
                placeholder='Search product'
                type='text'
            />
            <FaSearch className='text-gray-500 m-2' size={20} />
        </form>
    )
}
