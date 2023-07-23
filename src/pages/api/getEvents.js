import clientPromise from "src/lib/mongodb";

export default async (request, response) => {
    try {
        const client = await clientPromise;
        const db = client.db("wineAround")

        const dates = await db
            .collection("events")
            .find()
            .toArray();

        response.json(dates.map((ev) => {
            return {
                id: ev._id.toString(),
                title: ev.eventName,
                start: ev.startDate,
                end: ev.endDate,
                deleted : ev.deleted
            }
        }))
    } catch (e) {
        console.error(e)
    }
}