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
					deleted: !reqBody.deleted
				}
			}
		)
		console.log(`Row ${reqBody._id} set to ${!reqBody.deleted}`)
		response.json(post);
	} catch (e:any) {
		console.error(e);
		throw new Error(e).message;
	}
};