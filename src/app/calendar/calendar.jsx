"use client"; // Enables client-side rendering in Next.js

import React, { useState } from 'react';
import CalendarItem from './calendar-item';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Get the number of days in the current month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInTheMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfTheMonth = new Date(year, month, 1).getDay();

    console.log(firstDayOfTheMonth);

    return Array.from({length: daysInTheMonth},(_, index) => {
      return {
        date: index + 1,
        day: dayOfTheWeek[(firstDayOfTheMonth + index)%7]
      }
    })
    
    //return new Date(year, month + 1, 0).getDate();
  };

  // Move to the previous month
  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  // Move to the next month
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Generate the days for the current month
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    
    return daysInMonth;

    //console.log(daysInMonth);

    //return Array.from({ length: daysInMonth.length }, (_, index) => index + 1);
  };


  //Global variables

  const dayOfTheWeek = ["Sun","Mon", "Tue","Wed","Thu","Fri","Sat"];

  const days = generateCalendarDays();
    
  return (
    <div className='max-w-screen-md mx-auto'>
      <div className="grid grid-cols-1 gap-4 mt-8">
      {/* Header with month and navigation */}
      <div className="flex justify-between ml-24 items-center mb-6">
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
          onClick={previousMonth}
        >
          Previous
        </button>
        <h2 className="text-xl font-bold">
          {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
        </h2>
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
          onClick={nextMonth}
        >
          Next
        </button>
      </div>

      {/* Calendar layout */}
      <div className="flex gap-2 justify-start">
        {/* Render all days of the month in the top row */}
        {days.map(({date, day}) => (
          <div key={date} className="text-center">
            <div className="text-xs font-semibold">{date}<br></br><span className="text-xs font-medium">{day}</span></div>

            {/* Render 10 fields underneath each day */}
            <div className="grid grid-cols-1">
              {[...Array(10)].map((_, fieldIndex) => (
                <CalendarItem key={fieldIndex} /> 
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Calendar;
