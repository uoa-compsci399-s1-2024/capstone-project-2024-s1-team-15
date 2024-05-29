import { sign, verify } from "jsonwebtoken"
import { Nullable, Result } from "@/util/types/types"
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

    async signup(username: string, password: string, email: string): Promise<void> {
        return await this.authServiceProvider.createUser(username, password, email)
    }

    async confirmSignup(username: string, confirmationCode: string): Promise<boolean> {
        return await this.authServiceProvider.confirmUser(username, confirmationCode)
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
    createUser(username: string, password: string, email: string): Promise<void>
    confirmUser(username: string, confirmationCode: string): Promise<boolean>

    authenticateUser(username: string, password: string): Promise<boolean>

    changePassword(username: string, oldPassword: string, newPassword: string): Promise<boolean>

    initiateResetPassword(username: string): Promise<void>
    resetPassword(username: string, verificationCode: string, newPassword: string): Promise<boolean>
}
