import { InputValidationFailure } from "@/util/validation/validator"

export class ValidationError<T> extends Error {
    errors: InputValidationFailure<T>[]

    constructor(errors: InputValidationFailure<T>[]) {
        super()
        this.errors = errors
    }
}
