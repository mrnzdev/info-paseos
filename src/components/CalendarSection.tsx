'use client';

import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import Card from './Card';
import Filters from './Filters';

interface Tour {
	id: number;
	title: string;
	description: string;
	image: string;
	startDate: Date;
	endDate: Date;
	companies: {
		name: string;
		phone: string;
		instagram: string;
	};
}

export default function CalendarSection() {
	const supabase = createClient();
	const [tours, setTours] = useState<any[]>([]);
	const [companies, setCompanies] = useState<any[]>([]);
	const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
	const [selectedMonth, setSelectedMonth] = useState('');
	const [selectedDuration, setSelectedDuration] = useState('');
	const [selectedDateFilter, setSelectedDateFilter] = useState('future');
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const getCompanies = async () => {
			try {
				let { data: companiesData, error } = await supabase
					.from('companies')
					.select('*');
				if (error) {
					console.error('Error fetching companies:', error);
					setError('Error loading companies');
				} else {
					setCompanies(companiesData || []);
				}
			} catch (err) {
				console.error('Error fetching companies:', err);
				setError('Error loading companies');
			}
		};

		const getToursWithCompanyDetails = async () => {
			try {
				let { data: toursData, error } = await supabase
					.from('tours')
					.select(`*, companies(name, phone, instagram)`);
				if (error) {
					console.error('Error fetching tours:', error);
					setError('Error loading tours');
				} else {
					const mappedTours =
						toursData?.map((tour) => ({
							...tour,
							startDate: new Date(
								new Date(tour.start_date).getTime() + 86400000
							),
							endDate: new Date(
								new Date(tour.end_date).getTime() + 86400000
							)
						})) || [];
					setTours(mappedTours);
				}
			} catch (err) {
				console.error('Error fetching tours:', err);
				setError('Error loading tours');
			}
		};

		getCompanies();
		getToursWithCompanyDetails();
	}, []);

	if (error) {
		return <p>{error}</p>;
	}

	const groupToursByMonth = (tours: Tour[]) => {
		return tours.reduce((acc, tour) => {
			const month = new Date(tour.startDate).toLocaleString('default', {
				month: 'long'
			});
			if (!acc[month]) {
				acc[month] = [];
			}
			acc[month].push(tour);
			return acc;
		}, {} as Record<string, Tour[]>);
	};

	const groupedTours = groupToursByMonth(tours);

	if (!tours.length) {
		return <div>Loading...</div>;
	}

	const filterByDuration = (tour: Tour, duration: string) => {
		const start = new Date(tour.startDate);
		const end = new Date(tour.endDate);
		const durationInDays =
			(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

		if (duration === 'same-day') {
			return durationInDays === 0;
		} else if (duration === 'weekend') {
			return start.getDay() === 6 && end.getDay() === 0;
		} else if (duration === 'multiple-days') {
			return durationInDays > 0;
		}
		return true;
	};

	type Month =
		| 'January'
		| 'February'
		| 'March'
		| 'April'
		| 'May'
		| 'June'
		| 'July'
		| 'August'
		| 'September'
		| 'October'
		| 'November'
		| 'December';

	const monthNamesInSpanish: Record<Month, string> = {
		January: 'Enero',
		February: 'Febrero',
		March: 'Marzo',
		April: 'Abril',
		May: 'Mayo',
		June: 'Junio',
		July: 'Julio',
		August: 'Agosto',
		September: 'Septiembre',
		October: 'Octubre',
		November: 'Noviembre',
		December: 'Diciembre'
	};
	const currentDate = new Date();

	const allFilteredTours = Object.entries(groupedTours).map(
		([month, tours]) => {
			const filteredTours = tours.filter((tour) => {
				const tourDate = new Date(tour.startDate);
				const matchesCompany = selectedCompany
					? tour.companies.name === selectedCompany
					: true;
				const matchesMonth = selectedMonth
					? month === selectedMonth
					: true;
				const matchesDuration = selectedDuration
					? filterByDuration(tour, selectedDuration)
					: true;
				const isFutureTour = tourDate >= currentDate;
				const isPastTour = tourDate < currentDate;

				let matchesDateFilter = true;
				if (selectedDateFilter === 'future') {
					matchesDateFilter = isFutureTour;
				} else if (selectedDateFilter === 'past') {
					matchesDateFilter = isPastTour;
				}
				return (
					matchesCompany &&
					matchesMonth &&
					matchesDuration &&
					matchesDateFilter
				);
			});

			return filteredTours;
		}
	);

	const noToursFound = allFilteredTours.every((tours) => tours.length === 0);

	return (
		<section className='min-h-dvh flex flex-col gap-12 py-12'>
			<h2 className='text-5xl text-center'>
				<span className='italic font-bold'>Calendario </span>
				de paseos
			</h2>
			<Filters
				companies={companies}
				setSelectedCompany={setSelectedCompany}
				setSelectedMonth={setSelectedMonth}
				setSelectedDuration={setSelectedDuration}
				setSelectedDateFilter={setSelectedDateFilter}
			/>
			{noToursFound ? (
				<div className='h-full flex justify-center items-center'>
					<p>Actualmente no hay paseos que cumplan los filtros.</p>
				</div>
			) : (
				allFilteredTours.map((filteredTours, index) => {
					if (filteredTours.length === 0) {
						return null;
					}

					const month = Object.keys(groupedTours)[index];

					return (
						<div key={month}>
							<h3 className='pb-4 text-4xl'>
								{monthNamesInSpanish[month as Month]}
							</h3>
							<div className='grid grid-cols-1 gap-8 2xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4'>
								{filteredTours
									.sort(
										(a, b) =>
											new Date(a.startDate).getTime() -
											new Date(b.startDate).getTime()
									)
									.map(
										({
											id,
											title,
											image,
											startDate,
											endDate,
											companies: {
												name,
												phone,
												instagram
											}
										}) => (
											<Card
												key={id}
												title={title}
												image={image}
												companyName={name}
												whatsapp={phone}
												instagram={instagram}
												startDate={startDate}
												endDate={endDate}
											/>
										)
									)}
							</div>
						</div>
					);
				})
			)}
		</section>
	);
}
