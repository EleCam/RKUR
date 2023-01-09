import React from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { createEventId } from "./event-utils";
import esLocale from "@fullcalendar/core/locales/es";
import Empresas from "./empresas";
/*{
    "id": "0",
    "title": "All-day event",
    "start": "2022-10-19"
}*/

export default class Calendar extends React.Component {
  state = {
    weekendsVisible: true,
    currentEvents: [],
    eventsFetch: [
      {
        id: "0",
        title: "All-day event",
        start: "2022-10-19",
      },
    ],
    readyEvents: false,
  };
  cambiar = () => {
    this.props.showModulo({
      title: "Lista Eventos",
      icon: "fas fa-dollar-sign",
    })
  };
  componentDidMount = () => {
  };
  render() {
    return (
      <>
        <div
          style={{ width: "100%" }}
          className="d-flex justify-content-center "
        >
          <div style={{ width: "1400px" }} className="demo-app">
            
            {/*this.renderSidebar()8*/}
            <div className="demo-app-main">
            <div className="w-100 d-flex justify-content-center "><div onClick={this.cambiar} className="btn btn-danger" >Cambiar a lista</div></div>
          
              <FullCalendar
                height={window.innerHeight * 0.8}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                locale={esLocale}
                initialView="dayGridMonth"
                //editable={true}
                //selectable={true}
                //selectMirror={true}
                dayMaxEvents={true}
                weekends={this.state.weekendsVisible}
                initialEvents={this.props.eventsFetch} // eventos que se mostraran
                /* initialEvents={setTimeout(() =>
                this.state.readyEvents ? console.log(this.state.eventsFetch) : console.log("no data" )
              , 1000)} */ select={
                  this.handleDateSelect
                } //Cuando seleccionamos un grid en el calendario
                eventContent={renderEventContent} // consumo de eventos
                eventClick={this.handleEventClick} //Click en eventos
                //eventsSet={this.handleEvents} // llamado para hacer la insersion de datos nuevos called after events are initialized/added/changed/removed
                /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
              />
            </div>
          </div>
        </div>
        
      </>
    );
  }

  renderSidebar() {
    return (
      <div className="demo-app-sidebar">
        <div className="demo-app-sidebar-section">
          <h2>Instructions</h2>
          <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div>
        <div className="demo-app-sidebar-section">
          <label>
            <input
              type="checkbox"
              checked={this.state.weekendsVisible}
              onChange={this.handleWeekendsToggle}
            ></input>
            toggle weekends
          </label>
        </div>
        <div className="demo-app-sidebar-section">
          <h2>All Events ({this.state.currentEvents.length})</h2>
          <ul>{this.state.currentEvents.map(renderSidebarEvent)}</ul>
        </div>
      </div>
    );
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible,
    });
  };

  handleDateSelect = (selectInfo) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  handleEventClick = (clickInfo) => {};

  handleEvents = (events) => {
    this.setState({
      currentEvents: events,
    });
  };
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>
        {formatDate(event.start, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </b>
      <i>{event.title}</i>
    </li>
  );
}
