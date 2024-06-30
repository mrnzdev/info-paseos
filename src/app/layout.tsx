import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Info Paseos',
	description: 'Info Paseos description'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' className='bg-[#254E79] text-white scroll-smooth'>
			<body
				className={`${montserrat.className} h-dvh px-[5%] overflow-x-hidden`}
			>
				{children}
			</body>
		</html>
	)
}
