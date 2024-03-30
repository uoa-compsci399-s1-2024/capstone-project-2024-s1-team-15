/**
 * An interface representing a user.
 */
export interface IUser {
    username: string
    email: string
    displayName: string
    verified: boolean
    registeredAt: string
}

/**
 * A class representing a user.
 */
export default class User implements IUser {
    /**
     * The default constructor with no arguments.
     */
    constructor();

    /**
     * Overloaded constructor for instantiating a User with a generic object.
     * @param obj - A partial object representing IUser
     */
    constructor(obj: Partial<IUser>);

    constructor(obj?: Partial<IUser>) {
        this.username = obj?.username ?? ""
        this.email = obj?.email ?? ""
        this.displayName = obj?.displayName ?? ""
        this.verified = obj?.verified ?? false
        this.registeredAt = (obj?.registeredAt ? new Date(obj.registeredAt) : new Date()).toISOString()
    }

    username: string
    email: string
    displayName: string
    verified: boolean
    registeredAt: string
}
