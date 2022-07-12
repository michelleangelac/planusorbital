import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const events = [{ start: new Date(), end: new Date(), title: "special event" }];

function BigCalendar() {
  const state = { events };

  return (
    <div className="App">
      <Calendar
        defaultDate={moment().toDate()}
        defaultView="month"
        events={state.events}
        localizer={localizer}
        resizable
        style={{ height: '60vh' }}
      />
    </div>
  );
}

export default BigCalendar;