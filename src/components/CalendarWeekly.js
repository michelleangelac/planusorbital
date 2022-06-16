import React from 'react';
import Calendar from 'short-react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';

export default function ReactCalendar() {
    const [date, onChange] = useState(new Date());

    return (
      <div>
        <Calendar 
        className='calendar' 
        onChange={onChange}
        value={date} 
        oneWeekCalendar={true}
        />
      </div>
    );
}