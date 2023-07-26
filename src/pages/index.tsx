import { useState, useRef, RefObject, useEffect } from "react";
import Head from "next/head";
import CalendarContainer from "./CalendarContainer";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Grid from "@mui/material/Grid"; // Grid version 1
import HeaderMenu from "../components/HeaderMenu";
import FullCalendar from "@fullcalendar/react";
import CreateModal from "../components/CreateModal";
import { EventBody } from "../components/CreateModal";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const clientQuery = new QueryClient();

export default function Home({}) {
	const [width, setWidth] = useState<number>(1400);
	const isMobile = width <= 768;

	function handleWindowSizeChange() {
		setWidth(window.innerWidth);
	}
	useEffect(() => {
		window.addEventListener("resize", handleWindowSizeChange);
		return () => {
			window.removeEventListener("resize", handleWindowSizeChange);
		};
	}, []);

	const [openDialog, setOpenDialog] = useState(false);
	const [eventDataToModify, setEventDataToModify] = useState<EventBody | null>(null);
	const muiTheme = createTheme({
		palette: {
			mode: "dark",
		},
	});

	const openAndFillDialog = (eventData: EventBody): void => {
		setEventDataToModify(eventData);
		setOpenDialog(true);
	};

	const calendarRef = useRef<FullCalendar>(null);
	const getCalendarRef = (): RefObject<FullCalendar> => {
		return calendarRef;
	};

	return (
		<>
			<Head>
				<title>Calendar WineAround App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<QueryClientProvider client={clientQuery}>
				<ThemeProvider theme={muiTheme}>
					<Grid>
						{openDialog && (
							<CreateModal
								open={openDialog}
								setOpen={setOpenDialog}
								eventData={eventDataToModify}
							></CreateModal>
						)}
						<HeaderMenu
							calendarRef={calendarRef}
							openDialog={openAndFillDialog}
							isMobile={isMobile}
						></HeaderMenu>
						<CalendarContainer
							getRef={getCalendarRef}
							openEventModal={openAndFillDialog}
							isMobile={isMobile}
						/>
					</Grid>
				</ThemeProvider>
			</QueryClientProvider>
		</>
	);
}

// TODO
// Passare a typescript
// Rework Grafico
