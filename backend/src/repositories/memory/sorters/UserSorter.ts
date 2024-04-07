import { User } from "@aapc/types";
import Sorter from "./Sorter";


export type UserSortFields = "username" | "registeredAt" | "displayName"

export default class UserSorter implements Sorter<User, UserSortFields> {
    field: UserSortFields
    descending: boolean

    constructor(field: UserSortFields, descending: boolean = false) {
        this.field = field
        this.descending = descending
    }

    sort(r: User[]): User[] {
        return r
        // TODO: implement this
    }
}
