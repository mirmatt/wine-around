import clientPromise from "../../lib/mongodb";
import { Request, Response } from "../../types/callTypes";

const deleteEvent = async (request: Request, response: Response) => {
	try {
		const { ObjectId } = require("mongodb");
		const client = await clientPromise;
		const db = client.db("wineAround");
		const reqBody = JSON.parse(request.body);

		const post = await db.collection("events").deleteOne({ _id: ObjectId(reqBody._id) });
		console.log(`Deleted ${post.deletedCount} rows with _id : ${reqBody._id}`);
		response.json(post);
	} catch (e:any) {
		console.error(e);
		throw new Error(e).message;
	}
};

export default deleteEvent;
