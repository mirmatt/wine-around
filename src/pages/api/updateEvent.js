import clientPromise from "src/lib/mongodb";

export default async (request, response) => {
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
					// deleted: reqBody.deleted
				}
			}
		)

		console.log(`Updated ${post.modifiedCount} row with _id : ${reqBody._id}`)
		response.json(post);
	} catch (e) {
		console.error(e);
		throw new Error(e).message;
	}
};