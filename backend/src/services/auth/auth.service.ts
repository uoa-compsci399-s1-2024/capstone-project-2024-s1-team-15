import { JwtPayload, sign, verify } from "jsonwebtoken"
import { Nullable } from "../../util/types/util.types"
import { User } from "@aapc/types"

export default class AuthContext {
    private readonly authServiceProvider: IAuthService

    constructor(authServiceProvider: IAuthService) {
        this.authServiceProvider = authServiceProvider
    }

    private issueToken(username: string): string {
        const secret = process.env.JWT_SECRET ?? "local"
        return sign(
            {
                username: username,
                roles: ["user"],
            },
            secret
        )
    }

    async login(username: string, password: string): Promise<Nullable<{ token: string; user: User }>> {
        try {
            await this.authServiceProvider.authenticateUser(username, password)

            // no error? means auth succeeded

            // update this to show additional user details
            const authenticatedUser = new User({
                username: username,
                email: username,
                displayName: "Admin",
                verified: true,
                registeredAt: undefined,
            })

            return { token: this.issueToken(username), user: authenticatedUser }
        } catch (e) {
            return null
        }
    }

    verifyToken(token: string): Nullable<string | JwtPayload> {
        const secret = process.env.JWT_SECRET ?? "local"
        try {
            return verify(token, secret)
        } catch (err) {
            return null
        }
    }
}

export interface IAuthService {
    authenticateUser(username: string, password: string): Promise<boolean>
    createUser(username: string, password: string): Promise<null>
    changePassword(username: string, oldPassword: string, newPassword: string): Promise<null>
    resetPassword(username: string, newPassword: string): Promise<null>
}
