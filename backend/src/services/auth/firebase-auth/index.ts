import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updatePassword,
    User,
    sendPasswordResetEmail,
    deleteUser,
    Auth,
    sendEmailVerification,
    applyActionCode,
    verifyPasswordResetCode,
    confirmPasswordReset,
} from "firebase/auth"

import { IAuthService } from "@/services/auth/auth.service"
import { FirebaseOptions, initializeApp } from "firebase/app"

export default class FirebaseAuthService implements IAuthService {
    private readonly auth: Auth
    readonly authKey = "email"

    constructor(config: FirebaseOptions) {
        const app = initializeApp(config) 
        this.auth = getAuth(app)
    }

    async createUser(authKey: string, password: string, _: string) {
        await createUserWithEmailAndPassword(this.auth, authKey, password)

        try {
            await signInWithEmailAndPassword(this.auth, authKey, password)
            await sendEmailVerification(this.auth.currentUser as User)
        } catch (e) {
            throw e
        } finally {
            await signOut(this.auth)
        }
    }

    async confirmUser(_: string, confirmationCode: string): Promise<string> {
        const email = await verifyPasswordResetCode(this.auth, confirmationCode)
        await applyActionCode(this.auth, confirmationCode)
        return email
    }

    async authenticateUser(email: string, password: string): Promise<boolean> {
        try {
            await signInWithEmailAndPassword(this.auth, email, password)
        } catch (e) {
            return false
        } finally {
            await signOut(this.auth)
        }
        return true
    }

    async changePassword(email: string, oldPassword: string, newPassword: string): Promise<boolean> {
        try {
            await signInWithEmailAndPassword(this.auth, email, oldPassword)
            await updatePassword(this.auth.currentUser as User, newPassword)
            return true
        } catch (e) {
            return false
        } finally {
            await signOut(this.auth)
        }
    }

    async initiateResetPassword(email: string): Promise<void> {
        await sendPasswordResetEmail(this.auth, email)
    }

    async resetPassword(_: string, verificationCode: string, newPassword: string): Promise<boolean> {
        try {
            await confirmPasswordReset(this.auth, verificationCode, newPassword)
            return true // password reset happens via email link
        } catch (e) {
            return false
        }
    }

    async deleteUser(email: string, password: string) {
        try {
            await signInWithEmailAndPassword(this.auth, email, password)
            await deleteUser(this.auth.currentUser as User)
            return true
        } catch (e) {
            return false
        } finally {
            await signOut(this.auth)
        }
    }
}
