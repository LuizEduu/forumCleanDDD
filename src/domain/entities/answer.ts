import { randomUUID } from "node:crypto"

export class Answer {
    private id: string
    private content: string

    constructor(content: string, id?: string) {
        this.content = content
        this.id = id ?? randomUUID()
    }
}