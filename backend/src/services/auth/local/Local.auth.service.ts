import { IAuthService } from "@/services/auth/auth.service"

export default class LocalAuthService implements IAuthService {
    password = "admin"

    async authenticateUser(username: string, password: string): Promise<boolean> {
        return password === this.password
    }

    async changePassword(username: string, oldPassword: string, newPassword: string) {
        if (oldPassword != this.password)
            throw Error("Old password is not matching the current password so password was not changed.")

        this.password = newPassword
    }

    async createUser(username: string, password: string): Promise<null> {
        return null
    }

    async sendResetPasswordEmail(username: string): Promise<void> {
        console.log("----------------- New Email Notification ----------------------")
        console.log(`Verification Code: 1`)
    }

    async resetPassword(username: string, verificationCode: string, newPassword: string) {
        if (verificationCode === "1") {
            this.password = newPassword
        }
    }
}
