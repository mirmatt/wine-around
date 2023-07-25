import { useState, useRef, RefObject } from 'react'
import Head from 'next/head'
import CalendarComponent from "./CalendarComponent-tanstack"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Grid from '@mui/material/Grid'; // Grid version 1
import HeaderMenu from "../components/HeaderMenu";
import FullCalendar from "@fullcalendar/react";
import CreateModal from "../components/CreateModal";
import { EventBody } from "../components/CreateModal";

const clientQuery = new QueryClient();

export default function Home({ }) {

    const [openDialog, setOpenDialog] = useState(false)
    const [eventDataToModify, setEventDataToModify] = useState<EventBody | null>(null)

    const openAndFillDialog = (eventData:EventBody):void => {
        setEventDataToModify(eventData)
        setOpenDialog(true)
    }

    const calendarRef = useRef<FullCalendar>(null)
    const getCalendarRef = ():RefObject<FullCalendar> => {
        return calendarRef
    }

    return (
        <>
            <Head>
                <title>Calendar WineAround App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <QueryClientProvider client={clientQuery}>
                <Grid>
                    {openDialog && (
                        <CreateModal open={openDialog} setOpen={setOpenDialog} eventData={eventDataToModify}></CreateModal>
                    )}
                    <HeaderMenu calendarRef={calendarRef} openDialog={openAndFillDialog}></HeaderMenu>
                    <div className="container">
                        <CalendarComponent getRef={getCalendarRef} openEventModal={openAndFillDialog}/>
                    </div>
                </Grid>
            </QueryClientProvider>
        </>
    )
}


// TODO
// Passare a typescript
// Rework Grafico