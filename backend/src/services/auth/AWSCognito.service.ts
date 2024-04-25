import { IAuthService } from "./auth.service";

export default class AWSCognitoAuthService implements IAuthService {
    async authenticateUser(username: string, password: string): Promise<boolean> {
        // TODO: implement this
        return false
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
