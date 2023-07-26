import clientPromise from "../../lib/mongodb";
import { Request, Response } from "../../types/callTypes";

const createEvent = async (request: Request, response: Response) => {
	try {
		const client = await clientPromise;
		const db = client.db("wineAround");
		const reqBody = JSON.parse(request.body);

		const post = await db.collection("events").insertOne({
			eventName: reqBody.eventName,
			startDate: reqBody.startDate,
			endDate: reqBody.endDate,
			deleted: false,
		});

		console.log(`Insert new event with _id: ${post.insertedId}`);
		response.json(post);
	} catch (e: any) {
		console.error(e);
		throw new Error(e.message);
	}
};

export default createEvent;
