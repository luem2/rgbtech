import { Inter } from 'next/font/google'

import { Header } from '@/components/Header'
import { Providers } from '@/components/Providers'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'RGBTech',
    description: 'Ecommerce of technology products.',
}

interface Props {
    children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <Providers>
                    <Header />
                    {children}
                </Providers>
            </body>
        </html>
    )
}
