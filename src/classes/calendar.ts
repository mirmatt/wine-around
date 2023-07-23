import { ObjectId } from "mongodb"

if (
    !process.env.NEXT_PUBLIC_BASE_API_URL
) {
    throw new Error('Invalid/Missing environment variable: "BASE_API_URL"')
}

enum statusLevels {
    OK = "OK",
    error = "error",
    processing = "processing",
    waiting = "waiting"
}

enum methods {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

abstract class BaseCall {
    abstract endpoint: string
    abstract method: methods
    protected _id: ObjectId
    protected eventName: string
    protected startDate: Date
    protected endDate: Date
    protected deleted: boolean
    protected body: Object
    protected status: statusLevels
    protected errorMessage: any = null

    constructor(
        _id : ObjectId,
        eventName: string,
        startDate: Date,
        endDate: Date,
        deleted: boolean,
    ) {
        this._id = _id
        this.eventName = eventName
        this.startDate = startDate
        this.endDate = endDate
        this.deleted = deleted
        this.body = {}
        this.status = statusLevels.waiting
    }

    async call(): Promise<any> {
        this.status = statusLevels.processing
        try {
            let resp = await fetch(this.endpoint, {
                method: this.method,
                body: JSON.stringify(this.body)
            })
            this.status = statusLevels.OK
            return resp

        } catch (e: any) {
            this.status = statusLevels.error
            this.errorMessage = e
        }
    }
    getStatus(): string {
        return this.status
    }
}


class Delete extends BaseCall {
    endpoint: string;
    method: methods;

    body: Object;

    constructor(
        ...params: ConstructorParameters<typeof BaseCall>
    ) {
        super(...params)

        this.endpoint = process.env.NEXT_PUBLIC_DELETE_ENDPOINT
        this.method = methods.DELETE
        this.body = {
            "_id" : this._id
        }
    }
}


class Toggle extends BaseCall {
    endpoint: string;
    method: methods;

    body: Object;

    constructor(
        ...params: ConstructorParameters<typeof BaseCall>
    ) {
        super(...params)

        this.endpoint = process.env.NEXT_PUBLIC_TOGGLE_ENDPOINT
        this.method = methods.DELETE
        this.body = {
            "_id" : this._id,
            "deleted" : this.deleted
        }
    }
}



class Update extends BaseCall {
    endpoint: string;
    method: methods;

    body: Object;

    constructor(
        ...params: ConstructorParameters<typeof BaseCall>
    ) {
        super(...params)

        this.endpoint = process.env.NEXT_PUBLIC_UPDATE_ENDPOINT
        this.method = methods.POST
        this.body = {
            "_id" : this._id,
            "eventName" : this.eventName,
            "startDate" : this.startDate,
            "endDate" : this.endDate
        }
    }
}


export const classMapping: any = {
    "delete" : Delete,
    "toggle" : Toggle,
    "update" : Update
}