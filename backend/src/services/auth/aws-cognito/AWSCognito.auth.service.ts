import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool } from "amazon-cognito-identity-js"
import { IAuthService } from "@/services/auth/auth.service"

export default class AWSCognitoAuthService implements IAuthService {
    private readonly userpool: CognitoUserPool

    constructor(clientId: string, userpoolId: string) {
        this.userpool = new CognitoUserPool({
            ClientId: clientId,
            UserPoolId: userpoolId,
        })
    }

    async createUser(username: string, password: string, email: string): Promise<void> {
        const emailAttribute = new CognitoUserAttribute({
            Name: "email",
            Value: email
        })
        await new Promise<null>((resolve, reject) => {
            this.userpool.signUp(username, password, [emailAttribute], [],
                (err, result) => {
                    if (result) {
                        resolve(null)
                    } else {
                        reject(err)
                    }
                }
            )
        })
    }

    async confirmUser(username: string, confirmationCode: string): Promise<boolean> {
        const user = new CognitoUser({
            Username: username,
            Pool: this.userpool
        })
        try {
            await new Promise((resolve, reject) => {
                user.confirmRegistration(confirmationCode, false, (err, result) => {
                    if (result === "SUCCESS") {
                        resolve(null)
                    } else {
                        reject(err)
                    }
                })
            })
            return true
        } catch (e) {
            if (String(e).includes("CodeMismatchException") || String(e).includes("ExpiredCodeException")) {
                return false
            }
            throw e
        }
    }

    async authenticateUser(username: string, password: string): Promise<boolean> {
        const user = new CognitoUser({
            Username: username,
            Pool: this.userpool,
        })
        const authDetails = new AuthenticationDetails({
            Username: username,
            Password: password,
        })
        try {
            await new Promise((resolve, reject) => {
                user.authenticateUser(authDetails, {
                    onSuccess: resolve,
                    onFailure: reject
                })
            })
            return true
        } catch (e) {
            if (String(e).includes("NotAuthorizedException")) {
                return false
            }
            throw e
        }
    }

    async changePassword(username: string, oldPassword: string, newPassword: string): Promise<boolean> {
        const user = new CognitoUser({
            Username: username,
            Pool: this.userpool,
        })
        const authenticationDetails = new AuthenticationDetails({
            Username: username,
            Password: oldPassword
        })
        try {
            await new Promise((resolve, reject) => {
                user.authenticateUser(authenticationDetails, {
                    onSuccess: () => {
                        user.changePassword(oldPassword, newPassword, (err, result) => {
                            if (result === "SUCCESS") {
                                resolve(null)
                            } else {
                                reject(err)
                            }
                        })
                    },
                    onFailure: e => reject(e)
                })
            })
            return true
        } catch (e) {
            if (String(e).includes("NotAuthorizedException")) {
                return false
            }
            throw e
        }
    }

    async initiateResetPassword(username: string): Promise<void> {
        const user = new CognitoUser({
            Username: username,
            Pool: this.userpool,
        })
        await new Promise((resolve, reject) =>
            user.forgotPassword({
                onSuccess: resolve,
                onFailure: reject,
            })
        )
    }

    async resetPassword(username: string, verificationCode: string, newPassword: string): Promise<boolean> {
        const user = new CognitoUser({
            Username: username,
            Pool: this.userpool,
        })
        try {
            await new Promise((resolve, reject) =>
                user.confirmPassword(verificationCode, newPassword, {
                    onSuccess: resolve,
                    onFailure: reject,
                })
            )
            return true
        } catch (e) {
            if (String(e).includes("CodeMismatchException") || String(e).includes("ExpiredCodeException")) {
                return false
            }
            throw e
        }
    }

    async deleteUser(username: string, password: string) {
        const user = new CognitoUser({
            Username: username,
            Pool: this.userpool,
        })
        const authenticationDetails = new AuthenticationDetails({
            Username: username,
            Password: password
        })
        try {
            await new Promise((resolve, reject) => {
                user.authenticateUser(authenticationDetails, {
                    onSuccess: () => {
                        user.deleteUser((err, result) => {
                            if (result === "SUCCESS") {
                                resolve(null)
                            } else {
                                reject(err)
                            }
                        })
                    },
                    onFailure: e => reject(e)
                })
            })
            return true
        } catch (e) {
            if (String(e).includes("NotAuthorizedException")) {
                return false
            }
            throw e
        }
    }
}
