import { sign, verify } from "jsonwebtoken"
import { Nullable } from "@/util/types/types"
import { IUser, UserScope } from "@aapc/types"
import { LOCAL_JWT_SECRET } from "@/util/const";

export type JWTPayload = {
    username: string
    scopes: UserScope[]
}

export default class AuthContext {
    private readonly authServiceProvider: IAuthService
    private readonly jwtSecret: string

    constructor(authServiceProvider: IAuthService, jwtSecret: string = LOCAL_JWT_SECRET) {
        this.authServiceProvider = authServiceProvider
        this.jwtSecret = jwtSecret
    }

    private issueToken(payload: JWTPayload): string {
        return sign(payload, this.jwtSecret)
    }

    async signup(username: string, password: string, email: string): Promise<void> {
        await this.authServiceProvider.createUser(username, password, email)
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

    async changePassword(username: string, oldPassword: string, newPassword: string): Promise<boolean> {
        return await this.authServiceProvider.changePassword(username, oldPassword, newPassword)
    }

    async initiateResetPassword(username: string): Promise<void> {
        await this.authServiceProvider.initiateResetPassword(username)
    }

    async resetPassword(username: string, verificationCode: string, newPassword: string): Promise<boolean> {
        return await this.authServiceProvider.resetPassword(username, verificationCode, newPassword)
    }

    async deactivate(username: string, password: string) {
        return await this.authServiceProvider.deleteUser(username, password)
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

    deleteUser(username: string, password: string): Promise<boolean>
}
