export abstract class HTTPError extends Error {
    public status: number

    protected constructor(status: number) {
        super()
        this.status = status
        this.name = "HTTPError"
    }
}

export class NotFoundError extends HTTPError {
    constructor(message?: string) {
        super(404)
        this.message = message ?? "Not Found"
        this.name = this.status.toString()
    }
}

export class UnauthorizedError extends HTTPError {
    constructor(message?: string) {
        super(401)
        this.message = message ?? "Unauthorized"
        this.name = this.status.toString()
    }
}

export class BadRequestError extends HTTPError {
    constructor(message?: string) {
        super(400)
        this.message = message ?? "Bad Request"
        this.name = this.status.toString()
    }
}
