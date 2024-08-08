'use client'

import { createClient } from '@/utils/supabase/client'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const Map = dynamic(() => import('./Map'), { ssr: false })

type Tour = {
	latitude: number
	longitude: number
	title: string
	description: string
	image: string
	price: number
	startDate: Date
	endDate: Date
	companies: {
		name: string
		phone: string
		instagram: string
	}
}

export default function ExperiencesSection() {
	const supabase = createClient()

	const [tours, setTours] = useState<Tour[] | null>(null)
	useEffect(() => {
		const fetchTours = async () => {
			let { data: tours, error } = await supabase
				.from('tours')
				.select(`*, companies(phone, instagram)`)

			if (error) console.error('error', error)
			else {
				const mappedTours = (tours ?? []).map((tour) => ({
					...tour,
					startDate: new Date(
						new Date(tour.start_date).getTime() + 86400000
					),
					endDate: new Date(
						new Date(tour.end_date).getTime() + 86400000
					)
				}))
				setTours(mappedTours)
			}
		}

		fetchTours()
	}, [])

	return (
		<section className='h-dvh flex flex-col gap-12 py-12'>
			<h2 className='text-4xl lg:text-5xl text-center'>
				Nuevas <span className='italic font-bold'>experiencias</span>
			</h2>
			{tours && <Map tours={tours} />}
		</section>
	)
}
