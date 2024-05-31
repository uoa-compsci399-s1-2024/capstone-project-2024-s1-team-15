"use client"

import { useState } from "react"
import ForgotPasswordForm from "../components/ForgotPasswordForm"
import ResetPasswordForm from "../components/ResetPasswordForm"

export default function ForgotPasswordPage() {
    const [emailToResetPasswordFor, setEmailToResetPasswordFor] = useState<null | string>(null)
    const [resetSuccess, setResetSuccess] = useState(false)

    return (
        <>
            <h1 className={"page-title"}>{emailToResetPasswordFor ? "Reset password" : "Forgot password"}</h1>
            {!resetSuccess && (
                <ForgotPasswordForm onSuccess={(sentToEmail: string) => setEmailToResetPasswordFor(sentToEmail)} />
            )}
            {emailToResetPasswordFor && (
                <ResetPasswordForm email={emailToResetPasswordFor} onSuccess={() => setResetSuccess(true)} />
            )}
        </>
    )
}
