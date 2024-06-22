"use client"

import React, { useState } from "react"
import { useFormState } from "react-dom"
import { useRouter } from "next/navigation"
import { resetPassword } from "@/app/services/auth"
import { PASSWORD_REGEX } from "@/app/lib/consts"
import { useAuth } from "@/app/lib/hooks"
import ConfirmationCodeInput from "@/app/components/ConfirmationCodeInput"
import Button from "@/app/components/Button"
import icons from "@/app/lib/icons"

type FormState = {
    error?: string
}

type ResetPasswordFormProps = {
    id?: string
    verificationCode: string
    onSuccess?: () => void
}

export default function ResetPasswordForm({
    id,
    verificationCode,
    onSuccess,
}: ResetPasswordFormProps): React.JSX.Element {
    const router = useRouter()
    const [state, formAction] = useFormState<FormState>(resetPasswordAction, {})
    const [pending, setPending] = useState(false)
    const [success, setSuccess] = useState(false)
    const { user } = useAuth()
    const formId = id ? id + "-reset-password-firebase-form" : "reset-password-firebase-form"

    async function resetPasswordAction(_: FormState, formData?: any): Promise<FormState> {
        setSuccess(false)
        // check app state
        if (user) return { error: "You are already logged in. Please log out to perform this action." }

        // check form inputs
        const newPassword = formData.get("new-password")
        if (!newPassword || !newPassword.match(PASSWORD_REGEX)) {
            return {
                error: `Your password must be between 6-32 characters, 
                    include at least a numeric character, and not include any spaces.`,
            }
        }
        const confirmNewPassword = formData.get("confirm-new-password")
        if (!confirmNewPassword || newPassword !== confirmNewPassword) {
            return {
                error: "Confirm new password does not match new password.",
            }
        }
        setPending(true)
        let result = await resetPassword({ email: "", verificationCode, newPassword })
        setPending(false)
        if (result.success) {
            setSuccess(true)
            onSuccess && onSuccess()
            const formElement = document.getElementById(formId) as HTMLFormElement
            formElement.reset()
            setTimeout(() => {
                router.push(`/login`)
            }, 2500)
        } else {
            return { error: result.message }
        }
        return {}
    }

    return (
        <form className="flex flex-col items-start space-y-6 w-full" action={formAction} id={formId}>
            <div className={"w-full"}>
                <label htmlFor={"new-password"}>
                    <p className="form-label">New password</p>
                </label>
                <input
                    name={"new-password"}
                    className={"form-input bg-gray-100 max-w-lg"}
                    type={"password"}
                    placeholder={"Choose a new password... (min. 6 characters)"}
                />
            </div>

            <div className={"w-full"}>
                <label htmlFor={"confirm-new-password"}>
                    <p className="form-label">Confirm new password</p>
                </label>
                <input
                    name={"confirm-new-password"}
                    className={"form-input bg-gray-100 max-w-lg"}
                    type={"password"}
                    placeholder={"Confirm your new password..."}
                />
            </div>

            <Button
                disabled={pending}
                type={"submit"}
                text={pending ? "Resetting password..." : "Reset password"}
                icon={icons.send}
            />
            {state.error && <p className={"form-error ml-1"}>{state.error}</p>}
            {success && (
                <p className={"form-success ml-1"}>
                    Password has been successfully reset. Redirecting you to log in...
                </p>
            )}
        </form>
    )
}
