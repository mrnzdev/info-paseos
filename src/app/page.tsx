import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'

const Map = dynamic(() => import('../components/Map'), { ssr: false })

export default function Home() {
	return (
		<>
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
					<h1 className='w-[23ch] text-[calc(2.5vw+1rem)] text-center'>
						Encontrá
						<span className='italic font-bold'>
							{' '}
							todos los paseos{' '}
						</span>
						del país en un solo lugar.
					</h1>
					<Image
						src={'/binoculars.svg'}
						alt='Logo de Info Paseos'
						width={175}
						height={175}
					/>{' '}
				</div>
				<div className='flex justify-center md:justify-end'>
					<Link
						href='/publica'
						className='bg-[#F7572B] px-12 py-6 rounded-[50px] font-bold text-xl'
					>
						Quiero publicar un paseo
					</Link>
				</div>
			</section>
			<section className='h-dvh flex flex-col gap-12 py-12'>
				<h2 className='text-5xl text-center'>
					Nuevas{' '}
					<span className='italic font-bold'>experiencias</span>
				</h2>
				<Map />
			</section>
		</>
	)
}
