import EventType from "../types/eventType";
import { classMapping } from "../classes/calendar";

export default async function calendarCallsFactory(eventData: EventType, type: string) {
	const callObject = new classMapping[type](
		eventData.id,
		eventData.title,
		eventData.start,
		eventData.end,
		eventData.extendedProps.deleted
	);
	let resp = await callObject.call();
	resp = await resp.json();
	console.log(resp);
	return resp;
}
