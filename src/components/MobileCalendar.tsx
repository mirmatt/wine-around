import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";
import { CircularProgress } from "@mui/material";
import calendarClasses from "./fullcalendar.module.css";

import { a1, af } from "@fullcalendar/core/internal-common";

interface CalendarProps {
	getRef: Function;
	isLoading: boolean;
	updateEvent: (af: af) => void;
	handleClick: (a1: a1) => void;
	data: Object;
}

const MobileCalendar: React.FC<CalendarProps> = ({
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
				left: "title",
				center: "",
				right: "today",
			}}
			footerToolbar={{
				left: "prev",
				right: "next",
			}}
			viewClassNames={calendarClasses.calendar_mainClass}
			events={data}
			eventClassNames={(ev) => {
				return ev.event.extendedProps.deleted ? calendarClasses.deleted_event : "";
			}}
			height={"80vh"}
			titleFormat={{ month: "long", day: "numeric" }}
			initialView="timeGridDay"
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

export default MobileCalendar;
