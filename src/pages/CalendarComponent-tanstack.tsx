import React, { useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid'
import { CircularProgress, CssBaseline } from '@mui/material'
import calendarCallsFactory from "../lib/calendarCallsFactory"
import calendarClasses from "./fullcalendar.module.css"
import { useQuery, useQueryClient } from "@tanstack/react-query"

import { a1, af } from "@fullcalendar/core/internal-common"


interface CalendarProps {
    getRef: Function,
    openEventModal: Function
}

const CalendarComponent:React.FC<CalendarProps> = ({getRef, openEventModal}): JSX.Element => {

    const fullCalendarRef = useRef<FullCalendar>(null)
    const queryClient = useQueryClient()
    const { isLoading, isError, data, error } = useQuery({
        queryKey: ["calendar-fetch"],
        queryFn: async () => {
            let resp = await fetch("http://localhost:3000/api/getEvents")
            resp = await resp.json()
            return resp
        }
    })

    const updateEventData = (newEv: af): void => {
        try {
            calendarCallsFactory(newEv.event, "update")
        } catch (e) {
            console.error(e)
        }
    }


    const handleEventClick = (ev: a1): void => {
        try {
            const event = ev.event
            let resp = null
            if (ev.jsEvent.shiftKey) {
                resp = calendarCallsFactory(event, "delete")
            } else if (ev.jsEvent.ctrlKey) {
                resp = calendarCallsFactory(event, "toggle")
            } else {
                openEventModal({
                    _id: event.id,
                    eventName : event.title,
                    startDate : event.start?.toISOString(),
                    endDate : event.end?.toISOString(),
                })
            }
            if (resp && getRef().current) {
                resp.then(() => {
                    queryClient.invalidateQueries({
                        queryKey: ["calendar-fetch"]
                    })
                    getRef().current?.render()
                })
            }
        } catch (e) {
            console.error(e)
        }
    }

    if (isLoading) {
        return (
            <CircularProgress />
        )
    }

    if (!isLoading && !isError) {
        return (
            <div>
                <link href='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css' rel='stylesheet'></link>
                <link href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css' rel='stylesheet'></link>
                <div>
                    <CssBaseline enableColorScheme>
                        <FullCalendar
                            ref={(() => {
                                return getRef()
                            })()}
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            headerToolbar={{
                                left: "prev,next today",
                                center: "title",
                                right: ""
                            }}
                            events={data}
                            eventClassNames={(ev) => {
                                return ev.event.extendedProps.deleted ? calendarClasses.deleted_event : ""
                            }}
                            initialView="timeGridWeek"
                            locale="it"
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
    } else {
        return (<></>)
    }
}

export default CalendarComponent