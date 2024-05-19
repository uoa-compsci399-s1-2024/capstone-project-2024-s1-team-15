"use client"

import React, { useEffect, useState } from "react"
import { useFormStatus, useFormState } from "react-dom"
import { changePassword } from "@/app/services/auth"
import { useAuth } from "@/app/lib/hooks"

type FormState = {
    error?: string
}

export default function ChangePasswordForm(): React.JSX.Element {
    const [state, formAction] = useFormState<FormState>(changePasswordAction, {})
    const { pending } = useFormStatus()
    const { token, user } = useAuth()
    const [success, setSuccess] = useState(false)

    async function changePasswordAction(_: FormState, formData?: any): Promise<FormState> {
        const currentPassword = formData.get("password")
        const newPassword = formData.get("new-password")
        const confirmNewPassword = formData.get("confirm-new-password")
        if (!newPassword || !currentPassword || !confirmNewPassword) {
            return { error: "Both current password and new password and confirm new password are required." }
        }

        if (newPassword != confirmNewPassword) return { error: "New password & confirm new password don't match." }

        if (!user) return { error: "Login before changing your password." }

        let changePasswordResults = await changePassword(
            {
                username: user.username,
                currentPassword,
                newPassword,
            },
            { token }
        )
        if (changePasswordResults.success) {
            const formElement = document.getElementById("change-password-form") as HTMLFormElement
            formElement.reset()
            // show success message
            setSuccess(true)
        } else {
            return { error: changePasswordResults.message }
        }
        return {}
    }

    useEffect(() => {
        if (state.error) setSuccess(false)
    }, [state.error])

    return (
        <form className="flex flex-col items-start space-y-6 w-full" action={formAction} id={"change-password-form"}>
            <div className={"w-full"}>
                <label htmlFor={"password"}>
                    <p className="form-label">Current Password</p>
                </label>
                <input
                    name={"password"}
                    className={"form-input bg-gray-100 max-w-lg"}
                    type={"password"}
                    placeholder={"Enter your current password..."}
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
            {success && <p className="form-success">Password has been changed</p>}
            <button disabled={pending} type={"submit"} className="button">
                {pending ? "Changing password..." : "Change password"}
            </button>
        </form>
    )
}
