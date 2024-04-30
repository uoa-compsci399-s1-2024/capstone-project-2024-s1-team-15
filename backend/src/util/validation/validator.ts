import { UserScope } from "@aapc/types";

export type InputParameterLocation = "query" | "path" | "body"

export interface InputValidationFailure<T> {
    field: keyof T
    location: string
    message: string
}

export default class Validator<T> {
    errors: InputValidationFailure<T>[] = []
    location: InputParameterLocation

    constructor(location: InputParameterLocation) {
        this.location = location
    }

    checkMissing(obj: any, k: keyof T): any | undefined {
        if (obj[k] === undefined) {
            this.errors.push({
                field: k,
                location: this.location,
                message: `Required attribute not present`,
            })
        } else {
            return obj[k]
        }
    }

    checkNumber(obj: any, k: keyof T, min: number = 1, max: number = Infinity): number | undefined {
        const p = obj[k]
        if (p === undefined) return undefined
        const pn: number = Number(p)
        if (isNaN(pn)) {
            this.errors.push({
                field: k,
                location: this.location,
                message: `Expected value of type number, received '${String(p)}' which is not a number`,
            })
        } else if (min > pn || pn > max) {
            this.errors.push({
                field: k,
                location: this.location,
                message: `Expected value between ${String(min)} to ${String(max)}, received ${String(pn)}`,
            })
        } else {
            return pn
        }
    }

    checkBoolean(obj: any, k: keyof T): boolean | undefined {
        const p: string = obj[k]
        if (p === undefined) return undefined
        if (p.toLowerCase() === "true" || p === "1") {
            return true
        } else if (p.toLowerCase() === "false" || p === "0") {
            return false
        } else {
            this.errors.push({
                field: k,
                location: this.location,
                message: `Expected value of type boolean, got '${String(p)}' which is not a boolean value`,
            })
        }
    }

    checkScopes(obj: any, k: keyof T): UserScope[] | undefined {
        const param: any = obj[k]
        if (param === undefined) return undefined
        // Check if param is an array
        if (Array.isArray(param)) {
            // Check if each value in the param is a UserScope
            const messages: string[] = []
            for (let i = 0; i < param.length; i++) {
                if (!Object.values(UserScope).includes(param[i])) {
                    messages.push(`Array position ${i}: '${param[i]}' is not a valid UserScope`)
                }
            }
            if (messages.length === 0) {
                return <UserScope[]>param
            } else {
                this.errors.push({
                    field: k,
                    location: this.location,
                    message: messages.join("; ")
                })
            }
        } else {
            this.errors.push({
                field: k,
                location: this.location,
                message: `Expected array, got '${param}' which is not an array`
            })
        }
    }
}
