import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const events = [{ start: new Date(), end: new Date(), title: "special event" }];

const DnDCalendar = withDragAndDrop(Calendar);

function AgendaCalendar(props) {
  const events = props.events;

  // console.log(state);

  // const onEventResize = (data) => {
  //   const { start, end } = data;
  //   setState((state) => {
  //     state.events[0].start = start;
  //     state.events[0].end = end;
  //     return { events: state.events };
  //   });
  // };

  // const onEventDrop = (data) => {
  //   console.log(data);
  // };

  const onEventResize = (data) => {
    const { start, end } = data;
    setState((state) => {
      state.events[0].start = start;
      state.events[0].end = end;
      return { events: state.events };
    });
  };
  
  const onEventDrop = (data) => {
    console.log(data);
  };

  return (
    <div className="App">
      <DnDCalendar
        defaultDate={moment().toDate()}
        events={events}
        localizer={localizer}
        //onEventDrop={onEventDrop}
        //onEventResize={onEventResize}
        resizable
        style={{ height: '60vh' }}
        view='agenda' 
        views={['agenda']}
      />
    </div>
  );
}

export default AgendaCalendar;