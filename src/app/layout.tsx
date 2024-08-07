import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Info Paseos',
	description: 'Info Paseos description'
};

const RootLayout = ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<html
			lang='en'
			className='bg-[#254E79] text-white scroll-smooth font-medium'
		>
			<body
				className={`${montserrat.className} h-dvh px-[5%] overflow-x-hidden`}
			>
				{children}
				<Analytics />
			</body>
		</html>
	);
};

export default RootLayout;
