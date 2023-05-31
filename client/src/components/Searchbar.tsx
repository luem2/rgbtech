import { FaSearch } from '@/components/icons'

export default function Searchbar() {
    return (
        <form className='flex w-80 h-10 border-pink-600 font-semibold text-sm bg-transparent rounded-full items-center dark:border-pink-700 border-[3px] hover:border-gray-400'>
            <input
                className='w-80 h-10 bg-transparent focus:bg-transparent  focus:outline-none ml-4 font-medium placeholder:font-semibold placeholder:text-stone-500'
                placeholder='Search product'
                type='text'
            />
            <FaSearch className='text-gray-500 m-2' size={20} />
        </form>
    )
}
