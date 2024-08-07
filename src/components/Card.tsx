import Image from 'next/image';
import SocialIcon from './SocialIcon';

interface CardProps {
	title: string;
	image: string;
	companyName: string;
	whatsapp: string;
	instagram: string;
	startDate: Date;
	endDate: Date;
}

export default function Card({
	title,
	image,
	companyName,
	whatsapp,
	instagram,
	startDate,
	endDate
}: CardProps) {
	const formatDateRange = (startDate: Date, endDate: Date) => {
		const start = new Date(startDate).toLocaleDateString('es-ES', {
			month: 'short',
			day: 'numeric'
		});
		const end = new Date(endDate).toLocaleDateString('es-ES', {
			month: 'short',
			day: 'numeric'
		});
		return start === end ? start : `${start} - ${end}`;
	};

	const whatsappMessage = `¡Hola! Estoy interesado en el tour "${title}" que se realizará el ${formatDateRange(
		startDate,
		endDate
	)}. ¿Podrían darme más información?`;

	return (
		<article className='flex flex-col gap-2 p-4 text-black bg-white rounded-xl'>
			<Image
				src={image}
				alt={title}
				className='aspect-square w-full rounded-xl'
				width={200}
				height={200}
			/>
			<h3 className='text-xl font-bold'>{title}</h3>
			<p>{companyName}</p>
			<p>
				{new Date(startDate).toLocaleDateString('es-ES', {
					month: 'long',
					day: 'numeric'
				})}
				{new Date(startDate).toLocaleDateString('en-US') !==
					new Date(endDate).toLocaleDateString('en-US') && (
					<>
						{' - '}
						{new Date(endDate).toLocaleDateString('es-ES', {
							month: 'long',
							day: 'numeric'
						})}
					</>
				)}
			</p>
			<div className='min-h-4 h-full relative'>
				<div className='absolute right-0 bottom-0 flex gap-2'>
					<SocialIcon
						type='whatsapp'
						username={whatsapp}
						message={whatsappMessage}
					/>
					<SocialIcon
						type='instagram'
						username={instagram}
					/>
				</div>
			</div>
		</article>
	);
}
