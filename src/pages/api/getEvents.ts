import clientPromise from "../../lib/mongodb";
import { Request, Response } from "../../types/callTypes";

const getEvent = async (request: Request, response: Response) => {
	try {
		const client = await clientPromise;
		const db = client.db("wineAround");

		const dates = await db
			.collection("events")
			.find()
			.toArray();

		response.json(
			dates.map((ev) => {
				return {
					id: ev._id.toString(),
					title: ev.eventName,
					start: ev.startDate,
					end: ev.endDate,
					deleted: ev.deleted,
				};
			})
		);
	} catch (e:any) {
		console.error(e);
	}
};

export default getEvent;
