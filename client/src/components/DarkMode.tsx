'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { BsFillSunFill, BsFillMoonFill } from '@/components/icons'

export function DarkMode() {
    const [mounted, setMounted] = useState(false)
    const { systemTheme, theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const currentTheme = theme === 'system' ? systemTheme : theme

    return (
        <>
            {currentTheme === 'dark' ? (
                <BsFillSunFill
                    className='text-yellow-400 hover:cursor-pointer'
                    size={20}
                    onClick={() => setTheme('light')}
                />
            ) : (
                <BsFillMoonFill
                    className='text-gray-900 hover:cursor-pointer'
                    size={20}
                    onClick={() => setTheme('dark')}
                />
            )}
        </>
    )
}
