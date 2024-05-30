"use client"

import React, { useState } from "react"
import { useFormState } from "react-dom"
import { register } from "@/app/services/auth"
import Button from "@/app/components/Button"
import icons from "@/app/lib/icons"
import { useRouter } from "next/navigation"
import { PASSWORD_REGEX } from "@/app/lib/consts";

type FormState = {
    error?: string
}

export default function SignupForm({ onSuccess }: { onSuccess?: () => void; id?: string }): React.JSX.Element {
    const [state, formAction] = useFormState<FormState>(signupAction, {})
    const [pending, setPending] = useState(false)
    const [success, setSuccess] = useState(false)
    const formId = "signup-form"
    const router = useRouter()

    async function signupAction(_: FormState, formData?: any): Promise<FormState> {
        const email: string = formData.get("email")
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!email || !email.match(emailRegex)) {
            return {
                error: "You must enter a valid email address."
            }
        }
        const username: string = formData.get("username")
        const usernameRegex = /^(?=.*[0-9a-zA-Z\W])(?!.* ).{4,32}$/
        if (!username || !username.match(usernameRegex)) {
            return {
                error: "Your username must be between 4-32 characters, and not include any spaces."
            }
        }
        const displayName: string = formData.get("display-name")
        if (!displayName || displayName.length === 0) {
            return {
                error: "You must enter a display name."
            }
        }
        const password: string = formData.get("password")
        if (!password || !password.match(PASSWORD_REGEX)) {
            return {
                error: `Your password must be between 6-32 characters, 
                    include at least a numeric character, and not include any spaces.`
            }
        }
        const confirmPassword: string = formData.get("confirm-password")
        if (password !== confirmPassword) {
            return {
                error: "Confirm password does not match password."
            }
        }
        setPending(true)
        let r = await register({
            username, password, email, displayName
        })
        if (r.success) {
            setPending(false)
            onSuccess && onSuccess()
            setSuccess(true)
            const formElement = document.getElementById(formId) as HTMLFormElement
            formElement.reset()
            router.push(`/signup/confirm?u=${encodeURIComponent(username)}`)
        } else {
            setPending(false)
            return { error: r.message }
        }
        return {}
    }

    return (
        <>
            <form className="flex flex-col items-start space-y-6 w-full" action={formAction} id={formId}>
                <div className={"w-full"}>
                    <label htmlFor={"email"} className={"flex flex-row gap-x-2 items-center"}>
                        <p className="form-label">Email</p>
                        <p className={"form-label !text-red-400"}>*Cannot be changed</p>
                    </label>
                    <input
                        id={"email"}
                        name={"email"}
                        className={"form-input bg-gray-100 max-w-lg"}
                        type={"email"}
                        placeholder={"example@example.com"}
                    />
                </div>

                <div className={"w-full"}>
                    <label htmlFor={"username"} className={"flex flex-row gap-x-2 items-center"}>
                        <p className="form-label">Username</p>
                        <p className={"form-label !text-red-400"}>*Cannot be changed</p>
                    </label>
                    <input
                        id={"username"}
                        name={"username"}
                        className={"form-input bg-gray-100 max-w-lg"}
                        type={"text"}
                        placeholder={"Pick a username... "}
                    />
                </div>

                <div className={"w-full"}>
                    <label htmlFor={"display-name"}>
                        <p className="form-label">Display Name</p>
                    </label>
                    <input
                        id={"display-name"}
                        name={"display-name"}
                        className={"form-input bg-gray-100 max-w-lg"}
                        type={"text"}
                        placeholder={"Pick a display name..."}
                    />
                </div>

                <div className={"w-full"}>
                    <label htmlFor={"password"}>
                        <p className="form-label">Password</p>
                    </label>
                    <input
                        id={"password"}
                        name={"password"}
                        className={"form-input bg-gray-100 max-w-lg"}
                        type={"password"}
                        placeholder={"Choose password... (min. 6 characters)"}
                    />
                </div>

                <div className={"w-full"}>
                    <label htmlFor={"confirm-password"}>
                        <p className="form-label">Confirm Password</p>
                    </label>
                    <input
                        id={"confirm-password"}
                        name={"confirm-password"}
                        className={"form-input bg-gray-100 max-w-lg"}
                        type={"password"}
                        placeholder={"Confirm your password..."}
                    />
                </div>

                <Button
                    disabled={pending}
                    type={"submit"}
                    text={pending ? "Signing up..." : "Sign up"}
                    icon={icons.signup}
                />

                {state.error && <p className={"form-error ml-1"}>{state.error}</p>}
                {success && <p className={"form-success ml-1"}>
                    We have sent you a confirmation code. Redirecting...
                </p>}
            </form>
        </>
    )
}
