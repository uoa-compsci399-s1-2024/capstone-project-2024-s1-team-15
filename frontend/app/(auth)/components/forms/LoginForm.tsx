"use client"

import React from "react"
import { useFormStatus, useFormState } from "react-dom"
import { login } from "@/app/services/auth"
import { useAuth } from "@/app/lib/hooks"
import Button from "@/app/components/Button"
import icons from "@/app/lib/icons"
import Link from "next/link"

type FormState = {
    error?: string
}

export default function LoginForm({ onSuccess, id }: { onSuccess?: () => void; id?: string }): React.JSX.Element {
    const [state, formAction] = useFormState<FormState>(loginFormAction, {})
    const { pending } = useFormStatus()
    const { setSession } = useAuth()
    const formId = id ? id + "-login-form" : "login-form"

    async function loginFormAction(_: FormState, formData?: any): Promise<FormState> {
        const username = formData.get("username")
        const password = formData.get("password")
        if (!username || !password) {
            return { error: "Both username and password are required." }
        }
        let loginResults = await login({ username, password })
        if (loginResults.success) {
            onSuccess && onSuccess()
            const formElement = document.getElementById(formId) as HTMLFormElement
            formElement.reset()
            setSession(loginResults.result)
        } else {
            return { error: loginResults.message }
        }
        return {}
    }

    return (
        <>
            <form className="flex flex-col items-start space-y-6 w-full" action={formAction} id={formId}>
                <div className={"w-full"}>
                    <label htmlFor={"username"}>
                        <p className="form-label">Username</p>
                    </label>
                    <input
                        name={"username"}
                        className={"form-input bg-gray-100 max-w-lg"}
                        type={"text"}
                        placeholder={"Enter your username..."}
                    />
                </div>

                <div className={"w-full"}>
                    <label htmlFor={"password"}>
                        <p className="form-label">Password</p>
                    </label>
                    <input
                        name={"password"}
                        className={"form-input bg-gray-100 max-w-lg"}
                        type={"password"}
                        placeholder={"Enter your password..."}
                    />
                </div>

                {state.error && <p className={"form-error ml-1"}>{state.error}</p>}

                <Button
                    disabled={pending}
                    type={"submit"}
                    text={pending ? "Logging in..." : "Log in"}
                    icon={icons.login}
                />
            </form>
            <div className={"mt-4 ml-1 flex flex-row gap-x-2"}>
                <Link className="block hover:underline smallest" href="/signup"
                      onClick={() => onSuccess && onSuccess()}>
                    Need an account?
                </Link>
                <p className={"smallest text-gray-500"}>·</p>
                <Link className="block hover:underline smallest" href="/forgot-password"
                      onClick={() => onSuccess && onSuccess()}>
                    Forgot your password?
                </Link>
            </div>
        </>
    )
}
