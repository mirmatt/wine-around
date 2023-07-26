import React, { useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";
import { CircularProgress, CssBaseline } from "@mui/material";
import calendarCallsFactory from "../lib/calendarCallsFactory";
import calendarClasses from "./fullcalendar.module.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Container from "@mui/material/Container";

import { a1, af } from "@fullcalendar/core/internal-common";

interface CalendarProps {
	getRef: Function;
	isLoading: boolean;
	updateEvent: (af: af) => void;
	handleClick: (a1: a1) => void;
	data: Object;
}

const DesktopCalendar: React.FC<CalendarProps> = ({
	getRef,
	isLoading,
	updateEvent,
	handleClick,
	data,
}): JSX.Element => {
	if (isLoading) {
		return <CircularProgress />;
	}
	return (
		<FullCalendar
			ref={(() => {
				return getRef();
			})()}
			plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
			headerToolbar={{
				left: "prev,next today",
				center: "title",
				right: "",
			}}
			viewClassNames={calendarClasses.calendar_mainClass}
			events={data}
			eventClassNames={(ev) => {
				return ev.event.extendedProps.deleted ? calendarClasses.deleted_event : "";
			}}
			height={"80vh"}
			initialView="dayGridMonth"
			locale="it"
			allDaySlot={false}
			firstDay={1}
			slotMinTime="07:30:00"
			eventDrop={updateEvent}
			eventClick={handleClick}
			editable={true}
			selectable={true}
			buttonText={{
				today: "Oggi",
			}}
		/>
	);
};

export default DesktopCalendar;
