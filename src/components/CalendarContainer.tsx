import React from "react";
import { CircularProgress, CssBaseline } from "@mui/material";
import calendarCallsFactory from "../lib/calendarCallsFactory";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Container from "@mui/material/Container";

import { a1, af } from "@fullcalendar/core/internal-common";
import DesktopCalendar from "./DesktopCalendar";
import MobileCalendar from "./MobileCalendar";

interface CalendarProps {
	getRef: Function;
	openEventModal: Function;
	isMobile: boolean;
}

const CalendarComponent: React.FC<CalendarProps> = ({
	getRef,
	openEventModal,
	isMobile,
}): JSX.Element => {
	const queryClient = useQueryClient();
	const { isLoading, isError, data, error } = useQuery({
		queryKey: ["calendar-fetch"],
		queryFn: async () => {
			let resp = await fetch("http://localhost:3000/api/getEvents");
			resp = await resp.json();
			return resp;
		},
	});

	const updateEventData = (newEv: af): void => {
		try {
			calendarCallsFactory(newEv.event, "update");
		} catch (e) {
			console.error(e);
		}
	};

	const handleEventClick = (ev: a1): void => {
		try {
			const event = ev.event;
			let resp = null;
			if (ev.jsEvent.shiftKey) {
				resp = calendarCallsFactory(event, "delete");
			} else if (ev.jsEvent.ctrlKey) {
				resp = calendarCallsFactory(event, "toggle");
			} else {
				openEventModal({
					_id: event.id,
					eventName: event.title,
					startDate: event.start?.toISOString(),
					endDate: event.end?.toISOString(),
				});
			}
			if (resp && getRef().current) {
				resp.then((response) => {
					queryClient.invalidateQueries({
						queryKey: ["calendar-fetch"],
					});
					getRef().current?.render();
				});
			}
		} catch (e) {
			console.error(e);
		}
	};

	if (isLoading) {
		return <CircularProgress />;
	}

	if (!isLoading && !isError) {
		return (
			<div>
				<Container
					sx={{
						paddingTop: "20px",
						paddingBottom: "50px",
						maxWidth: "70% !important",
					}}
				>
					<CssBaseline enableColorScheme>
						{isMobile ? (
							<MobileCalendar
								getRef={getRef}
								isLoading={isLoading}
								updateEvent={updateEventData}
								handleClick={handleEventClick}
								data={data}
							/>
						) : (
							<DesktopCalendar
								getRef={getRef}
								isLoading={isLoading}
								updateEvent={updateEventData}
								handleClick={handleEventClick}
								data={data}
							/>
						)}
					</CssBaseline>
				</Container>
			</div>
		);
	} else {
		return <></>;
	}
};

export default CalendarComponent;
