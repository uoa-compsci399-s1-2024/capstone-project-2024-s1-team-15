import { IAuthService } from "@/services/auth/auth.service"

export default class LocalAuthService implements IAuthService {
    async authenticateUser(username: string, password: string): Promise<boolean> {
        return username === "admin" && password === "admin"
    }

    async changePassword(username: string, oldPassword: string, newPassword: string): Promise<null> {
        return Promise.resolve(null)
    }

    async createUser(username: string, password: string): Promise<null> {
        return Promise.resolve(null)
    }

    async resetPassword(username: string, newPassword: string): Promise<null> {
        return Promise.resolve(null)
    }
}
