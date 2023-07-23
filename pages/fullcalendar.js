import React, { useRef} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid'
import Link from 'next/link'
import { CssBaseline} from '@mui/material'
import CalendarSidebar from "components/CalendarSidebar"
import calendarCallsFactory from "./lib/calendarCallsFactory.ts"
import calendarClasses from "./fullcalendar.module.css"

export default function fullCalendar({}) {

    const fullCalendarRef = useRef();

    const upSetCalendarView = (newView) => {
        fullCalendarRef.current.calendar.changeView(newView)
    }


    const updateEventData = async (newEv) => {
        try {
            let resp = await calendarCallsFactory(newEv.event, "update")
            console.log(resp)
            fullCalendarRef.current.calendar.refetchEvents()
        } catch (e) {
            console.error(e)
        }
    }


    const handleEventClick = async (ev) => {
        if (ev.jsEvent.shiftKey) {
            await calendarCallsFactory(ev.event, "delete")
            fullCalendarRef.current.calendar.refetchEvents()
        } else if (ev.jsEvent.ctrlKey) {
            await calendarCallsFactory(ev.event, "toggle")
            fullCalendarRef.current.calendar.refetchEvents()
        }
    }


    return (
        <div>
            <link href='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css' rel='stylesheet'></link>
            <link href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css' rel='stylesheet'></link>
            <Link href="/">Home</Link>
            <CalendarSidebar setCalendar={upSetCalendarView}/>
            <div style={{marginLeft:"150px", marginTop:"50px", marginRight:"30px"}}>
                <CssBaseline enableColorScheme>
                    <FullCalendar
                        ref={fullCalendarRef}
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: ""
                          }}
                        events="http://localhost:3000/api/getEvents"
                        eventClassNames={(ev) => {
                            return ev.event.extendedProps.deleted ? calendarClasses.deleted_event : ""
                        }}
                        initialView="timeGridWeek"
                        slotMinTime="08:30:00"
                        slotMaxTime="19:00:00"
                        themeSystem="boostrap5"
                        height="75vh"
                        eventDrop={updateEventData}
                        eventClick={handleEventClick}
                        editable={true}
                        selectable={true}
                    />
                </CssBaseline>
            </div>
        </div>
    );
}