import clientPromise from "../../lib/mongodb";
import { Request, Response } from "../../types/callTypes";

export default async (request: Request, response: Response) => {
	try {
		const { ObjectId } = require("mongodb")
		const client = await clientPromise;
		const db = client.db("wineAround");
		const reqBody = JSON.parse(request.body)

		const post = await db.collection("events").updateOne(
			{ _id: ObjectId(reqBody._id) },
			{
				$set: {
					eventName: reqBody.eventName,
					startDate: reqBody.startDate,
					endDate: reqBody.endDate,
				}
			}
		)

		console.log(`Updated ${post.modifiedCount} row with _id : ${reqBody._id}`)
		response.json(post);
	} catch (e:any) {
		console.error(e);
		throw new Error(e).message;
	}
};