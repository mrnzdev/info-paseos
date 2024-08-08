import React, { useMemo } from 'react';
import Select from './Select';

interface Company {
	id: number;
	name: string;
}

interface FiltersProps {
	companies: Company[];
	setSelectedCompany: (companyName: string) => void;
	setSelectedMonth: (month: string) => void;
	setSelectedDuration: (duration: string) => void;
	setSelectedDateFilter: (dateFilter: string) => void;
}

const months = [
	{ value: 'January', label: 'Enero' },
	{ value: 'February', label: 'Febrero' },
	{ value: 'March', label: 'Marzo' },
	{ value: 'April', label: 'Abril' },
	{ value: 'May', label: 'Mayo' },
	{ value: 'June', label: 'Junio' },
	{ value: 'July', label: 'Julio' },
	{ value: 'August', label: 'Agosto' },
	{ value: 'September', label: 'Septiembre' },
	{ value: 'October', label: 'Octubre' },
	{ value: 'November', label: 'Noviembre' },
	{ value: 'December', label: 'Diciembre' }
];

const durations = [
	{ value: 'same-day', label: 'Por el día' },
	{ value: 'weekend', label: 'Fin de semana' },
	{ value: 'multiple-days', label: 'Varios días' }
];

const Filters: React.FC<FiltersProps> = ({
	companies,
	setSelectedCompany,
	setSelectedMonth,
	setSelectedDuration,
	setSelectedDateFilter
}) => {
	const companyOptions = useMemo(
		() =>
			companies.map((company) => ({
				value: company.name,
				label: company.name
			})),
		[companies]
	);

	const dateFilterOptions = [
		{ value: 'all', label: 'Todos los paseos' },
		{ value: 'future', label: 'Próximos paseos' },
		{ value: 'past', label: 'Previos paseos' }
	];

	return (
		<div className='flex flex-col lg:flex-row flex-wrap gap-8'>
			<Select
				options={companyOptions}
				onChange={(value) => setSelectedCompany(value)}
				label='Seleccionar empresa'
			/>
			<Select
				options={months}
				onChange={(value) => setSelectedMonth(value)}
				label='Seleccionar mes'
			/>
			<Select
				options={durations}
				onChange={(value) => setSelectedDuration(value)}
				label='Seleccionar duración'
			/>
			<Select
				options={dateFilterOptions}
				onChange={(value) => setSelectedDateFilter(value)}
				label='Seleccionar fecha'
			/>
		</div>
	);
};

export default Filters;
