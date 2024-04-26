import { AuthenticationDetails, CognitoUser, CognitoUserPool, CognitoUserSession } from "amazon-cognito-identity-js"
import { IAuthService } from "./auth.service"

export default class AWSCognitoAuthService implements IAuthService {
    // where to authenticate users from
    adminUserPool = new CognitoUserPool({
        ClientId: process.env.COGNITO_CLIENT_ID as string,
        UserPoolId: process.env.COGNITO_USERPOOL_ID as string,
    })

    async authenticateUser(username: string, password: string) {
        const user = new CognitoUser({
            Username: username,
            Pool: this.adminUserPool,
        })

        const authDetails = new AuthenticationDetails({
            Username: username,
            Password: password,
        })

        try {
            const result: CognitoUserSession = await new Promise((resolve, reject) => {
                user.authenticateUser(authDetails, {
                    onSuccess: resolve,
                    onFailure: reject,
                })
            })
        } catch (e) {
            return false
        }

        return true
    }

    async changePassword(username: string, oldPassword: string, newPassword: string): Promise<null> {
        return null
    }

    async createUser(username: string, password: string): Promise<null> {
        return null
    }

    async resetPassword(username: string, newPassword: string): Promise<null> {
        return null
    }
}
