'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Key } from 'react';
import Image from 'next/image';
import SocialIcon from './SocialIcon';

const iconRetinaUrl =
	'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png';
const iconUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png';
const shadowUrl =
	'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png';
L.Icon.Default.mergeOptions({
	iconRetinaUrl,
	iconUrl,
	shadowUrl
});

interface Tour {
	latitude: number;
	longitude: number;
	title: string;
	image: string;
	startDate: Date;
	endDate: Date;
	companies: {
		name: string;
		phone: string;
		instagram: string;
	};
}

interface MapProps {
	tours: Tour[];
}

const Map: React.FC<MapProps> = ({ tours }) => {
	const currentDate = new Date();

	return (
		<MapContainer
			center={[-33.0128, -55.7658]}
			className={'h-[100%] rounded-3xl'}
			zoom={7}
			minZoom={7.5}
			touchZoom={false}
			scrollWheelZoom={false}
		>
			<TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
			{tours
				.filter(({ startDate }) => new Date(startDate) > currentDate)
				.map(
					(
						{
							latitude,
							longitude,
							title,
							image,
							startDate,
							endDate,
							companies: { name, phone, instagram }
						},
						index: Key | null | undefined
					) => {
						const formatDateRange = (
							startDate: Date,
							endDate: Date
						) => {
							const start = new Date(
								startDate
							).toLocaleDateString('es-ES', {
								month: 'short',
								day: 'numeric'
							});
							const end = new Date(endDate).toLocaleDateString(
								'es-ES',
								{
									month: 'short',
									day: 'numeric'
								}
							);
							return start === end ? start : `${start} - ${end}`;
						};

						const whatsappMessage = `¡Hola! Estoy interesado en el tour "${title}" que se realizará el ${formatDateRange(
							startDate,
							endDate
						)}. ¿Podrían darme más información?`;

						return (
							<Marker
								key={index}
								position={[latitude, longitude]}
							>
								<Popup>
									<div className='h-full flex gap-4 p-2'>
										<Image
											src={image}
											alt={title}
											className='aspect-square h-full rounded-xl'
											width={150}
											height={150}
										/>
										<div className='flex flex-col gap-2'>
											<h3 className='text-lg font-bold'>
												{title}
											</h3>
											<p>
												{new Date(
													startDate
												).toLocaleDateString('es-ES', {
													month: 'long',
													day: 'numeric'
												})}
												{new Date(
													startDate
												).toLocaleDateString(
													'en-US'
												) !==
													new Date(
														endDate
													).toLocaleDateString(
														'en-US'
													) && (
													<>
														{' - '}
														{new Date(
															endDate
														).toLocaleDateString(
															'es-ES',
															{
																month: 'long',
																day: 'numeric'
															}
														)}
													</>
												)}
											</p>
											<div className='min-h-4 h-full relative'>
												<div className='absolute right-0 bottom-0 flex gap-2'>
													<SocialIcon
														type='whatsapp'
														username={phone}
														message={
															whatsappMessage
														}
													/>
													<SocialIcon
														type='instagram'
														username={instagram}
													/>
												</div>
											</div>
										</div>
									</div>
								</Popup>
							</Marker>
						);
					}
				)}
		</MapContainer>
	);
};

export default Map;
