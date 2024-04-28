import { AuthenticationDetails, CognitoUser, CognitoUserPool } from "amazon-cognito-identity-js"
import { IAuthService } from "@/services/auth/auth.service"

export default class AWSCognitoAuthService implements IAuthService {
    private readonly adminUserPool: CognitoUserPool

    constructor (clientId: string, userpoolId: string) {
        this.adminUserPool = new CognitoUserPool({
            ClientId: clientId,
            UserPoolId: userpoolId,
        })
    }

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
            await new Promise((resolve, reject) => {
                user.authenticateUser(authDetails, {
                    onSuccess: resolve,
                    onFailure: reject,
                })
            })
            return true
        } catch (e) {
            return false
        }
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
