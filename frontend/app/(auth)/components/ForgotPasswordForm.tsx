"use client"

import React, { useEffect, useState } from "react"
import { useFormStatus, useFormState } from "react-dom"
import { sendResetPasswordEmail } from "@/app/services/auth"
import { useAuth } from "@/app/lib/hooks"
import Button from "@/app/components/Button"
import icons from "@/app/lib/icons"

type FormState = {
    error?: string
}

export default function ForgotPasswordForm({ id }: { id?: string }): React.JSX.Element {
    const [state, formAction] = useFormState<FormState>(forgotPasswordAction, {})

    // after sending email, it should show the  email was sent to (but partially censor it)  e.g. jo****e@gmail.com
    const [forgotPasswordEmailSent, setForgotPasswordEmailSent] = useState(false)

    const { pending } = useFormStatus()
    const { user } = useAuth()
    const formId = id ? id + "-forgot-password-form" : "forgot-password-form"

    async function forgotPasswordAction(_: FormState, formData?: any): Promise<FormState> {
        if (user) return { error: "You are already logged in. Please log out to perform this action." }

        const email = formData.get("email")
        if (!email) return { error: "All fields are required." }

        let result = await sendResetPasswordEmail({ email })
        if (result.success) {
            const formElement = document.getElementById(formId) as HTMLFormElement
            formElement.reset()
        } else {
            return { error: result.message }
        }
        return {}
    }

    useEffect(() => {
        if (state.error) setForgotPasswordEmailSent(false)
    }, [state.error])

    return (
        <form className="flex flex-col items-start space-y-6 w-full" action={formAction} id={formId}>
            <div className={"w-full"}>
                <label htmlFor={"email"}>
                    <p className="form-label">Email</p>
                </label>
                <input
                    name={"email"}
                    className={"form-input bg-gray-100 max-w-lg"}
                    type={"text"}
                    placeholder={"Enter your email..."}
                />
            </div>

            {state.error && <p className={"form-error ml-1"}>{state.error}</p>}

            {forgotPasswordEmailSent && (
                <p className="form-success">
                    Reset password email sent to {forgotPasswordEmailSent} Please check your inbox (or junk folder).
                </p>
            )}

            <Button
                disabled={pending}
                type={"submit"}
                text={pending ? "Sending email..." : "Send reset password email"}
                icon={icons.send}
            />
        </form>
    )
}
