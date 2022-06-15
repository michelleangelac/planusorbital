import React from 'react';
import Calendar from 'react-calendar';
import { useState } from 'react';

import "@fontsource/inter";
import './Calendar.css';

export default function RCalendar() {
    const [date, onChange] = useState(new Date());

    return (
      <div>
        <Calendar 
        className='react-calendar' 
        onChange={onChange}
        value={date} 
        />
      </div>
    );
}