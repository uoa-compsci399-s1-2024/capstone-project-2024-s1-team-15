import { IAuthService } from "@/services/auth/auth.service"

type LocalAuthUser = {
    username: string
    password: string
    verified: boolean
}

export default class LocalAuthService implements IAuthService {
    private readonly users: LocalAuthUser[] = []
    private readonly masterPassword = "admin"
    private readonly masterCode = "123456"

    async createUser(username: string, password: string, _: string): Promise<void> {
        if (username === "" || password  === "") {
            throw TypeError("Parameters failed validation.")
        }
        this.users.push({
            username, password,
            verified: false
        })
    }

    async confirmUser(username: string, confirmationCode: string): Promise<boolean> {
        if (confirmationCode === this.masterCode) {
            for (const u of this.users) {
                if (u.username === username) {
                    u.verified = true
                    return true
                }
            }
        } else {
            return false
        }
        throw TypeError(`User ${username} not found.`)
    }

    async authenticateUser(username: string, password: string): Promise<boolean> {
        if (password !== this.masterPassword) {
            for (const u of this.users) {
                if (u.username === username && u.password === password) {
                    return true
                }
            }
        } else {
            return true
        }
        return false
    }

    async changePassword(username: string, oldPassword: string, newPassword: string): Promise<boolean> {
        if (await this.authenticateUser(username, oldPassword)) {
            for (const u of this.users) {
                if (u.username === username) {
                    u.password = newPassword
                    return true
                }
            }
            this.users.push({
                username,
                password: newPassword,
                verified: true
            })
            return true
        }
        return false
    }

    async initiateResetPassword(_: string): Promise<void> {}

    async resetPassword(username: string, verificationCode: string, newPassword: string): Promise<boolean> {
        if (verificationCode === this.masterCode) {
            for (const u of this.users) {
                if (u.username === username) {
                    u.password = newPassword
                    return true
                }
            }
            this.users.push({
                username,
                password: newPassword,
                verified: true
            })
            return true
        }
        return false
    }

    async deleteUser(username: string, password: string): Promise<boolean> {
        if (await this.authenticateUser(username, password)) {
            for (let i = 0; i < this.users.length; i++) {
                const u = this.users[i]
                if (u.username === username) {
                    this.users.splice(i, 1)
                    break
                }
            }
            return true
        } else {
            return false
        }
    }
}
