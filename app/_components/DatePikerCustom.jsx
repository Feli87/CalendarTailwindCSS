'use client'
import React, { useState } from 'react';
import { 
    startOfMonth, 
    startOfWeek, 
    endOfMonth, 
    endOfWeek, 
    addDays, 
    addMonths, 
    subMonths, 
    format, 
    isSameMonth, 
    isSameDay, 
    isBefore, 
    isAfter 
} from 'date-fns';

const Calendar = ({busyDays}) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(false);

    const renderHeader = () => {
        return (
            <div className="flex justify-between items-center mb-4 p-3 rounded-md">
                <button className="text-white hover:bg-violet-700 p-2 rounded-md" onClick={prevMonth}>
                    Prev
                </button>
                <h2 className="text-xl font-bold text-white text-shadow-md shadow-black p-2 rounded-md">
                    {format(currentDate, 'MMMM yyyy')}
                </h2>
                <button className="text-white hover:bg-violet-700 p-2 rounded-md" onClick={nextMonth}>
                    Next
                </button>
            </div>
        );
    };

    const renderDaysOfWeek = () => {
        const dateFormat = 'EEE';
        const days = [];
        let startDate = startOfWeek(currentDate);

        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="text-center text-white bg-violet-500 w-[90px] rounded-md m-1" key={i}>
                    {format(addDays(startDate, i), dateFormat)}
                </div>
            );
        }

        return <div className="flex justify-between">{days}</div>;
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const dateFormat = 'd';
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = '';

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;
                days.push(
                    <div
                        className={` shadow-[5px_5px_0px_0px_rgba(109,40,217)]  text-center w-20 h-20 flex justify-center items-center font-bold rounded-md   m-2 border ${!isSameMonth(day, monthStart) ? 'text-gray-400' : ''
                            } ${isSameDay(day, currentDate) ? 'bg-violet-500 text-white cursor-pointer ' : (isBefore(day, monthStart) || isAfter(day, monthEnd)) ? 'bg-violet-300 text-gray-800 cursor-pointer' : busyDays.includes(day.toDateString()) ? 'cursor-not-allowed bg-gray-800 text-gray-200 cursor-not-allowed' : 'cursor-pointer bg-white text-gray-800 hover:bg-violet-200 bg-white text-gray-800 hover:bg-violet-200'} ${isSameDay(selectedDate, cloneDay) ? 'bg-green-400' : ''
                            }`}
                        key={day}
                        onClick={() => {
                            if (!busyDays.includes(cloneDay.toDateString())) {
                                setSelectedDate(cloneDay);
                            }else{
                                alert('Buzy Day');
                            }
                        }}
                    >
                        {formattedDate}
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div className="flex justify-between" key={day}>
                    {days}
                </div>
            );
            days = [];
        }
        return rows;
    };

    const nextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1));
    };

    const prevMonth = () => {
        setCurrentDate(subMonths(currentDate, 1));
    };

    return (
        <div className="w-[90vw] max-w-3xl mx-auto mt-4  p-8 rounded-md shadow-[0px_20px_20px_10px_#00000024]">
            {renderHeader()}
            {renderDaysOfWeek()}
            {renderCells()}
        </div>
    );
};

export default Calendar;

