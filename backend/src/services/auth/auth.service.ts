import { JwtPayload, sign, verify } from "jsonwebtoken"
import { Nullable } from "@/util/types/types"
import { IUser, UserScope } from "@aapc/types"

export default class AuthContext {
    private readonly authServiceProvider: IAuthService
    private readonly jwtSecret: string

    constructor(authServiceProvider: IAuthService, jwtSecret: string = "local") {
        this.authServiceProvider = authServiceProvider
        this.jwtSecret = jwtSecret
    }

    private issueToken(username: string, scopes: UserScope[]): string {
        return sign(
            {
                username: username,
                scopes: scopes,
            },
            this.jwtSecret
        )
    }

    async login(user: IUser, password: string): Promise<Nullable<string>> {
        if (await this.authServiceProvider.authenticateUser(user.username, password)) {
            return this.issueToken(user.username, user.scopes)
        }
        return null
    }

    verifyToken(token: string): Nullable<string | JwtPayload> {
        try {
            return verify(token, this.jwtSecret)
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
