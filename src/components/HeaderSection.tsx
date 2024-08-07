import Image from 'next/image';
import Link from 'next/link';

export default function HeaderSection() {
	return (
		<section className='h-dvh flex flex-col justify-between py-12'>
			<header>
				<Image
					src={'/logo.svg'}
					alt='Logo de Info Paseos'
					width={175}
					height={175}
				/>
			</header>
			<div className='flex flex-col items-center gap-6'>
				<h1 className='w-[23ch] text-[calc(2.5vw+1rem)] text-center font-medium'>
					Encontrá
					<span className='italic font-bold'> todos los paseos </span>
					del país en un solo lugar.
				</h1>
				<Image
					src={'/binoculars.svg'}
					alt='Logo de Info Paseos'
					width={175}
					height={175}
				/>
			</div>
			<div className='flex justify-center md:justify-end'>
				<Link
					href='mailto:contacto@infopaseos.com'
					className='bg-[#F7572B] px-12 py-6 rounded-[50px] font-bold text-xl'
				>
					Quiero publicar un paseo
				</Link>
			</div>
		</section>
	);
}
