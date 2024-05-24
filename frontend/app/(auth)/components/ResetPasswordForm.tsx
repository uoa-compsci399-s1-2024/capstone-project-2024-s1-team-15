"use client"

import React, { useEffect, useRef, useState } from "react"
import { useFormStatus, useFormState } from "react-dom"
import { resetPassword } from "@/app/services/auth"
import { useAuth } from "@/app/lib/hooks"
import Button from "@/app/components/Button"
import icons from "@/app/lib/icons"
import { ModalRef } from "@/app/lib/hooks/useModal"
import { LoginModal } from "@/app/components/modals"

type FormState = {
    error?: string
}

export default function ResetPasswordForm({
    id,
    email,
    onSuccess,
}: {
    id?: string
    email: string
    onSuccess: any
}): React.JSX.Element {
    const loginRef = useRef<ModalRef>(null)
    const [state, formAction] = useFormState<FormState>(resetPasswordAction, {})

    const [resetSuccessful, setResetSuccess] = useState(false)

    const { pending } = useFormStatus()
    const { user } = useAuth()
    const formId = id ? id + "-reset-password-form" : "reset-password-form"

    const showLoginModal = () => {
        if (loginRef.current) {
            loginRef.current.showModal()
        }
    }

    async function resetPasswordAction(_: FormState, formData?: any): Promise<FormState> {
        // check app state
        if (user) return { error: "You are already logged in. Please log out to perform this action." }
        if (!email) return { error: "No email :( Contact developers." }

        // check form inputs
        const verificationCode = formData.get("verification-code")
        const newPassword = formData.get("new-password")
        const confirmNewPassword = formData.get("confirm-new-password")
        if (!newPassword || !confirmNewPassword || !verificationCode) return { error: "All fields are required." }
        if (newPassword != confirmNewPassword) return { error: "New password & confirm new password don't match." }

        // check response & act accordingly - show success or fail message
        let result = await resetPassword({ email, verificationCode, newPassword })
        if (result.success) {
            const formElement = document.getElementById(formId) as HTMLFormElement
            formElement.reset()
            setResetSuccess(true)
            onSuccess()
        } else {
            return { error: result.message }
        }
        return {}
    }

    useEffect(() => {
        if (state.error) setResetSuccess(false)
    }, [state.error])

    if (resetSuccessful)
        return (
            <>
                <p className="form-success mb-4">Password has been reset.</p>
                <Button text="Log in" onClick={showLoginModal} />
                <LoginModal ref={loginRef} modalId={`reset-form-login`} />
            </>
        )

    return (
        <form className="flex flex-col items-start space-y-6 w-full" action={formAction} id={formId}>
            <div className={"w-full"}>
                <label htmlFor={"verification-code"}>
                    <p className="form-label">Verification Code</p>
                </label>
                <input
                    name={"verification-code"}
                    className={"form-input bg-gray-100 max-w-lg"}
                    type={"text"}
                    placeholder={"Enter your verification code..."}
                />
            </div>

            <div className={"w-full"}>
                <label htmlFor={"new-password"}>
                    <p className="form-label">New password</p>
                </label>
                <input
                    name={"new-password"}
                    className={"form-input bg-gray-100 max-w-lg"}
                    type={"password"}
                    placeholder={"Enter your new password..."}
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

            {state.error && <p className={"form-error ml-1"}>{state.error}</p>}

            <Button
                disabled={pending}
                type={"submit"}
                text={pending ? "Resetting password..." : "Reset password"}
                icon={icons.send}
            />
        </form>
    )
}
