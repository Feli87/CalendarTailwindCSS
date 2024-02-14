import React, { useState } from 'react';
import { startOfMonth, startOfWeek, endOfMonth, endOfWeek, addDays, addMonths, subMonths, format, isSameMonth, isSameDay } from 'date-fns';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const renderHeader = () => {
        return (
            <div className="flex justify-between items-center mb-4">
                <button className="text-blue-500" onClick={prevMonth}>
                    Prev
                </button>
                <h2 className="text-xl font-bold">
                    {format(currentDate, 'MMMM yyyy')}
                </h2>
                <button className="text-blue-500" onClick={nextMonth}>
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
                <div className="text-center" key={i}>
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
                        className={`text-center border ${!isSameMonth(day, monthStart) ? 'text-gray-400' : ''
                            } ${isSameDay(day, currentDate) ? 'bg-blue-200' : ''}`}
                        key={day}
                        onClick={() => setCurrentDate(cloneDay)}
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
        <div className="w-80 mx-auto mt-4">
            {renderHeader()}
            {renderDaysOfWeek()}
            {renderCells()}
        </div>
    );
};

export default Calendar;
