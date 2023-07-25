import { OutgoingMessage } from "http";
import { Readable } from "stream";

export interface Request extends Readable {
    body: string
}

export interface Response extends OutgoingMessage {
    json: Function
}
