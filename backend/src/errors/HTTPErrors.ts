import { InputValidationFailure } from "@/util/validation/validator"

export abstract class HTTPError extends Error {
    public status: number
    public errors: InputValidationFailure<any>[] = []

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

export class ForbiddenError extends HTTPError {
    constructor(message?: string) {
        super(403)
        this.message = message ?? "Forbidden"
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
    constructor(message?: string, errors?: InputValidationFailure<any>[]) {
        super(400)
        this.message = message ?? "Bad Request"
        this.errors = errors ?? []
        this.name = this.status.toString()
    }
}
