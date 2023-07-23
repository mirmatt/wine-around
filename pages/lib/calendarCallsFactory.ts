import { EventType, classMapping } from "../types/calendar"

export default async function calendarCallsFactory(eventData : EventType, type : string) {
    const callObject = new classMapping[type](
        eventData.id,
        eventData.title,
        eventData.start,
        eventData.end,
        eventData.extendedProps.deleted
    )
    let resp = await callObject.call()
    resp = await resp.json()
    return resp
}