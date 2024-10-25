import React from 'react';
import { useState } from 'react';
const WeekCalendar = () => {
    const getCurrentWeekDates = () => {
            const today = new Date();
            const currentDay = today.getDay();
            const diff = today.getDate() - currentDay;
            
            return Array.from({ length: 7 }, (_, index) => {
              const day = new Date(today.setDate(diff + index));
              return {
                date: day.getDate(),
                month: day.getMonth(),
                year: day.getFullYear(),
                isToday: new Date().toDateString() === day.toDateString()
              };
            });
          };
        
          const [weekDates] = useState(getCurrentWeekDates());
    return (
        <>
  <div className="bg-white p-4">
     <div className="grid grid-cols-7 gap-2 text-center">
         {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <div key={day} className="text-sm text-gray-500">
            {day}
         </div>
       ))}
         {weekDates.map((date, index) => (
          <div
            key={index}
           className={`text-sm p-2 rounded-lg ${
             date.isToday ? 'bg-blue-500 text-white' : ''
            }`}
           >
            {date.date}
        </div>
       ))}
      </div>
          </div>
  </>
    )
};

export default WeekCalendar;
