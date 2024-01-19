import { randomUUID } from "node:crypto"

class Student {
    private id: string
    private name: string

    constructor(name: string, id?: string) {
        this.name = name
        this.id = id ?? randomUUID()
    }
}