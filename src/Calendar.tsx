import React, { useState } from "react";
import {
	format,
	startOfWeek,
	addDays,
	startOfMonth,
	endOfMonth,
	endOfWeek,
	isSameMonth,
	isSameDay,
	addMonths,
	subMonths
} from "date-fns";
import "./Calendar.css";
const Calendar = () => {
	const today = new Date();
	const [currentDate, setCurrentDate] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState(new Date());

	const header = () => {
		const dateFormat = "MMMM yyyy";
		return (
			<div className='flex justify-around items-center my-4 mx-4'>
				<div
					className='text-gray-800 font-bold icon cursor-pointer'
					onClick={prevMonth}
				>
					chevron_left
				</div>
				<div className='text-gray-800 font-bold '>
					<span>{format(currentDate, dateFormat)}</span>
				</div>
				<div
					className='text-gray-800 font-bold icon cursor-pointer'
					onClick={nextMonth}
				>
					chevron_right
				</div>
			</div>
		);
	};

	const days = () => {
		const dateFormat = "iiiii";
		const days = [];
		let startDate = startOfWeek(currentDate);
		for (let i = 0; i < 7; i++) {
			days.push(
				<div
					className='flex justify-center items-center h-8 text-teal-700 font-bold'
					key={i}
				>
					{format(addDays(startDate, i), dateFormat)}
				</div>
			);
		}
		return days;
	};

	const cells = () => {
		const monthStart = startOfMonth(currentDate);
		const monthEnd = endOfMonth(monthStart);
		const startDate = startOfWeek(monthStart);
		const endDate = endOfWeek(monthEnd);
		const dateFormat = "d";
		let days = [];
		let day = startDate;
		let formattedDate = "";
		while (day <= endDate) {
			formattedDate = format(day, dateFormat);
			const cloneDay = day;
			days.push(
				<div
					className={`flex justify-center items-center h-12 cursor-pointer ${
						!isSameMonth(day, monthStart)
							? "text-gray-500 pointer-events-none"
							: isSameDay(day, selectedDate)
							? "text-white bg-teal-700 rounded-md"
							: isSameDay(day, today)
							? "text-red-900 border-2 border-teal-700 rounded-md"
							: "text-gray-900"
					}`}
					key={day.toDateString()}
					onClick={() => onDateClick(cloneDay)}
				>
					<span className='p-1 leading-4 font-semibold'>{formattedDate}</span>
				</div>
			);
			day = addDays(day, 1);
		}
		return days;
	};

	const nextMonth = () => {
		setCurrentDate(addMonths(currentDate, 1));
	};

	const prevMonth = () => {
		setCurrentDate(subMonths(currentDate, 1));
	};

	const onDateClick = (day: any) => {
		setSelectedDate(day);
	};
	return (
		<div
			className='h-auto'
			style={{
				width: "375px"
			}}
		>
			{header()}
			<div className='grid grid-cols-7'>
				{days()}
				{cells()}
			</div>
		</div>
	);
};
export default Calendar;
