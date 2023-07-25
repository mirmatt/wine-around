import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Button, DialogContent } from "@mui/material";

import TextField from '@mui/material/TextField';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from "@mui/x-date-pickers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DateTime } from "luxon"
import { ObjectId } from "mongodb";

interface ModalProps {
    open: boolean,
    setOpen: Function,
    eventData: EventBody | null
}

export class EventBody {
    constructor(
        public _id: ObjectId | string | undefined,
        public eventName: string | undefined,
        public startDate: Date | DateTime | string | null,
        public endDate: Date | DateTime | string | null
    ) { }
}

const CreateModal: React.FC<ModalProps> = ({ open, setOpen, eventData }) => {
    const { DateTime } = require("luxon")
    const createClient = useQueryClient()
    const { mutate } = useMutation(createNewEvent, {
        onSuccess: (): void => {
            closeModal()
        },
        onSettled: (): void => {
            createClient.invalidateQueries()
        }
    })

    const [errorBody, setErrorBody] = React.useState<boolean>(false)
    const [eventBody, setEventData] = React.useState<EventBody>((): EventBody => {
        return new EventBody(
            eventData?._id,
            eventData?.eventName,
            eventData?.startDate ? DateTime.fromISO(eventData?.startDate) : getRoundUpTime(),
            eventData?.endDate ? DateTime.fromISO(eventData?.endDate) : getRoundUpTime().plus({hours:1})
        )
    })

    function closeModal(): void {
        setOpen(false)
    }

    async function createNewEvent(body: EventBody): Promise<JSON | void> {
        if (!body.eventName) {
            setErrorBody(true)
            throw Error("Titolo mancante nella creazione di un nuovo evento")
        }
        const endPoint = body._id ? process.env.NEXT_PUBLIC_UPDATE_ENDPOINT : process.env.NEXT_PUBLIC_CREATE_ENDPOINT

        let resp = await fetch(endPoint, {
            method: "POST",
            body: JSON.stringify(body)
        })
        return await resp.json()
    }

    function getRoundUpTime(): DateTime {
        const now = DateTime.now()
        const currentMinutes = now.minute
        if (currentMinutes < 30) {
            return now.minus({ minute: currentMinutes - 30 })
        } else {
            return now.minus({ minute: now.minute }).plus({ hours: 1 })
        }
    }
    return (
        <Dialog open={open} onClose={closeModal} fullWidth={true}>
            <DialogTitle sx={{ m: 0, p: 2 }}>
                {eventBody._id ? "Modifica Evento" : "Crea nuovo Evento"}
                <IconButton
                    onClick={closeModal}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                    }}
                >
                    <CloseIcon></CloseIcon>
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <TextField id="title-field" label="Titolo" error={errorBody} value={eventBody.eventName} onChange={(val) => {
                    setErrorBody(false)
                    setEventData(new EventBody(eventBody._id, val.target.value, eventBody.startDate, eventBody.endDate))
                }}
                ></TextField>
                <LocalizationProvider dateAdapter={AdapterLuxon}>

                    <DateTimePicker minutesStep={30} value={eventBody?.startDate} onChange={(val) => {
                        eventBody.startDate = val
                    }} label="Inizio evento"
                    ></DateTimePicker>

                    <DateTimePicker minutesStep={30} value={eventBody?.endDate} onChange={(val) => {
                        eventBody.endDate = val
                    }} label="Fine evento"
                    ></DateTimePicker>
                </LocalizationProvider>

            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    mutate(eventBody)
                }}>
                    {eventBody._id ? "Modifica" : "Crea"}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateModal