import { sign, verify } from "jsonwebtoken"
import { Nullable } from "@/util/types/types"
import { IUser, UserScope } from "@aapc/types"

export type JWTPayload = {
    username: string
    scopes: UserScope[]
}

export default class AuthContext {
    readonly authServiceProvider: IAuthService
    private readonly jwtSecret: string

    constructor(authServiceProvider: IAuthService, jwtSecret: string = "local") {
        this.authServiceProvider = authServiceProvider
        this.jwtSecret = jwtSecret
    }

    private issueToken(payload: JWTPayload): string {
        return sign(payload, this.jwtSecret)
    }

    async login(user: IUser, password: string): Promise<Nullable<string>> {
        if (await this.authServiceProvider.authenticateUser(user.username, password)) {
            return this.issueToken({
                username: user.username,
                scopes: user.scopes,
            })
        }
        return null
    }

    issueTokenFromUser(user: IUser): string {
        return this.issueToken({
            username: user.username,
            scopes: user.scopes
        })
    }

    verifyToken(token: string): Nullable<JWTPayload> {
        try {
            return <JWTPayload>verify(token, this.jwtSecret)
        } catch (err) {
            return null
        }
    }
}

export interface IAuthService {
    authenticateUser(username: string, password: string): Promise<boolean>
    createUser(username: string, password: string): Promise<null>
    changePassword(username: string, oldPassword: string, newPassword: string): Promise<void>
    sendResetPasswordEmail(username: string): Promise<void>
    resetPassword(username: string, verificationCode: string, newPassword: string): Promise<void>
}
