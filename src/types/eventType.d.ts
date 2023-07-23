
export default interface EventType {
    id: ObjectId,
    title: string | null,
    start: Date | null,
    end: Date | null,
    extendedProps: any | null
}