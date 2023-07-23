import React, { useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid'
import { CssBaseline } from '@mui/material'
import CalendarSidebar from "../components/CalendarSidebar"
import calendarCallsFactory from "../lib/calendarCallsFactory"
import calendarClasses from "./fullcalendar.module.css"
import { useQuery } from "@tanstack/react-query"

import { a1, af } from "@fullcalendar/core/internal-common"

export default function CalendarComponent({ }): JSX.Element {

    const fullCalendarRef = useRef<FullCalendar>(null)

    const upSetCalendarView = (newView: string) => {
        if (fullCalendarRef.current) {
            fullCalendarRef.current.getApi().changeView(newView)
        }
    }


    const updateEventData = (newEv: af): void => {
        try {
            calendarCallsFactory(newEv.event, "update")
        } catch (e) {
            console.error(e)
        }
    }


    const handleEventClick = (ev: a1): void => {
        try {
            let resp = null
            if (ev.jsEvent.shiftKey) {
                resp = calendarCallsFactory(ev.event, "delete")
            } else if (ev.jsEvent.ctrlKey) {
                resp = calendarCallsFactory(ev.event, "toggle")
            }
            if (resp && fullCalendarRef.current) {
                resp.then((promise) => {
                    console.log(promise)
                    fullCalendarRef.current?.getApi().refetchEvents()
                })
            }
        } catch (e) {
            console.error(e)
        }
    }


    return (
        <div>
            <link href='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css' rel='stylesheet'></link>
            <link href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css' rel='stylesheet'></link>
            <CalendarSidebar setCalendar={upSetCalendarView} />
            <div style={{ marginLeft: "150px", marginTop: "50px", marginRight: "30px" }}>
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
                        height="90vh"
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