import { sign, verify } from "jsonwebtoken"
import { Nullable } from "@/util/types/types"
import { IUser, UserScope } from "@aapc/types"
import { LOCAL_JWT_SECRET } from "@/util/const";

export type JWTPayload = {
    username?: string
    email?: string
    scopes: UserScope[]
}

export default class AuthContext {
    readonly authServiceProvider: IAuthService
    private readonly jwtSecret: string

    constructor(authServiceProvider: IAuthService, jwtSecret: string = LOCAL_JWT_SECRET) {
        this.authServiceProvider = authServiceProvider
        this.jwtSecret = jwtSecret
    }

    private issueToken(payload: JWTPayload): string {
        return sign(payload, this.jwtSecret)
    }

    async signup(authKey: string, password: string, email: string): Promise<void> {
        await this.authServiceProvider.createUser(authKey, password, email)
    }

    async confirmSignup(authKey: string, confirmationCode: string): Promise<boolean|string> {
        return await this.authServiceProvider.confirmUser(authKey, confirmationCode)
    }

    async login(user: IUser, password: string): Promise<Nullable<string>> {
        if (await this.authServiceProvider.authenticateUser(user[this.authServiceProvider.authKey], password)) {
            return this.issueToken({
                [this.authServiceProvider.authKey]: user[this.authServiceProvider.authKey],
                scopes: user.scopes,
            })
        }
        return null
    }

    async changePassword(authKey: string, oldPassword: string, newPassword: string): Promise<boolean> {
        return await this.authServiceProvider.changePassword(authKey, oldPassword, newPassword)
    }

    async initiateResetPassword(authKey: string): Promise<void> {
        await this.authServiceProvider.initiateResetPassword(authKey)
    }

    async resetPassword(authKey: string, verificationCode: string, newPassword: string): Promise<boolean> {
        return await this.authServiceProvider.resetPassword(authKey, verificationCode, newPassword)
    }

    async deactivate(authKey: string, password: string) {
        return await this.authServiceProvider.deleteUser(authKey, password)
    }

    issueTokenFromUser(user: IUser): string {
        return this.issueToken({
            [this.authServiceProvider.authKey]: user[this.authServiceProvider.authKey],
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
    readonly authKey: "username" | "email" 
    createUser(username: string, password: string, email: string): Promise<void>
    confirmUser(username: string, confirmationCode: string): Promise<boolean|string> //boolean for AWS Cognito or email string for Firebase Auth

    authenticateUser(username: string, password: string): Promise<boolean>

    changePassword(username: string, oldPassword: string, newPassword: string): Promise<boolean>

    initiateResetPassword(username: string): Promise<void>
    resetPassword(username: string, verificationCode: string, newPassword: string): Promise<boolean>

    deleteUser(username: string, password: string): Promise<boolean>
}
