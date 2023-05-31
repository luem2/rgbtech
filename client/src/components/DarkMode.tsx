'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { BsFillSunFill, BsFillMoonFill } from '@/components/icons'

export default function DarkMode() {
    const [mounted, setMounted] = useState(false)
    const { systemTheme, theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const currentTheme = theme === 'system' ? systemTheme : theme

    return currentTheme === 'dark' ? (
        <button
            className='flex hover:bg-slate-100 hover:dark:bg-slate-700 rounded-md justify-center items-center w-8 h-8'
            onClick={() => setTheme('light')}
        >
            <BsFillSunFill
                className='text-yellow-400 hover:cursor-pointer'
                size={20}
            />
        </button>
    ) : (
        <button
            className='flex hover:bg-slate-100 hover:dark:bg-slate-700 rounded-md justify-center items-center w-8 h-8'
            onClick={() => setTheme('dark')}
        >
            <BsFillMoonFill
                className='text-gray-900 hover:cursor-pointer'
                size={20}
            />
        </button>
    )
}
